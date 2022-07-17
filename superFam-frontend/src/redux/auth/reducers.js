import { authActions } from "./action"

const initState={
    isLoading: true,
    email: null,
    id: null,
    userId: null,
    isRegistered:false,
    isAuth: false,
    isError: false,
}

export const AuthReducer= (state= initState, action)=>{

    switch(action.type){
        
        case authActions.REGISTER_AUTH_REQUEST:{
            return(
                {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            )
        }
        case authActions.REGISTER_AUTH_SUCCESS:{
            return(
                {
                    ...state,
                    isLoading: false,
                    isRegistered: true,
                }
                )
            }
            case authActions.REGISTER_AUTH_FAILURE:{
                return(
                    {
                        ...state,
                        isLoading: false,
                        isError: true,
                    }
                )
            }
        case authActions.LOGIN_AUTH_REQUEST:{
            return(
                {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            )
        }
        case authActions.LOGIN_AUTH_SUCCESS:{
            return(
                {
                    ...state,
                    isLoading: false,
                    isAuth: true,
                    email: action.payload.email,
                    id: action.payload._id
                }
                )
            }
            case authActions.LOGIN_AUTH_FAILURE:{
                return(
                    {
                        ...state,
                        isLoading: false,
                        isError: true,
                    }
                )
            }
            
            default: 
                return state;
    }
}