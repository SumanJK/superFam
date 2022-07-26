import { authActions } from "./action"

const initState={
    isLoading: true,
    userId: JSON.parse(localStorage.getItem('userIdLocal')) || null,
    userDetails: JSON.parse(localStorage.getItem('FamUserDetails')) || null,
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
            localStorage.setItem('userIdLocal',JSON.stringify(action.payload._id))
            localStorage.setItem('FamUserDetails',JSON.stringify(action.payload))
            // console.log(action.payload.firstname,"firstnameRedux")
            return(
                {
                    ...state,
                    isLoading: false,
                    isAuth: true,
                    userDetails: action.payload,
                    firstname: action.payload.firstname,
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
        case authActions.UPDATE_USER_REQUEST:{
            return(
                {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            )
        }
        case authActions.UPDATE_USER_SUCCESS:{
            // localStorage.setItem('userIdLocal',JSON.stringify(action.payload._id))
            // localStorage.setItem('FamUserDetails',JSON.stringify(action.payload))
            // console.log(action.payload.firstname,"firstnameRedux")
            return(
                {
                    ...state,
                    isLoading: false,
                    isError:false
                }
                )
            }
            case authActions.UPDATE_USER_FAILURE:{
                return(
                    {
                        ...state,
                        isLoading: false,
                        isError: true,
                    }
                )
            }
            case authActions.LOGOUT_AUTH_REQUEST:{
                localStorage.removeItem('FamUserDetails')
                localStorage.removeItem('userIdLocal')
                return(
                    {
                        ...state,
                        isLoading: false,
                        userId:null,
                        userDetails:null,
                        isAuth:false,
                        isError: false,
                    }
                )
            }
            
            default: 
                return state;
    }
}