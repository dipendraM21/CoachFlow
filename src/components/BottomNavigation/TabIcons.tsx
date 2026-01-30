import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface TabIconProps {
  color: string;
  size?: number;
}

export const HomeIcon: React.FC<TabIconProps> = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.75L12 2.25L21 9.75V20.25C21 20.6478 20.842 21.0294 20.5607 21.3107C20.2794 21.592 19.8978 21.75 19.5 21.75H4.5C4.10218 21.75 3.72064 21.592 3.43934 21.3107C3.15804 21.0294 3 20.6478 3 20.25V9.75Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 21.75V12.75H15V21.75"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BatchesIcon: React.FC<TabIconProps> = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path
      d="M10 8L16 12L10 16V8Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileIcon: React.FC<TabIconProps> = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ReportsIcon: React.FC<TabIconProps> = ({ color, size = 24 }) => (
   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M8 17V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M12 17V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M16 17V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
   </Svg>
);
