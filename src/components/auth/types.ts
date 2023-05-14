export interface IAuthUser {
    isAuth: boolean
}

export enum AuthUserActionType {
    LOGIN_USER="AUTH_LOGIN_USER",
    LOGOUT_USER="AUTH_LOGOUT_USER"
}