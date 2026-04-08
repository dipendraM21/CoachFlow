import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFont } from '../../theme/fonts';

// --- Particle types ---
interface Particle {
  id: number;
  anim: Animated.ValueXY;
  opacity: Animated.Value;
  scale: Animated.Value;
  color: string;
}

const PARTICLE_COLORS = [
  '#FF6B35',
  '#FFD700',
  '#FF1493',
  '#00BFFF',
  '#ADFF2F',
  '#FF4500',
  '#7B68EE',
  '#FF69B4',
  '#00FA9A',
  '#FFA07A',
];

const NUM_PARTICLES = 10;

function getAnglePos(index: number, total: number, radius: number) {
  const angle = ((2 * Math.PI) / total) * index - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

// --- Main Subscribe Button ---
interface SubscribeButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  isSubscribed?: boolean;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  onPress,
  isLoading = false,
  isSubscribed = false,
}) => {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [particles, setParticles] = useState<Particle[]>([]);

  // All animations use useNativeDriver: false because some (color, bgColor)
  // MUST use false, and you cannot mix drivers on the same animated node.
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgColorAnim = useRef(new Animated.Value(subscribed ? 1 : 0)).current;
  const ringScaleAnim = useRef(new Animated.Value(0)).current;
  const ringOpacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const bellSwing = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Sync with prop
  useEffect(() => {
    setSubscribed(isSubscribed);
    Animated.timing(bgColorAnim, {
      toValue: isSubscribed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed]);

  // Generate particle burst
  const triggerBurst = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      id: Date.now() + i,
      anim: new Animated.ValueXY({ x: 0, y: 0 }),
      opacity: new Animated.Value(1),
      scale: new Animated.Value(1),
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }));

    setParticles(newParticles);

    const particleAnimations = newParticles.map((p, i) => {
      const { x, y } = getAnglePos(i, NUM_PARTICLES, 60);
      return Animated.parallel([
        Animated.timing(p.anim, {
          toValue: { x, y },
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false, // must be false when paired with JS-driven nodes
        }),
        Animated.timing(p.opacity, {
          toValue: 0,
          duration: 600,
          delay: 200,
          useNativeDriver: false,
        }),
        Animated.timing(p.scale, {
          toValue: 0,
          duration: 400,
          delay: 300,
          useNativeDriver: false,
        }),
      ]);
    });

    Animated.parallel(particleAnimations).start(() => setParticles([]));
  }, []);

  // Bell swing animation after subscribe
  const triggerBellSwing = useCallback(() => {
    bellSwing.setValue(0);
    Animated.sequence([
      Animated.timing(bellSwing, { toValue: 1, duration: 80, useNativeDriver: false }),
      Animated.timing(bellSwing, { toValue: -1, duration: 80, useNativeDriver: false }),
      Animated.timing(bellSwing, { toValue: 0.7, duration: 70, useNativeDriver: false }),
      Animated.timing(bellSwing, { toValue: -0.7, duration: 70, useNativeDriver: false }),
      Animated.timing(bellSwing, { toValue: 0, duration: 60, useNativeDriver: false }),
    ]).start();
  }, [bellSwing]);

  // Pulse ring animation
  const triggerRing = useCallback(() => {
    ringScaleAnim.setValue(0.6);
    ringOpacityAnim.setValue(0.8);
    Animated.parallel([
      Animated.timing(ringScaleAnim, {
        toValue: 2.2,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(ringOpacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [ringScaleAnim, ringOpacityAnim]);

  // Shake on press (like haptic feel)
  const triggerShake = useCallback(() => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -3, duration: 40, useNativeDriver: false }),
      Animated.timing(shakeAnim, { toValue: 3, duration: 40, useNativeDriver: false }),
      Animated.timing(shakeAnim, { toValue: -2, duration: 30, useNativeDriver: false }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 30, useNativeDriver: false }),
    ]).start();
  }, [shakeAnim]);

  const handlePress = useCallback(() => {
    if (isLoading) return;

    // 1. Scale punch
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.88,
        duration: 80,
        useNativeDriver: false,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 200,
        useNativeDriver: false,
      }),
    ]).start();

    // 2. Text fade
    Animated.sequence([
      Animated.timing(textOpacity, { toValue: 0, duration: 100, useNativeDriver: false }),
      Animated.timing(textOpacity, { toValue: 1, duration: 200, useNativeDriver: false }),
    ]).start();

    // 3. Bg color transition
    Animated.timing(bgColorAnim, {
      toValue: subscribed ? 0 : 1,
      duration: 350,
      useNativeDriver: false,
    }).start();

    // 4. Ring, particles, bell, shake
    triggerBurst();
    triggerRing();
    triggerBellSwing();
    triggerShake();

    setSubscribed(prev => !prev);
    onPress();
  }, [
    isLoading,
    subscribed,
    scaleAnim,
    textOpacity,
    bgColorAnim,
    triggerBurst,
    triggerRing,
    triggerBellSwing,
    triggerShake,
    onPress,
  ]);

  const bgColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E2E8F0', '#FF6B35'],
  });

  const textColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0F172A', '#FFFFFF'],
  });

  const bellRotate = bellSwing.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-18deg', '0deg', '18deg'],
  });

  return (
    <View style={styles.wrapper}>
      {/* Pulse ring */}
      <Animated.View
        style={[
          styles.ring,
          {
            transform: [{ scale: ringScaleAnim }],
            opacity: ringOpacityAnim,
          },
        ]}
        pointerEvents="none"
      />

      {/* Particles */}
      {particles.map(p => (
        <Animated.View
          key={p.id}
          style={[
            styles.particle,
            {
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: [
                { translateX: p.anim.x },
                { translateY: p.anim.y },
                { scale: p.scale },
              ],
            },
          ]}
          pointerEvents="none"
        />
      ))}

      {/* Main Button - single Animated.View for scale+shake */}
      <Animated.View
        style={{
          transform: [
            { scale: scaleAnim },
            { translateX: shakeAnim },
          ],
        }}
      >
        <TouchableOpacity onPress={handlePress} activeOpacity={1} disabled={isLoading}>
          {/* Animated background */}
          <Animated.View style={[styles.button, { backgroundColor: bgColor }]}>
            {/* Bell icon with swing - separate Animated.View avoids driver conflict */}
            {subscribed && (
              <Animated.View style={{ transform: [{ rotate: bellRotate }] }}>
                <Text style={styles.bellIcon}>🔔</Text>
              </Animated.View>
            )}

            {/* Label — opacity and color are BOTH on bgColorAnim (JS driver), so no conflict */}
            <Animated.Text
              style={[
                styles.label,
                {
                  opacity: textOpacity,
                  color: textColor,
                },
              ]}
            >
              {isLoading ? '...' : subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFont(12),
    paddingHorizontal: RFont(16),
    borderRadius: RFont(24),
    gap: RFont(6),
    minWidth: RFont(130),
  },
  label: {
    fontSize: RFont(13),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bellIcon: {
    fontSize: RFont(14),
  },
  ring: {
    position: 'absolute',
    width: RFont(100),
    height: RFont(44),
    borderRadius: RFont(22),
    borderWidth: 2,
    borderColor: '#FF6B35',
    zIndex: -1,
  },
  particle: {
    position: 'absolute',
    width: RFont(8),
    height: RFont(8),
    borderRadius: RFont(4),
    zIndex: 10,
  },
});
