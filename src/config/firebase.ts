/**
 * Firebase configuration module.
 *
 * Reads all Firebase credentials from environment variables.
 * Never hardcode secrets — they must come from .env files or
 * the CI/CD environment.
 *
 * @see .env.example for the required environment variables.
 */

/** Firebase configuration shape. */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * Reads a required environment variable or throws a descriptive error.
 * Logs a structured warning (without leaking the value) if the variable is missing.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(JSON.stringify({level: 'error', message: `Missing required environment variable: ${name}`}));
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Returns the Firebase configuration from environment variables.
 * Call this lazily (not at module load time) so the app can
 * handle missing config gracefully.
 */
export function getFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: requireEnv('FIREBASE_API_KEY'),
    authDomain: requireEnv('FIREBASE_AUTH_DOMAIN'),
    projectId: requireEnv('FIREBASE_PROJECT_ID'),
    storageBucket: requireEnv('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: requireEnv('FIREBASE_MESSAGING_SENDER_ID'),
    appId: requireEnv('FIREBASE_APP_ID'),
  };
}
