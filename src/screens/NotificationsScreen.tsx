import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { fontStyles, RFont } from '../theme/fonts';
import { ScreenHeader } from '../components/Header/ScreenHeader';
import { useTranslation } from 'react-i18next';
import {
  useGetNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  Notification,
} from '../hooks/useNotifications';

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetNotifications();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

  // Combine notifications from all pages
  const notifications = data?.pages.flatMap((page) => page.notifications) || [];
  const hasUnread = notifications.some((n) => !n.read);

  // Refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleNotificationClick = (item: Notification) => {
    // Mark as read via API
    if (!item.read) {
      markAsReadMutation.mutate(item._id);
    }

    // Navigate based on type
    if (item.type === 'new_batch' && item.batch?._id) {
      (navigation.navigate as any)('BatchDetails', { batchId: item.batch._id });
    } else if (item.data?.screen) {
      (navigation.navigate as any)(item.data.screen, item.data);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationClick(item)}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            {item.type === 'new_batch' && (
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>New Batch</Text>
              </View>
            )}
            <Text
              style={[
                fontStyles.Maison_600_16PX_20LH,
                styles.title,
                !item.read && styles.unreadText,
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </View>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text
          style={[fontStyles.Maison_400_14PX_18LH, styles.message]}
          numberOfLines={2}
        >
          {item.body}
        </Text>
        <View style={styles.footerRow}>
          {item.institute && (
            <Text style={[fontStyles.Maison_500_12PX_16LH, styles.instituteName]}>
              {item.institute.instituteName}
            </Text>
          )}
          <Text style={[fontStyles.Maison_400_12PX_14LH, styles.time]}>
            {new Date(item.createdAt).toLocaleDateString()}{' '}
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.orange} />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[fontStyles.Maison_500_18PX_22LH, styles.emptyText]}>
        No notifications yet
      </Text>
      <Text style={[fontStyles.Maison_400_14PX_18LH, styles.emptySubText]}>
        Keep learning! Updates about your classes and progress will appear here.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader 
        title={t('tabs.notification')} 
        showBackButton={false} 
        rightAction={
          hasUnread ? (
            <TouchableOpacity
              onPress={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
            >
              <Text
                style={[
                  fontStyles.Maison_500_12PX_16LH,
                  { color: colors.orange },
                  markAllAsReadMutation.isPending && { opacity: 0.5 },
                ]}
              >
                Mark all as read
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {isLoading && !isRefetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={[colors.orange]}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: RFont(20),
  },
  notificationItem: {
    paddingHorizontal: RFont(20),
    paddingVertical: RFont(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLightest,
    backgroundColor: colors.white,
  },
  unreadNotification: {
    backgroundColor: '#FFF9F5',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFont(4),
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    backgroundColor: colors.orangeLight,
    paddingHorizontal: RFont(6),
    paddingVertical: RFont(2),
    borderRadius: RFont(4),
    marginRight: RFont(8),
  },
  typeBadgeText: {
    fontSize: RFont(10),
    color: colors.orange,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    flex: 1,
    color: colors.black_900,
    fontSize: RFont(15),
  },
  unreadText: {
    color: colors.black,
  },
  unreadDot: {
    width: RFont(8),
    height: RFont(8),
    borderRadius: RFont(4),
    backgroundColor: colors.orange,
    marginLeft: RFont(10),
  },
  message: {
    color: colors.gray,
    marginBottom: RFont(8),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instituteName: {
    color: colors.orange,
    fontSize: RFont(12),
  },
  time: {
    color: colors.textSecondary,
    fontSize: RFont(12),
  },
  footerLoader: {
    paddingVertical: RFont(20),
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFont(40),
    marginTop: RFont(100),
  },
  emptyText: {
    color: colors.black_900,
    marginBottom: RFont(8),
    textAlign: 'center',
  },
  emptySubText: {
    color: colors.gray,
    textAlign: 'center',
  },
});
