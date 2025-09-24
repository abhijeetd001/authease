# User Authentication App (React Native + Expo)

A modular authentication flow using Context API, React Navigation, and AsyncStorage. Supports Signup, Login, persistent session, and protected Home. Designed for clarity and maintainability.

## Features
- Context-based auth: login, signup, logout with a simple API.
- Persistent session with AsyncStorage; auto-redirect to Home when already logged in.
- Signup saves user and credentials locally; Login validates against saved data.
- Reusable UI components: Input and AppButton.
- Beginner-friendly, production-minded structure.

## Tech Stack
- React Native (Expo compatible)
- TypeScript
- React Navigation (native stack)
- AsyncStorage
- Context API

## Project Structure
- App.tsx – Navigation container and auth-aware stack.
- AuthContext.tsx – Auth provider with AsyncStorage persistence.
- components/Input.tsx – Reusable text input.
- components/AppButton.tsx – Reusable button.
- screens/LoginScreen.tsx – Validates and logs in via stored credentials.
- screens/SignupScreen.tsx – Validates and stores user + credentials.
- screens/HomeScreen.tsx – Displays user and supports logout.

## Setup

### Prerequisites
- Node.js LTS
- Expo CLI (or use npx for on-demand)
- iOS Simulator / Android Emulator / Expo Go

### Install
1. Install dependencies:
   - npm install
   - npx expo install @react-native-async-storage/async-storage
   - npx expo install @react-navigation/native @react-navigation/native-stack
   - npx expo install react-native-screens react-native-safe-area-context
2. Run the app:
   - npx expo start

### Windows PowerShell note
If script execution is blocked:
- Open PowerShell as Administrator and run:
  - Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
- Restart the terminal.

## How It Works

### Persistence
- On app start, AuthProvider loads user from AsyncStorage and sets auth state.
- While loading, a spinner is shown.
- If user exists, navigator starts at Home; otherwise at Login.

### Signup
- Validates name, email format, password length (≥ 6).
- Saves:
  - user (name, email) under key "user"
  - credentials (email, password) under key "credentials"
- Navigates to Home on success.

### Login
- Validates email format and non-empty password.
- Loads "credentials" from AsyncStorage, compares with input.
- On match, loads "user" and navigates to Home.

### Logout
- Clears user state and removes "user" from storage.
- Returns to Login.

## Keys
- STORAGE_USER_KEY: user
- STORAGE_CREDENTIALS_KEY: credentials

## Example: handleLogin (in LoginScreen)
