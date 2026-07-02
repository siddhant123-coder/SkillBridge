# SkillBridge

A skill-sharing mobile app connecting learners with local trainers/coaches.

## Sprint 1 Scope

This build contains **only**:
- Clean project structure (`src/components`, `src/screens`, `src/theme`, `src/constants`)
- Reusable design token system (`colors`, `spacing`, `typography`)
- A single static Login screen (phone number input + Send OTP button)

**Not included yet:** navigation, OTP verification, authentication logic, and any backend/API calls. These are planned for later sprints.

## Tech Stack

- Expo (SDK 57)
- React Native 0.86
- TypeScript (strict mode)
- Functional components + hooks
- `StyleSheet` API (no NativeWind, no Tailwind, no styled-components)

## Getting Started

```bash
npm install
npx expo start
```

Then press `a` to open on an Android emulator, or scan the QR code with the Expo Go app on a physical Android device.

## Project Structure

```
SkillBridge/
├── assets/                        # App icons, splash images
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   └── PrimaryButton.tsx  # Reusable full-width CTA button
│   │   └── Input/
│   │       └── PhoneInput.tsx     # Reusable phone number field
│   ├── screens/
│   │   └── auth/
│   │       └── LoginScreen.tsx    # Sprint 1 login UI
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts               # Barrel export
│   └── constants/
│       └── app.ts                 # App-wide constants (app name, phone length, etc.)
├── App.tsx                        # Renders <LoginScreen /> only
├── index.ts                       # Expo entry point
├── app.json                       # Expo config
├── tsconfig.json
└── package.json
```

## Verified

- `npx tsc --noEmit` passes with zero errors.
- `npx expo export --platform android` bundles successfully (584 modules, no runtime import errors).
