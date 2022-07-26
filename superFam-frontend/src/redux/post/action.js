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

  UPLOAD_PICTURE_REQUEST: "UPLOAD_PICTURE_REQUEST",
  UPLOAD_PICTURE_SUCCESS: "UPLOAD_PICTURE_SUCCESS",
  UPLOAD_PICTURE_FAILURE: "UPLOAD_PICTURE_FAILURE",

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

export const createPost = (newPost,toast) => (dispatch) => {
  console.log(newPost,"new")
  dispatch(requestCreatePost());

  try {
    axios
      .post("/post", newPost)
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successCreatePost());

        toast({
          title: `Post Uploaded successfully! 🥳`,
          status: "success",
          duration: 5000,
          position: 'bottom-right',
          isClosable: true,
        });
      })
      .then(() => {
        dispatch(getTimelinePost());
      })
      .catch((err) => {
        dispatch(failureCreatePost());
        toast({
          title: `Failed to upload post! try again later!`,
          status: "error",
          duration: 3000,
          position: 'bottom-right',
          isClosable: true,
        });
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

const successTimelinePost = (payload) => {
  return {
    type: postActions.GET_TIMELINE_POST_SUCCESS,
    payload: payload
  };
};

const failureTimelinePost = () => {
  return {
    type: postActions.GET_TIMELINE_POST_FAILURE,
  };
};

export const getTimelinePost = (toast) => (dispatch,getState) => {
  dispatch(requestTimelinePost());

  const userId= getState().auth.userId;
  console.log(userId,"userID from timeline")

  try {

      axios.get(`/post/timeline/${userId}`)
      .then((res) => {
        console.log(res, "create-post");
        console.log(localStorage.getItem('userIdLocal'),"localId")
        console.log(localStorage.getItem('FamUserDetails'),"FamUserDetails")
        dispatch(successTimelinePost(res.data));
        toast({
          title: `Enjoy your feeds  🥳`,
          variant:"left-accent",
          duration: 3000,
          position: 'bottom-right',
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(failureTimelinePost());
        console.log("fail to fetch timeline")
        toast({
          title: `Failed to request posts, try later! `,
          variant:"left-accent",
          status: "error",
          duration: 4000,
          position: 'bottom-right',
          isClosable: true,
        });
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

const requestUploadPicture = () => {
  return {
    type: postActions.UPLOAD_PICTURE_REQUEST,
  };
};
const successUploadPicture = () => {
  return {
    type: postActions.UPLOAD_PICTURE_REQUEST,
  };
};
const failureUploadPicture = () => {
  return {
    type: postActions.UPLOAD_PICTURE_REQUEST,
  };
};

export const uploadPicture = (data, newPost,toast) => (dispatch) => {
  // console.log(newPost,"mmmmmmm")
  dispatch(requestUploadPicture());

  try {
    axios.post("/upload", data).then((res) => {

      dispatch(successUploadPicture())

    }).then(()=>{

      setTimeout(() =>{

        dispatch(createPost(newPost,toast));
      },2000)

    })
  } catch (err) {
    console.log(err, "errrrr");
    
    dispatch(failureUploadPicture());
  }
};
