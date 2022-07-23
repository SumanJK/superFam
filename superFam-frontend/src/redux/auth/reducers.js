import { authActions } from "./action"

const initState={
    isLoading: true,
    userId: null,
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
            console.log(action,"act")
            return(
                {
                    ...state,
                    isLoading: false,
                    isError:false,
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
                    userId: action.payload._id,
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