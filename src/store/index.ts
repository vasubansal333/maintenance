import {configureStore,Tuple} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import reducer from '../redux/reducers'
import saga from '../redux/sagas'


const sagaMiddleware=createSagaMiddleware();
const store=configureStore({
    reducer:reducer,
    middleware:()=> new Tuple(sagaMiddleware)

})

sagaMiddleware.run(saga);

export default store;
