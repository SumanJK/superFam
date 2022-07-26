import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import { getTimelinePost } from "../post/action";

//Action types
export const authActions = {
  REGISTER_AUTH_REQUEST: "REGISTER_AUTH_REQUEST",
  REGISTER_AUTH_SUCCESS: "REGISTER_AUTH_SUCCESS",
  REGISTER_AUTH_FAILURE: "REGISTER_AUTH_FAILURE",

  LOGIN_AUTH_REQUEST: "LOGIN_AUTH_REQUEST",
  LOGIN_AUTH_SUCCESS: "LOGIN_AUTH_SUCCESS",
  LOGIN_AUTH_FAILURE: "LOGIN_AUTH_FAILURE",

  LOGOUT_AUTH_REQUEST: "LOGOUT_AUTH_REQUEST",

  GET_AUTH_REQUEST: "GET_AUTH_REQUEST",
  GET_AUTH_SUCCESS: "GET_AUTH_SUCCESS",
  GET_AUTH_FAILURE: "GET_AUTH_FAILURE",

  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",
};

//POST Actions

export const registerAuthRequest = () => {
  return {
    type: authActions.REGISTER_AUTH_REQUEST,
  };
};
export const registerAuthSuccess = () => {
  return {
    type: authActions.REGISTER_AUTH_SUCCESS,
  };
};
export const registerAuthFailure = () => {
  return {
    type: authActions.REGISTER_AUTH_FAILURE,
  };
};

export const registerUser = (userData, toast, navigate) => (dispatch) => {
  // const toast = useToast()
  // const navigate = useNavigate();

  dispatch(registerAuthRequest());
  axios
    .post("/auth/register", userData)
    .then((res) => {
      console.log(res, "res");
      dispatch(registerAuthSuccess(res.data));

      toast({
        title: `Congrats, ${userData.firstname} 🥳`,
        description: "Your account has been created!",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    })
    .then(() => {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    })
    .catch((err) => {
      console.log(err, "err");
      dispatch(registerAuthFailure());

      if (err.message !== "Request failed with status code 500") {
        toast({
          title: err.response.data,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "You are facing server error, try again to register",
          status: "error",
          isClosable: true,
        });
      }
      // console.log(err)
    });
};
export const loginAuthRequest = () => {
  return {
    type: authActions.LOGIN_AUTH_REQUEST,
  };
};
export const loginAuthSuccess = (data) => {
  // console.log(data,"payl")
  return {
    type: authActions.LOGIN_AUTH_SUCCESS,
    payload: data,
  };
};
export const loginAuthFailure = () => {
  return {
    type: authActions.LOGIN_AUTH_FAILURE,
  };
};

export const loginUser = (payload,toast,navigate) => (dispatch, getState) => {
  dispatch(loginAuthRequest());

  axios
    .post("/auth/login", payload)
    .then((res) => {
      console.log(res,"rest")
      dispatch(loginAuthSuccess(res.data))
      toast({
        title: ` ${res?.data.firstname}, you have been logged in successfully! 🥳`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    })
    .then(()=>{
      console.log("yes")
      setTimeout(() => {
      dispatch(getTimelinePost())
      },2000)
    })
    .then(() => {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    })
    .catch((err) => {
      dispatch(loginAuthFailure())
      if (err.message !== "Request failed with status code 500") {
        toast({
          title: err.response.data,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "You are facing server error, try again to register",
          status: "error",
          isClosable: true,
        });
      }
      // console.log(err)
    });
};
//GET Actions

export const getAuthRequest = () => {
  return {
    type: authActions.GET_AUTH_REQUEST,
  };
};
export const getAuthSuccess = (data) => {
  return {
    type: authActions.GET_AUTH_SUCCESS,
    payload: data,
  };
};
export const getAuthFailure = () => {
  return {
    type: authActions.GET_AUTH_FAILURE,
  };
};


export const logoutRequest = () => {
  return {
    type: authActions.LOGOUT_AUTH_REQUEST,
  };
};


export const logoutUser=(toast)=>(dispatch)=>{

  dispatch(logoutRequest())

  toast({
    title: "you have been logged out!",
    status: "warning",
    isClosable: true,
  });

    dispatch(getTimelinePost(toast))
}


export const updateUserRequest=()=>{
  return {
    type: authActions.UPDATE_USER_REQUEST
  }
}
export const updateUserSuccess=()=>{
  return {
    type: authActions.UPDATE_USER_SUCCESS
  }
}
export const updateUserFailure=()=>{
  return {
    type: authActions.UPDATE_USER_FAILURE
  }
}

export const updateUser= (payload, toast)=> (dispatch)=>{

  const userId= JSON.parse(localStorage.getItem('userIdLocal'))
  
  dispatch(updateUserRequest());

  axios
    .post(`/users/${userId}`, payload)
    .then((res) => {
      console.log(res,"rest")
      console.log(res,"updated post")
      dispatch(updateUserSuccess())
      toast({
        title: `Profile got updated 🙌`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    })
    .catch((err) => {
      console.log(err,"update err")
      dispatch(updateUserFailure())
      if (err.message !== "Request failed with status code 500") {
        toast({
          title: err.response.data,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "You are facing server error, try again update profile",
          status: "error",
          isClosable: true,
        });
      }
      // console.log(err)
    });
}