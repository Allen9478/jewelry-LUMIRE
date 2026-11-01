import { describe, test, expect } from 'vitest'
import { FirebaseError } from 'firebase/app'
import { getAuthErrorKey } from '@/utils/authError'

describe('getAuthErrorKey', () => {
  test.each([
    ['auth/invalid-credential', 'auth.errMsg.invalidCredential'],
    ['auth/invalid-email', 'auth.errMsg.invalidEmail'],
    ['auth/email-already-in-use', 'auth.errMsg.emailInUse'],
    ['auth/weak-password', 'auth.errMsg.weakPassword'],
    ['auth/user-not-found', 'auth.errMsg.userNotFound'],
  ])('錯誤代碼 %s,回傳 %s', (code, expectedKey) => {
    const result = getAuthErrorKey(new FirebaseError(code, 'test'))
    expect(result).toBe(expectedKey)
  })

  test('不認識的錯誤代碼，回傳通用錯誤 key', () => {
    const error = new FirebaseError('auth/this-code-does-not-exist', 'test')
    const result = getAuthErrorKey(error)
    expect(result).toBe('auth.errMsg.genericError')
  })

  test('不是 FirebaseError 的錯誤，回傳通用錯誤 key', () => {
    const error = new Error('network down')
    const result = getAuthErrorKey(error)
    expect(result).toBe('auth.errMsg.genericError')
  })
})
