import { SCHEDULE } from "../constants";

const intialState={
    actionType:'',
    data:[],
    loading:false,
    error:null
};
const schedule =(state=intialState,action:any)=>{
    switch(action.type){
        case SCHEDULE.GET_SCHEDULE_REQUEST:
            return{
                ...state,
                actionType:action.type,
                loading:true,
                error:null,
            };
        case SCHEDULE.GET_SCHEDULE_REQUEST_SUCCESS:
            return{
                ...state,
                actionType:action.type,
                loading:false,
                data:action.payload,
                error:null
            };
            case SCHEDULE.GET_SCHEDULE_REQUEST_FAILED:
                return{
                    ...state,
                    actionType:action.type,
                    loading:false,
                    data:action.payload,
                    error:null
                };
            default:
                return state;
        
    }
}

export default schedule;