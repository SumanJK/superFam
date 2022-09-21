import {legacy_createStore, combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";

import { VideoReducer } from "./video/reducer";
const { AuthReducer } = require("./auth/reducers");
const { PostReducer } = require("./post/reducer");

const rootReducer = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  video: VideoReducer
})

export const store= legacy_createStore(rootReducer, applyMiddleware(thunk))