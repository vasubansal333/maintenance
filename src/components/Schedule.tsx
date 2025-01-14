import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Toast} from "primereact/toast"
import { RootState } from "../redux/reducers";
import { scheduleAction } from "../redux/actions";
import { SCHEDULE } from "../redux/constants";
import {Column, ColumnFilterElementTemplateOptions} from "primereact/column"
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Schedule } from "../models/Schedule";

export default function ScheduleRead(){
    const dispatch=useDispatch();
    const scheduleState=useSelector((state:RootState)=>state.schedule);
    const [schedules,setschedules]=useState<any[]>([]);
    const [globalFilter,setGlobalFilter]=useState<string>("");
    const toast =useRef<Toast>(null)
    const [loading1,setLoading1]=useState(true);
    const [isScheduleLoaded,setIsScheduleLoaded]=useState(false);

    useEffect(()=>{
        dispatch(scheduleAction.getScheduleRequest());
    },[dispatch]
)

useEffect(()=>{
    switch(scheduleState.actionType){
        case SCHEDULE.GET_SCHEDULE_REQUEST_SUCCESS:
            setIsScheduleLoaded(true);
            break;
        case SCHEDULE.GET_SCHEDULE_REQUEST_FAILED:
            toast.current?.show({
                severity:"error",
                summary:"Error",
                detail:scheduleState.error
            })
        break;
        default:
        break;
    }
},[scheduleState])

const getSchedules=useCallback((data:Schedule[])=>{
    return data.map((d:any)=>{
        let expirationDate:Date|null=null;
        if(d.ExpirationDate){
            expirationDate=parseDate(d.ExpirationDate);
        }

        return {
            ...d,
            ExpirationDate:expirationDate
        }
    })
    
},[])

useEffect(()=>{
    if(isScheduleLoaded){
        setschedules(getSchedules(scheduleState.data.Result))
        setLoading1(false);
    }
},[isScheduleLoaded,getSchedules,scheduleState.data])

const parseDate =(dateString:string):Date | null =>{
    if(!dateString){
        return null;
    }
    const match=/\/Date\((\d+)([-+]\d{4})?\)\//.exec(dateString);
    if(match){
        const timestamp=parseInt(match[1],10);
        return new Date(timestamp)
    }
    return null
}

const dateFilterTemplate=(options:ColumnFilterElementTemplateOptions)=>{
return (
<Calendar
    value={options.value}
    onChange={(e)=>options.filterCallback(e.value,options.index)}
    dateFormat="mm/dd/yy"
    placeholder="mm/dd/yyyy"
    mask="99/99/9999"
    />

)

}

const truncateText=(text,maxLength)=>{
    if(text.length>maxLength){
        return text.substring(0,maxLength)+"...";
    }
    return text;
}

return (
    <div>
        <div>
            <div className="p-inputgroup" style={{marginBottom:"1em"}}>
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>

                </span>
                <InputText
                placeholder="Global Search"
                value={globalFilter}
                onChange={(e)=>setGlobalFilter(e.target.value)}
                />

            </div>
            {loading1?(
                <div className="spinner-container"
                style={{textAlign:"center",margin:"2em 0"}}>
                <ProgressSpinner/>
                </div>
            ):(<DataTable
                className="custom-datatable"
                value={schedules}
                scrollable
                scrollHeight="90vh"
                showGridlines
                virtualScrollerOptions={{itemSize:46}}
                tableStyle={{minWidth:"50rem",width:"100%"}}
                globalFilter={globalFilter}
                dataKey="Id"
                loading={loading1}
                size="small">
                <Column
                field="Name"
                header="Name"
                body={(rowData)=>truncateText(rowData.Name,20)}
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>
                <Column
                field="Owner"
                header="Owner"
                body={(rowData)=>truncateText(rowData.Owner,20)}
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>
                <Column
                field="ExpirationDate"
                header="Expiration Date"
                body={(rowData)=>rowData.ExpirationDate?rowData.ExpirationDate.toLocaleDateString():"N/A"}
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} dataType="date" filter sortable filterElement={dateFilterTemplate}></Column>
                <Column
                field="DistributionGroups"
                header="Distribution Groups"
                body={(rowData)=>truncateText(rowData.DistributionGroups.map((group)=>group.Name).join(","),30)}
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>
                <Column
                field="TriggerGroups"
                header="Trigger Groups"
                body={(rowData)=>truncateText(rowData.TriggerGroups.map((group)=>group.Name).join(","),30)}
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>
                <Column
                field="FileLocations"
                header="File Locations"
                body={(rowData)=>{
                    const fileLocations=rowData.DistributionGroups.flatMap
                    ((group)=>group.Entries.filter
                    ((entry)=>entry.__type==="FileDistribution:#BatchReports.Models.Distributions").flatMap((entry)=>entry.FileDestinations.map((dest)=>dest.FileLocation)));
                    return truncateText(fileLocations.join(","),30)
                }}
                
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>

<Column
                field="Unsubscriptions"
                header="Unsubscriptions"
                body={(rowData)=>truncateText(rowData.Unsubscriptions.join(","),30)}
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>

<Column
                field="DisableFlag"
                header="Disable"
                style={{width:"10%",
                    whiteSpace:"nowrap",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }} filter sortable></Column>
                
                </DataTable>
            )
        }
        </div>
    </div>
)






}