import { ScheduleHttpResponse } from "../models/ScheduleResponse";
import axiosInstance from "./axiosInstance";

const ScheduleService ={
    async getAllSchedules():Promise<ScheduleHttpResponse>{
        try {
            const response =await axiosInstance.get<ScheduleHttpResponse>('/500_records_with_unsubscriptions.json')
            return response.data;
        }

        catch (error){
            throw new Error('Failed to fetch schedules')
        }
    }
}

export default ScheduleService