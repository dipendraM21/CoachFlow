This document provides a comprehensive overview of the profile image upload system implemented in CoachFlow.

## 0. Dependencies
The following packages and modules are used for this implementation:

- **[react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)** (`^7.2.1`): Handles camera capture and gallery selection.
- **Native `fetch` API**: Used for the upload request to ensure clean multipart boundary generation (bypassing Axios-specific issues).
- **[@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)**: Used to retrieve the Bearer token for authentication.
- **`PermissionsAndroid`**: Core React Native module used for requesting runtime permissions on Android.

## 1. Native Configuration

### Android
Configuration in `android/app/src/main/AndroidManifest.xml`:

- **Permissions**:
  - `READ_MEDIA_IMAGES`: Required for Android 13+ (API 33).
  - `READ_EXTERNAL_STORAGE`: Required for Android 12 and below (capped with `maxSdkVersion="32"`).
  - `CAMERA`: Required for taking photos.
  - `INTERNET`: Required for API requests.

- **Queries Block**: Added to support modern Android Intent resolution (preventing "No Activity found" errors):
  ```xml
  <queries>
      <intent>
          <action android:name="android.media.action.IMAGE_CAPTURE" />
      </intent>
      <intent>
          <action android:name="android.intent.action.PICK" />
          <data android:mimeType="image/*" />
      </intent>
      <intent>
          <action android:name="android.provider.action.PICK_IMAGES" />
          <data android:mimeType="image/*" />
      </intent>
  </queries>
  ```

### iOS
Configuration in `ios/CoachFlow/Info.plist`:

- `NSCameraUsageDescription`: Reason for accessing the camera.
- `NSPhotoLibraryUsageDescription`: Reason for accessing the photo gallery.

---

## 2. Permission Utility
Located at: `src/utils/permissions.ts`

Handles version-agnostic permission requests for Android:
- Detects the API level.
- Requests `READ_MEDIA_IMAGES` on API 33+.
- Requests `READ_EXTERNAL_STORAGE` on API 32 and below.

---

## 3. API Integration
Located at: `src/store/apis.ts`

The upload uses the native **`fetch` API** instead of Axios to ensure stable multipart boundary handling:

- **Endpoint**: `POST /upload/student/profile-photo`
- **Headers**: Only `Authorization: Bearer <token>` is sent. `Content-Type` is omitted to allow `FormData` to set the boundary automatically.
- **Payload Structure**:
  ```javascript
  formData.append('profilePhoto', {
    uri: asset.uri,
    type: asset.type,
    name: asset.fileName,
  });
  ```

---

## 4. Client-side Validation & UX

Implemented in `ProfileScreen.tsx` and `SetupProfileScreen.tsx`:

- **File Size**: Limited to **5 MB**.
- **File Types**: `image/jpeg`, `image/png`, `image/webp`.
- **Image Picker Config**:
  - `quality: 0.7` (Reduces bandwidth and storage costs).
  - `maxWidth: 800`, `maxHeight: 800` (Standardizes avatar dimensions).

### Error Handling
- **Camera Unavailable**: Detects if the device has no camera.
- **Permission Denied**: Informs the user if they rejected permissions.
- **Provider Fallback**: Gracefully handles scenarios where no gallery app is available.
- **Network Failure**: Provides clear feedback if the backend is unreachable or times out (120s buffer).

---

## 5. Repository Hygiene
Updated `.gitignore` to exclude build-time artifacts and temporary files, keeping the Git history focused on source code:
- Excluded `android/app/build*/`.
- Excluded compiled `.dex` and `.jar` files.
- Excluded temporary shell scripts and Android IDE local settings.
