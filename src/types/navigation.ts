export type GuestStackParamList = {
  Login: { phoneNumber?: string } | undefined;
  VerifyOtp: { phoneNumber: string };
  SetupProfile: { mode: 'create' | 'edit' } | undefined;
  MainTab: undefined;
  BatchesListing: undefined;
  BatchDetails: { batchId: string };
  AcademyProfile: { instituteId: string };
};

export type RootStackParamList = {
  MainTab: undefined;
  BatchesListing: undefined;
  BatchDetails: { batchId: string };
  AcademyProfile: { instituteId: string };
  Profile: undefined;
  SetupProfile: {
    mode: 'create' | 'edit';
  };
  HelpSupport: undefined;
  Notifications: undefined;
};

export type OnboardingStackParamList = {
  SetupProfile: undefined;
};
