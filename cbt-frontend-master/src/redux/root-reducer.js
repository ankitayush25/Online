import { combineReducers } from "redux";

import reducer from "./question/question.reducer";

const rootReducer = combineReducers({ index: reducer });

export default rootReducer;
