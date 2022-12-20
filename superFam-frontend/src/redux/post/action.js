import axios from "axios";
import { updateUser } from "../auth/action";

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
  // console.log(newPost,"new")
  dispatch(requestCreatePost());

  try {
    axios
      .post("https://superfam-backend-production.up.railway.app/api/post", newPost)
      .then((res) => {
        // console.log(res, "create-post");
        dispatch(successCreatePost());

        toast({
          title: `Post Uploaded successfully! 🥳`,
          status: "success",
          duration: 1000,
          position: 'bottom',
          isClosable: true,
        });
      })
      .then(() => {
        dispatch(getTimelinePost(toast));
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

export const deletePost = (toast, postId,userIds) => (dispatch, getState) => {
  dispatch(requestDeletePost())

console.log(userIds,"USERS")
  try {
    axios({
      method:'DELETE',
      url:`https://superfam-backend-production.up.railway.app/api/post/${postId}`, 
      data:{userId: userIds}
    })
      .then((res) => {
        console.log(res, "create-post");
        dispatch(successDeletePost());

        toast({
          title: `Post removed`,
          status: "success",
          duration: 1000,
          position: 'bottom',
          isClosable: true,
        });
      })
      .then(() => {
        dispatch(getTimelinePost(toast));
      }).then(()=>{
        dispatch(getUserPost(userIds,toast))
      })
      .catch((err) => {
        dispatch(failureDeletePost());
        toast({
          title: err.response.data,
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

  const userId= getState().auth.userId
  // console.log(userId,"userID from timeline")

  try {

      axios.get(`https://superfam-backend-production.up.railway.app/api/post/timeline/${userId}`)
      .then((res) => {
        // console.log(res, "got-post");
        // console.log(localStorage.getItem('userIdLocal'),"localId")
        // console.log(localStorage.getItem('FamUserDetails'),"FamUserDetails")
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
        // console.log("fail to fetch timeline")
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

// get user's post action

const requestUserPost = () => {
  return {
    type: postActions.GET_USER_POST_REQUEST,
  };
};

const successUserPost = (payload) => {
  return {
    type: postActions.GET_USER_POST_SUCCESS,
    payload:payload
  };
};

const failureUserPost = () => {
  return {
    type: postActions.GET_USER_POST_FAILURE,
  };
};

export const getUserPost = (id,toast) => (dispatch,getState) => {


  // console.log(userId,"userid of user post")


  dispatch(requestUserPost());
  try {
    axios.get(`https://superfam-backend-production.up.railway.app/api/post/profile/${id}`)
      .then((res) => {
        dispatch(successUserPost(res.data));
        toast({
          title: `Fetched all posts `,
          variant:"left-accent",
          status: "success",
          duration: 4000,
          position: 'bottom-right',
          isClosable: true,
        });
      })
      .catch((err) => {
        dispatch(failureUserPost());
        toast({
          title: `Failed to Fetched all post`,
          variant:"left-accent",
          status: "error",
          duration: 5000,
          position: 'bottom-right',
          isClosable: true,
        });
      });
  } catch (err) {
    console.log(err);
  }
};



//update profile/ cover pic
export const uploadProfilePicture = (data,updateProfile,userId,toast) => (dispatch) => {
  console.log(userId,updateProfile,"uerer")
  
  dispatch(requestUploadPicture());
  
  try {
    axios.post("https://superfam-backend-production.up.railway.app/api/upload", data).then((res) => {
      
      dispatch(successUploadPicture())
      
    }).then(()=>{
      dispatch(updateUser(updateProfile,userId,toast))
    })
    
  } catch (err) {
    // console.log(err, "errrrr");
    
    dispatch(failureUploadPicture());
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

export const uploadPicture = (data, newPost, toast) => (dispatch) => {

  dispatch(requestUploadPicture());

  try {
    axios.post("https://superfam-backend-production.up.railway.app/api/upload", data).then((res) => {

      dispatch(successUploadPicture())

    })
    .then(()=>{

      setTimeout(() =>{

        dispatch(createPost(newPost,toast));
      },2000)

    })
  } catch (err) {
    console.log(err, "errrrr");
    
    dispatch(failureUploadPicture());
  }
};