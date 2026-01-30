import { StyleSheet } from 'react-native';
import { RFont } from './fonts';
export const globalStyles = StyleSheet.create({
  absolute: { position: 'absolute' },
  alignContentCenter: { alignContent: 'center' },
  alignItemsBaseline: { alignItems: 'baseline' },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsFlexEnd: { alignItems: 'flex-end' },
  alignItemsFlexStart: { alignItems: 'flex-start' },
  alignSelfCenter: { alignSelf: 'center' },
  alignSelfEnd: { alignSelf: 'flex-end' },
  alignSelfStart: { alignSelf: 'flex-start' },
  alignSelfStretch: { alignSelf: 'stretch' },
  border1: { borderWidth: 1 },
  border2: { borderWidth: 2 },
  bullet: {
    fontSize: RFont(16),
    lineHeight: RFont(20),
    marginRight: RFont(8),
  },
  capitalize: { textTransform: 'capitalize' },
  container: { flex: 1 },
  displayNone: { display: 'none' },
  flex0: { flex: 0 },
  flex1: { flex: 1 },
  flexColumnReverse: { flexDirection: 'column-reverse' },
  flexDirectionColumn: { flexDirection: 'column' },
  flexDirectionRow: { flexDirection: 'row' },
  flexGrow0: { flexGrow: 0 },
  flexGrow1: { flexGrow: RFont(1) },
  flexShrink1: { flexShrink: 1 },
  flexWrap: { flexWrap: 'wrap' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentEnd: { justifyContent: 'flex-end' },
  justifyContentFlexStart: { justifyContent: 'flex-start' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  letterSpacingN1: { letterSpacing: -1 },
  letterSpacingN4: { letterSpacing: -4 },
  linethrough: { textDecorationLine: 'line-through' },
  maxHeight100: { maxHeight: '100%' },
  overflowHidden: { overflow: 'hidden' },
  overflowScroll: { overflow: 'scroll' },
  overflowVisible: { overflow: 'visible' },
  relative: { position: 'relative' },
  resizeModeContain: { resizeMode: 'contain' },
  resizecover: { resizeMode: 'cover' },
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  safeAreaView: { flex: 1, padding: RFont(20), paddingBottom: RFont(32) },
  scrollView: { padding: RFont(20), paddingBottom: RFont(32) },
  textAlignCenter: { textAlign: 'center' },
  textAlignVerticalTop: { textAlignVertical: 'top' },
  textDecorationLineThrough: { textDecorationLine: 'line-through' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  underline: { textDecorationLine: 'underline' },
  upperCase: { textTransform: 'uppercase' },
  verticalAlignTop: { verticalAlign: 'top' },
  writingDirectionLeft: { writingDirection: 'ltr' },
  writingDirectionRight: { writingDirection: 'rtl' },
});

export const heightStyles = StyleSheet.create({
  h100: {
    height: '100%',
  },
  h12: {
    height: RFont(12),
  },
  h158: {
    height: RFont(158),
  },
  h18: {
    height: RFont(18),
  },
  h20: {
    height: RFont(20),
  },
  h294: {
    height: RFont(294),
  },
  h32: {
    height: RFont(32),
  },

  h35: {
    height: RFont(35),
  },
  h40: {
    height: RFont(40),
  },
  h5: {
    height: RFont(5),
  },
  h52: {
    height: RFont(52),
  },
  h6: {
    height: RFont(6),
  },
  h60: {
    height: RFont(60),
  },
  h700: {
    height: RFont(700),
  },
  h8: {
    height: RFont(8),
  },
  mh580: {
    minHeight: RFont(580),
  },
});

export const widthStyles = StyleSheet.create({
  w100: {
    width: '100%',
  },
  w120: {
    width: RFont(120),
  },
  w140: {
    width: RFont(140),
  },
  w18: {
    width: RFont(18),
  },
  w20: {
    width: RFont(20),
  },
  w24: {
    width: RFont(24),
  },
  w52: {
    width: RFont(52),
  },
  w6: {
    width: RFont(6),
  },
  w60: {
    width: RFont(60),
  },
  w8: {
    width: RFont(8),
  },
  w88: {
    width: RFont(88),
  },
  wAuto: {
    width: 'auto',
  },
});

export const borderRadiusStyles = StyleSheet.create({
  bb16: {
    borderBottomLeftRadius: RFont(16),
    borderBottomRightRadius: RFont(16),
  },
  bb2: {
    borderBottomLeftRadius: RFont(2),
    borderBottomRightRadius: RFont(16),
  },
  br0: {
    borderRadius: RFont(0),
  },
  br10: {
    borderRadius: RFont(10),
  },
  br100: {
    borderRadius: RFont(100),
  },
  br12: {
    borderRadius: RFont(12),
  },
  br14: {
    borderRadius: RFont(14),
  },
  br150: {
    borderRadius: RFont(150),
  },
  br16: {
    borderRadius: RFont(16),
  },
  br20: {
    borderRadius: RFont(20),
  },
  br32: {
    borderRadius: RFont(32),
  },
  br4: {
    borderRadius: RFont(4),
  },
  br44: {
    borderRadius: RFont(44),
  },
  br6: {
    borderRadius: RFont(6),
  },
  br60: {
    borderRadius: RFont(60),
  },

  br666: {
    borderRadius: RFont(666),
  },
  br70: {
    borderRadius: RFont(70),
  },
  br8: {
    borderRadius: RFont(8),
  },
  br99: {
    borderRadius: RFont(99),
  },
  bt12: {
    borderTopLeftRadius: RFont(12),
    borderTopRightRadius: RFont(12),
  },
  bt16: {
    borderTopLeftRadius: RFont(16),
    borderTopRightRadius: RFont(16),
  },
  bt20: {
    borderTopLeftRadius: RFont(20),
    borderTopRightRadius: RFont(20),
  },
});

export const borderWidthStyles = StyleSheet.create({
  b0: {
    borderWidth: 0,
  },
  bbw1: {
    borderBottomWidth: RFont(1),
  },
  blw1: {
    borderLeftWidth: RFont(1),
  },
  brw1: {
    borderRightWidth: RFont(1),
  },
  bw0: {
    borderWidth: RFont(0),
  },
  bw1: {
    borderWidth: RFont(1),
  },
  bw2: {
    borderWidth: RFont(2),
  },
});
export const opacityStyles = StyleSheet.create({
  opacity_0_2: { opacity: 0.2 },
  opacity_0_4: { opacity: 0.4 },
  opacity_0_67: { opacity: 0.67 },
  opacity_1: { opacity: 1 },
});
export const zIndexStyles = StyleSheet.create({
  z10: { zIndex: 10 },
  z100: { zIndex: 100 },
});

export const boxStyle = StyleSheet.create({
  shadow: {
    elevation: RFont(4),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: RFont(4) },
    shadowOpacity: 0.05,
    shadowRadius: RFont(4),
  },
});
