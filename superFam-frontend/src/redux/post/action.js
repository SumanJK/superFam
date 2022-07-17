import axios from "axios";

//ACTION TYPES
export const postActions = {
  CREATE_POST_REQUEST: "CREATE_POST_REQUEST",
  CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
  CREATE_POST_FAILURE: "CREATE_POST_FAILURE",

  UPDATE_POST_REQUEST: "UPDATE_POST_REQUEST",
  UPDATE_POST_SUCCESS: "UPDATE_POST_SUCCESS",
  UPDATE_POST_FAILURE: "UPDATE_POST_FAILURE",

  DELETE_POST_REQUEST: "DELETE_POST_REQUEST",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  DELETE_POST_FAILURE: "DELETE_POST_FAILURE",

  LIKE_POST_REQUEST: "LIKE_POST_REQUEST",
  LIKE_POST_SUCCESS: "LIKE_POST_SUCCESS",
  LIKE_POST_FAILURE: "LIKE_POST_FAILURE",

  GET_SINGLE_POST_REQUEST: "GET_SINGLE_POST_REQUEST",
  GET_SINGLE_POST_SUCCESS: "GET_SINGLE_POST_SUCCESS",
  GET_SINGLE_POST_FAILURE: "GET_SINGLE_POST_FAILURE",

  GET_TIMELINE_POST_REQUEST: "GET_TIMELINE_POST_REQUEST",
  GET_TIMELINE_POST_SUCCESS: "GET_TIMELINE_POST_SUCCESS",
  GET_TIMELINE_POST_FAILURE: "GET_TIMELINE_POST_FAILURE",

  GET_USER_POST_REQUEST: "GET_USER_POST_REQUEST",
  GET_USER_POST_SUCCESS: "GET_USER_POST_SUCCESS",
  GET_USER_POST_FAILURE: "GET_USER_POST_FAILURE",
};

//ACTIONS
//create post requests

const requestCreatePost = () => {
  return {
    type: postActions.CREATE_POST_REQUEST,
  };
};

const successCreatePost = () => {
  return {
    type: postActions.CREATE_POST_SUCCESS,
  };
};

const failureCreatePost = () => {
  return {
    type: postActions.CREATE_POST_FAILURE,
  };
};

export const createPost = () => (dispatch) => {
  dispatch(requestCreatePost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successCreatePost());
      })
      .then(() => {
        dispatch(getTimelinePost());
      })
      .catch((err) => {
        dispatch(failureCreatePost());
      });
  } catch (err) {
    console.log(err);
  }
};


//update post actions


const requestUpdatePost = () => {
  return {
    type: postActions.UPDATE_POST_REQUEST,
  };
};

const successUpdatePost = () => {
  return {
    type: postActions.UPDATE_POST_SUCCESS,
  };
};

const failureUpdatePost = () => {
  return {
    type: postActions.UPDATE_POST_FAILURE,
  };
};

export const updatePost = () => (dispatch) => {
  dispatch(requestUpdatePost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successUpdatePost());
      })
      .then(() => {
        dispatch(getSinglePost());
      })
      .catch((err) => {
        dispatch(failureUpdatePost());
      });
  } catch (err) {
    console.log(err);
  }
};

//delete post request

const requestDeletePost = () => {
  return {
    type: postActions.DELETE_POST_REQUEST,
  };
};

const successDeletePost = () => {
  return {
    type: postActions.DELETE_POST_SUCCESS,
  };
};

const failureDeletePost = () => {
  return {
    type: postActions.DELETE_POST_FAILURE,
  };
};

export const deletePost = () => (dispatch) => {
  dispatch(requestDeletePost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successDeletePost());
      })
      .then(() => {
        dispatch(getTimelinePost());
      })
      .catch((err) => {
        dispatch(failureDeletePost());
      });
  } catch (err) {
    console.log(err);
  }
};

//like/dislike post

const requestLikePost = () => {
  return {
    type: postActions.LIKE_POST_REQUEST,
  };
};

const successLikePost = () => {
  return {
    type: postActions.LIKE_POST_SUCCESS,
  };
};

const failureLikePost = () => {
  return {
    type: postActions.LIKE_POST_FAILURE,
  };
};

export const likePost = () => (dispatch) => {
  dispatch(requestLikePost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successLikePost());
      })
      .catch((err) => {
        dispatch(failureLikePost());
      });
  } catch (err) {
    console.log(err);
  }
};

//getSinglePost action

const requestSinglePost = () => {
  return {
    type: postActions.GET_SINGLE_POST_REQUEST,
  };
};

const successSinglePost = () => {
  return {
    type: postActions.GET_SINGLE_POST_SUCCESS,
  };
};

const failureSinglePost = () => {
  return {
    type: postActions.GET_SINGLE_POST_FAILURE,
  };
};

export const getSinglePost = () => (dispatch) => {
  dispatch(requestSinglePost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successSinglePost());
      })
      .catch((err) => {
        dispatch(failureSinglePost());
      });
  } catch (err) {
    console.log(err);
  }
};


//timeline post action

const requestTimelinePost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_REQUEST,
  };
};

const successTimelinePost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_SUCCESS,
  };
};

const failureTimelinePost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_FAILURE,
  };
};

export const getTimelinePost = () => (dispatch) => {
  dispatch(requestTimelinePost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successTimelinePost());
      })
      .catch((err) => {
        dispatch(failureTimelinePost());
      });
  } catch (err) {
    console.log(err);
  }
};

// get user action

const requestUserPost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_REQUEST,
  };
};

const successUserPost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_SUCCESS,
  };
};

const failureUserPost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_FAILURE,
  };
};

export const getUserPost = () => (dispatch) => {
  dispatch(requestUserPost());
  try {
    axios
      .post({
        method: "POST",
        url: "localhost://",
      })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successUserPost());
      })
      .catch((err) => {
        dispatch(failureUserPost());
      });
  } catch (err) {
    console.log(err);
  }
};