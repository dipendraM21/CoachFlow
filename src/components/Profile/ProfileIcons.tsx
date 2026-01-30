import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import colors from '../../theme/colors';

interface IconProps {
  color?: string;
  size?: number;
}

export const PersonalInfoIcon: React.FC<IconProps> = ({ color = colors.info, size = 20 }) => (
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

export const BatchIcon: React.FC<IconProps> = ({ color = colors.info, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5C4 18.837 4.53726 18.3 5.2 18.3H18.8C19.4627 18.3 20 18.837 20 19.5V19.5C20 20.163 19.4627 20.7 18.8 20.7H5.2C4.53726 20.7 4 20.163 4 19.5V19.5Z"
      fill={color}
    />
    <Path
      d="M6 3H18C19.1046 3 20 3.89543 20 5V18.3H4V5C4 3.89543 4.89543 3 6 3Z"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M9 7H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const CertificateIcon: React.FC<IconProps> = ({ color = colors.info, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15L8.5 17L9.5 13L6.5 10.5L10.5 10L12 6L13.5 10L17.5 10.5L14.5 13L15.5 17L12 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PerformanceIcon: React.FC<IconProps> = ({ color = colors.warning, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const HelpIcon: React.FC<IconProps> = ({ color = colors.success, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path d="M12 17H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ color = colors.grey_600, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.4 15C20.2 14.4 20.5 13.4 20.2 12.5C20 11.8 19.8 11.1 19.4 10.5C19.1 10 19.1 9.4 19.4 8.9L19.7 8.4C20.2 7.5 19.9 6.4 19 6C18.4 5.7 17.8 5.6 17.2 5.5C16.6 5.4 16.1 5 15.8 4.5C15.5 3.9 15.3 3.3 15.2 2.7C15.1 1.7 14.2 1 13.2 1H10.8C9.8 1 8.9 1.7 8.8 2.7C8.7 3.3 8.5 3.9 8.2 4.5C7.9 5 7.4 5.4 6.8 5.5C6.2 5.6 5.6 5.7 5 6C4.1 6.4 3.8 7.5 4.3 8.4L4.6 8.9C4.9 9.4 4.9 10 4.6 10.5C4.2 11.1 4 11.8 3.8 12.5C3.5 13.4 3.8 14.4 4.6 15L4.9 15.5C5.4 16.3 5.4 17.3 4.9 18.1L4.6 18.6C4.1 19.5 4.4 20.6 5.3 21C5.9 21.3 6.5 21.4 7.1 21.5C7.7 21.6 8.2 22 8.5 22.5C8.8 23.1 9 23.7 9.1 24.3C9.2 25.3 10.1 26 11.1 26H13.5C14.5 26 15.4 25.3 15.5 24.3C15.6 23.7 15.8 23.1 16.1 22.5C16.4 22 16.9 21.6 17.5 21.5C18.1 21.4 18.7 21.3 19.3 21C20.2 20.6 20.5 19.5 20 18.6L19.7 18.1C19.3 17.3 19.3 16.3 19.7 15.5L20 15H19.4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ color = colors.danger, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M16 17L21 12L16 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ color = colors.grey_600, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const EditIcon: React.FC<IconProps> = ({ color = colors.info, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CameraIcon: React.FC<IconProps> = ({ color = colors.white, size = 12 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
