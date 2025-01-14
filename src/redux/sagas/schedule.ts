import {put,call,takeLatest} from 'redux-saga/effects';
import { SCHEDULE } from '../constants';
import { ScheduleService } from '../../services';
import { scheduleAction } from '../actions';

function* getSchedulesFunction(action:any){
    try {
        const ScheduleResponse=yield call(ScheduleService.getAllSchedules);
        yield put(scheduleAction.getScheduleRequestSuccess(ScheduleResponse));

    }catch(error:any){
        yield put(scheduleAction.getScheduleRequestFailed(error.message));
    }
}

export function* watchSchedule(){
    yield takeLatest(SCHEDULE.GET_SCHEDULE_REQUEST,getSchedulesFunction)
}