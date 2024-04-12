import React, { useEffect, useRef, useState } from 'react'
import { BiCalendar } from "react-icons/bi";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import moment from 'moment';
import DatePicker from "react-datepicker";
import { useAuth } from '../context';
import axiosClient from '../axiosClient';


function Addnewattendance() {
    const {user} = useAuth();

    const empRef = useRef(null);
  
    const [attendance, setAttendance] = useState({
        attendance_time_in: "",
        attendance_time_out: "",
        attendance_field: "",
        attendance_date: new Date(),
    })

    useEffect(()=>{
       empRef.current.value = user.name || "";
       axiosClient.get('/employee')
      .then(({data})=>{
        //  setAttendance(data.find(att => att.employee_email === user.email).employee_email);
       setAttendance({...attendance, employee_id: data.data.find(att => att.employee_email === user.email).employee_id});
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
    })

    const handleSubmitAttendance = (e) => {
        e.preventDefault();  
        console.log(attendance);
        // axiosClient.post('/attendance', {...attendance, attendance_date: moment(attendance.attendance_date).format('L')})
        //  .then((r)=>{
        // //   alert("Attendance is created successfully!");
        // //   window.location.href = "/attendance"
        // console.log(r);
        //  })
        //  .catch((err)=>{
        //     const {response} = err;
        //     if(response &&  response.status  === 422){

        //       console.log(response.data)
        //     }
        //  })
         
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
                                onChange={(e) => setAttendance({...attendance, attendance_time_in: moment(e.$d).format("LT")})}
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
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                onChange={(e) =>  setAttendance({...attendance, attendance_time_out: moment(e.$d).format("LT")})}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </label>

                    <label className="form-control w-full mt-3">
                        <div className="label">
                            <span className="label-text">Select field of work:</span>
                        </div>
                        <select className="select select-bordered" onChange={(e)=>  setAttendance({...attendance, attendance_field:e.target.value})}>
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

export default Addnewattendance