
import { all } from 'redux-saga/effects';
import { watchSchedule } from './schedule';

export default function* sagas() {
    yield all([watchSchedule()])
}