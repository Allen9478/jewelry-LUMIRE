import { FirebaseError } from 'firebase/app'

const errorKeys: Record<string, string> = {
  'auth/invalid-credential': 'auth.errMsg.invalidCredential',
  'auth/invalid-email': 'auth.errMsg.invalidEmail',
  'auth/email-already-in-use': 'auth.errMsg.emailInUse',
  'auth/weak-password': 'auth.errMsg.weakPassword',
  'auth/user-not-found': 'auth.errMsg.userNotFound',
}

export function getAuthErrorKey(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : ''
  return errorKeys[code] ?? 'genericError'
}
