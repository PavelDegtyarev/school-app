export interface User {
  email: string
  password: string
  name?: string
  returnSecureToken?: boolean
}

export interface fbAuthResponse {
  idToken?: string
  expiresIn?: string
  email?: string
  displayName?: string
  localId?: string
}

export interface UserData {
  kind?: string
  users: UserForUserData[]
}

interface UserForUserData {
  email?: string
  displayName?: string
  localId: string

}
