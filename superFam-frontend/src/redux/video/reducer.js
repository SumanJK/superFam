import { videoActions } from "./action"


const initState={
  isLoading: true,
  famTrendVideos:null,
  famSearchedVideos:null,
  isError:false,
}

export const VideoReducer= (state= initState, action) =>{

  switch(action.type){
    case videoActions.GET_TRENDING_VIDEO_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case videoActions.GET_TRENDING_VIDEO_SUCCESS:{

      return (
        {
          ...state,
          isLoading: false,
          famTrendVideos:action.payload,
          famSearchedVideos:null,
          isError: false,
        }
      )
    }
    case videoActions.GET_TRENDING_VIDEO_FAILURE:{
      return (
        {
          ...state,
          isLoading: false,
          isError: true,
        }
      )
    }
    case videoActions.GET_SEARCHED_VIDEO_REQUEST:{
      return (
        {
          ...state,
          isLoading: true,
          isError: false,
        }
      )
    }
    case videoActions.GET_SEARCHED_VIDEO_SUCCESS:{

      return (
        {
          ...state,
          isLoading: false,
          famSearchedVideos:action.payload,
          famTrendVideos:null,
          isError: false,
        }
      )
    }
    case videoActions.GET_SEARCHED_VIDEO_FAILURE:{
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