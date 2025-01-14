import {combineReducers} from "redux";

import schedule from "./schedule";

const reducers =combineReducers({
    schedule:schedule
})

export type RootState=ReturnType<typeof reducers>

export default reducers