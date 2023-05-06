import produce from 'immer'
import { _setUserData } from './user.actions'
import { UserData } from '@/types/user'

const initialState: UserData = {
  elo: -1,
  email: '',
  nickname: '',
  uid: '',
  points: -1,
  profilePic: '',
}

type UsersActions = ReturnType<typeof _setUserData>

const usersReducer = produce(
  (draft: UserData, action: UsersActions): UserData => {
    const { type } = action
    switch (type) {
      case 'users/SET_USER_DATA':
        draft = action.payload
        return draft

      default:
        return draft
    }
  },
  initialState
)

export { usersReducer }
