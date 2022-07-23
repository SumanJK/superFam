import {legacy_createStore, combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";

const { AuthReducer } = require("./auth/reducers");
const { PostReducer } = require("./post/reducer");

const rootReducer = combineReducers({
  auth: AuthReducer,
  post: PostReducer
})

export const store= legacy_createStore(rootReducer, applyMiddleware(thunk))