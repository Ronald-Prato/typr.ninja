import { UserData } from '@/types/user'
import { typedAction } from '../helpers'

export const _setUserData = (data: Partial<UserData>): any => {
  return typedAction('users/SET_USER_DATA', data)
}
