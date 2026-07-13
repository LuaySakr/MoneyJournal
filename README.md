# Money Journal

A React Native mobile app to track personal finances, powered by Firebase.

## Tech Stack

- **Frontend**: React Native 0.79 + TypeScript (strict mode)
- **Backend**: Firebase Functions
- **Database**: Firebase Firestore
- **Testing**: Jest + React Native Testing Library
- **Linting**: ESLint + Prettier

## Prerequisites

- Node.js >= 20
- React Native CLI (`npx react-native`)
- Xcode (for iOS development)
- Android Studio (for Android development)
- Firebase account

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourusername/money-journal.git
cd money-journal
npm install
```

### 2. Configure environment

Copy the example environment file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

> **Important**: Never commit the `.env` file. It contains secrets.

### 3. Run the app

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Development

### Available Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm start`         | Start the Metro bundler              |
| `npm run ios`       | Build and run on iOS simulator       |
| `npm run android`   | Build and run on Android emulator    |
| `npm test`          | Run the test suite                   |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Run TypeScript type checking         |
| `npm run format`    | Format code with Prettier            |

### Project Structure

```
├── App.tsx                  # Root application component
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── services/            # Business logic / API services
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── config/              # App configuration
├── __tests__/               # Test files
├── android/                 # Android native project
└── ios/                     # iOS native project
```

### Path Aliases

The project uses `@/` as an alias for `src/`:

```typescript
import HomeScreen from '@/screens/HomeScreen';
```

## CI/CD

The GitHub Actions CI pipeline runs on every push/PR to `main`:
- Type checking (`npm run typecheck`)
- Linting (`npm run lint`)
- Format check (`npm run format:check`)
- Tests with coverage (`npm test`)