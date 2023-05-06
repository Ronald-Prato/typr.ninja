import { Dispatch, AnyAction } from 'redux'
import { _setUserData } from './user.actions'
import { UserData } from '@/types/user'

export const setUserData = (userData: Partial<UserData>) => {
  return (dispatch: Dispatch<AnyAction>): void => {
    dispatch(_setUserData(userData))
  }
}
