import { Schedule } from "../../models/Schedule";
import { SCHEDULE } from "../constants";

export const getScheduleRequest=()=>({
    type:SCHEDULE.GET_SCHEDULE_REQUEST
})

export const getScheduleRequestSuccess=(data:Schedule)=>({
    type:SCHEDULE.GET_SCHEDULE_REQUEST_SUCCESS,
    payload:data
})

export const getScheduleRequestFailed=(error:any)=>({
    type:SCHEDULE.GET_SCHEDULE_REQUEST_FAILED,
    payload:error

})