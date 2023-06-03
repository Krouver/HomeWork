import { IAuthUser, AuthUserActionType } from './types';
const initState: IAuthUser = {
    isAuth: false
}

export const AuthReducer = (state=initState, action: any): IAuthUser => {
    switch(action.type) {
        case AuthUserActionType.LOGIN_USER: {
            return {
                ...state,
                isAuth:true,
                user: action.payload
            };
        }
        case AuthUserActionType.LOGOUT_USER: {
            return {
                ...state,
                isAuth: false,
                user: undefined
            };
        }
    }

    return state;
}