import React, { useEffect, useRef, useState } from 'react'
import { BiCalendar } from "react-icons/bi";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import moment from 'moment';
import DatePicker from "react-datepicker";
import axiosClient from '../axiosClient';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

function UpdateAttendance() {
    const {id} = useParams();

    const empRef = useRef(null);
   
    const [attendance, setAttendance] = useState({
        attendance_time_in: "",
        attendance_time_out: "",
        attendance_field: "",
        attendance_date: new Date(),
    })
  



    useEffect(()=>{
      
        Promise.all([getDataList('attendance'), getDataList('user')])
          .then((data) => {

              empRef.current.value = data[1].name || "";
              const {attendance_time_in, attendance_time_out, attendance_field} = data[0].data.find(att => att.id === parseInt(id))
           
             setAttendance({
                ...attendance,
                attendance_time_in: attendance_time_in,
                attendance_time_out: attendance_time_out,
                id,
                attendance_field
            });
            
          })
          .catch((err) => {
              console.error(err);
          });
     },[])


 
     const calculateTotalHours = (time_in, time_out) => {
  
        const diffWithoutBreak = moment.duration(moment(time_out).diff(moment(time_in)));
        const diff = moment.duration(diffWithoutBreak.asMilliseconds() - 60 * 60 * 1000);
        const hours = Math.floor(diff.asHours());
        return hours < 7 ? 'UNDERTIME' : 'WORKING';
      
    
      };

    const handleSubmitAttendance = (e) => {
        e.preventDefault();  
       
       const params = new URLSearchParams({
        ...attendance, 
        type: "UPDATE", 
        attendance_remarks: calculateTotalHours(attendance.attendance_time_in, attendance.attendance_time_out)
    }).toString();
   
       axiosClient.put(`/attendance/${id}?${params}`)
       .then(({data})=>{
            alert(data.message);
            window.location.href = "/attendance"
       })
         
    }

    
   const getDataList = async (path) => {
    try {
      const res = await axiosClient.get(`/${path}`)
      return res.data;
    } catch (err) {
       const {response} = err;
       if(response &&  response.status  === 422){
         console.log(response.data)
       }
    }
 } 



  

  


  return (
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className=" shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
            <div className="mb-4 flex items-center gap-5 justify-between">
        
                <form  method="dialog" className='flex-1' onSubmit={handleSubmitAttendance}>
                <h3 className="font-bold text-lg">Attendance</h3>
                    <label className="input input-bordered mt-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow opacity-70 cursor-not-allowed" disabled ref={empRef} placeholder="Employee name" />
                    </label>
                    <label className="input mt-4 input-bordered flex items-center gap-2">
                    <BiCalendar />
                    <DatePicker className="grow  opacity-70 cursor-not-allowed" disabled selected={attendance.attendance_date}  onChange={(date) => setAttendance({...attendance, attendance_date: date})} />
                    </label>
                    <label className="form-control w-full mt-3">
                        <span className="label-text ">Time-in:</span>
                     
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['TimePicker']} >
                                <TimePicker
                                className=" w-full"
                                defaultValue={dayjs(new Date())}
                               value={dayjs(attendance.attendance_time_in)}
                                onChange={(e) => setAttendance({...attendance, attendance_time_in: moment(e.$d).format()})}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </label>

                    <label className="form-control w-full mt-3">
                        <span className="label-text ">Time-out:</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['TimePicker']} >
                                <TimePicker
                                className=" w-full"
                                value={ dayjs(attendance.attendance_time_out)}
                                 defaultValue={dayjs(new Date())}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                onChange={(e) =>  setAttendance({...attendance, attendance_time_out: moment(e.$d).format()})}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </label>

                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text">Select field of work:</span>
                        </div>
                        <select value={attendance.attendance_field} className="select select-bordered" onChange={(e)=>  setAttendance({...attendance, attendance_field:e.target.value})}>
                            <option defaultValue>Select here</option>
                            <option>OFFICE</option>
                            <option>HOME</option>
                        </select>
                    </label>
                    <div className="modal-action">
                        <button type='submit' className="btn btn-success text-white w-[50%]">Save Attendance</button>
                     
                    </div>
                </form>

  
           
            </div>    
       
        </div>
        
      
    </div> 
  )
}

export default UpdateAttendance