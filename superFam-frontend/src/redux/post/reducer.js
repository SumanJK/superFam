import { postActions } from "./action"

const initState={
  isLoading: true,
  timelinePost:null,
  userPost:null,
  singlePost:null,
  isError:false,
}

export const PostReducer= (state= initState, action) =>{

  switch(action.type){
    case postActions.CREATE_POST_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.CREATE_POST_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          isError: false,
        }
      )
    }
    case postActions.CREATE_POST_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: true,
        }
      )
    }
    case postActions.UPDATE_POST_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.UPDATE_POST_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          isError: false,
        }
      )
    }
    case postActions.UPDATE_POST_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: true,
        }
      )
    }
    case postActions.DELETE_POST_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.DELETE_POST_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          isError: false,
        }
      )
    }
    case postActions.DELETE_POST_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: false,
        }
      )
    }
    case postActions.LIKE_POST_REQUEST:{
      return (
        {
          ...state,
          // isLoading: true,
          // isError: false,
        }
      )
    }
    case postActions.LIKE_POST_SUCCESS:{
      return (
        {
          ...state,
          // isLoading: false,
          // isError: false,
        }
      )
    }
    case postActions.LIKE_POST_FAILURE:{
      return (
        {
          ...state,
          // isLoading: false,
          // isError: true,
        }
      )
    }
    case postActions.GET_SINGLE_POST_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.GET_SINGLE_POST_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          singlePost:action.payload,
          isError: false,
        }
      )
    }
    case postActions.GET_SINGLE_POST_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: true,
        }
      )
    }
    case postActions.GET_TIMELINE_POST_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.GET_TIMELINE_POST_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          timelinePost:action.payload,
          isError: false,
        }
      )
    }
    case postActions.GET_TIMELINE_POST_FAILURE:{
      console.log("failed man")
      return (
        {
          ...state,
          isLoading: false,
          timelinePost:null,
          userPost:null,
          isError: true,
        }
      )
    }
    case postActions.GET_USER_POST_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.GET_USER_POST_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          userPost:action.payload,
          isError: false,
        }
      )
    }
    case postActions.GET_USER_POST_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: true,
        }
      )
    }
    case postActions.UPLOAD_PICTURE_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case postActions.UPLOAD_PICTURE_SUCCESS:{
      return (
        {
          ...state,
          isLoading: false,
          isError: false,
        }
      )
    }
    case postActions.UPLOAD_PICTURE_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: true,
        }
      )
    }
    
    default: {
      return state
    }
  }
}