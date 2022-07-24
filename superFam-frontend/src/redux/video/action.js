import axios from "axios";

//ACTION TYPES
export const videoActions = {
  GET_TRENDING_VIDEO_REQUEST: "GET_TRENDING_VIDEO_REQUEST",
  GET_TRENDING_VIDEO_SUCCESS: "GET_TRENDING_VIDEO_SUCCESS",
  GET_TRENDING_VIDEO_FAILURE: "GET_TRENDING_VIDEO_FAILURE",

  GET_SEARCHED_VIDEO_REQUEST: "GET_SEARCHED_VIDEO_REQUEST",
  GET_SEARCHED_VIDEO_SUCCESS: "GET_SEARCHED_VIDEO_SUCCESS",
  GET_SEARCHED_VIDEO_FAILURE: "GET_SEARCHED_VIDEO_FAILURE",
};

//ACTIONS

export const getTrendRequest = () => {
  return {
    type: "GET_TRENDING_VIDEO_REQUEST",
  };
};

export const getTrendSuccess = (payload) => {
  return {
    type: "GET_TRENDING_VIDEO_SUCCESS",
    payload: payload,
  };
};

export const getTrendFailure = () => {
  return {
    type: "GET_TRENDING_VIDEO_FAILURE",
  };
};

export const getTrendingVideos = (toast) => (dispatch) => {
  dispatch(getTrendRequest());
  const key = "AIzaSyBz64CALKZ-_yCfPppZXxYzuW3SEN0NDdE";

  axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=20&key=${key}&part=snippet`
    )
    .then((res) => {
      console.log(res,"trend")
      dispatch(getTrendSuccess(res.data.items));
      toast({
        title: "Enjoy top 20 trending videos in India! 🔥",
        status: "success",
        position:'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      dispatch(getTrendFailure());
      toast({
        title: "Request failure!",
        description: ` Sorry we are facing some problem you can try later 🥺 `,
        status: "error",
        position:'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    });
};

//get search videos--->

export const getSearchVidRequest = () => {
  return {
    type: "GET_SEARCHED_VIDEO_REQUEST",
  };
};

export const getSearchVidSuccess = (payload) => {
  return {
    type: "GET_SEARCHED_VIDEO_SUCCESS",
    payload: payload,
  };
};

export const getSearchVidFailure = () => {
  return {
    type: "GET_SEARCHED_VIDEO_FAILURE",
  };
};

export const getSearchedVideos = (searchText,toast) => (dispatch) => {
  dispatch(getSearchVidRequest());
  const key = "AIzaSyBz64CALKZ-_yCfPppZXxYzuW3SEN0NDdE";

  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${searchText}&type=video&part=snippet&maxResults=20`
    )
    .then((res) => {
      dispatch(getSearchVidSuccess(res.data.items));
      toast({
        title: "Enjoy searched videos! 🙌",
        status: "success",
        position:'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      dispatch(getSearchVidFailure());
      toast({
        title: "Request failure!",
        description: ` Sorry we are facing some problem you can try later 🥺 `,
        status: "error",
        position:'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    });
};
