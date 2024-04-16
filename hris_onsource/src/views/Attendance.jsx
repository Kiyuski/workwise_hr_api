import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';
import moment from 'moment';

function Attendance() {
  

   const [attendance, setAttendanceData] = useState([]);




   useEffect(()=>{
      getListAttendance();
     
   },[])

   const calculateTotalHours = (time_in, time_out) => {
  
      const diffWithoutBreak = moment.duration(moment(time_out).diff(moment(time_in)));
      const diff = moment.duration(diffWithoutBreak.asMilliseconds() - 60 * 60 * 1000);
      const hours = Math.floor(diff.asHours());
      const minutes = Math.floor(diff.asMinutes()) % 60;
      return `${hours} hours ${minutes} minutes`;
  
    };

   const getListAttendance = () => {
      axiosClient.get('/attendance')
      .then(({data})=>{
        console.log(moment(data.data[0].attendance_time_out).format('h:mm:ss a'));
   

         setAttendanceData(data.data.map(d => {
            return {...d, render: calculateTotalHours(d.attendance_time_in, d.attendance_time_out)}
         }))

         
   
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }


   const handleShowAllEmployeeAttedance = () => {
      axiosClient.get('/attendance')
      .then((data)=>{
        console.log(data);
   
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }

   
  return (
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className=" shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">

               <div className="mb-4 flex items-center justify-between">
                  <div>
                   <button type='button' onClick={handleShowAllEmployeeAttedance} className="btn bg-[#00b894] hover:bg-[#00b894] text-white">EMPLOYEE'S ATTENDANCE HISTORY</button>
                  </div>
                  <div className="flex-shrink-0 flex justify-center items-center gap-3">
                  <Link to='/attendance/addNewAttendance' className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100'  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </Link>
                    <span className='font-bold opacity-70'>Add Attendance</span>
                  </div>
               </div>
           
               <div className="flex flex-col mt-8">
                  <div className="overflow-x-auto rounded-lg">
                     <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                           <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                 <tr>
                                  
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Time-in
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Time-out
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Render Time
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Field
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                     Time Created
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                     Action
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                       {!attendance.length && (
                                          <tr>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                                <div className='ml-5'>
                                                    <span>No data found!</span>
                                                </div>
                                             </td>
                                          </tr>
                                       )}
                                       {attendance && attendance.map((at, i)=>{
                                          return (
                                          <tr key={i}>
                                             <td className="p-4 whitespace-nowrap text-sm  text-gray-500 font-bold">
                                                {moment(at.attendance_time_in).format("h:mm:ss a")}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                            
                                               {moment(at.attendance_time_out).format("h:mm:ss a")}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                               {at.render}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                               {at.attendance_field}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                               {at.attendance_date}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm flex gap-2">
                                                   <div>
                                                   <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                   </svg>
                                             </div>
                                                 
                                             </td>
                                          </tr>
                                   
                                          )
                                       })}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
      </div>

  
</div> 
  )
}

export default Attendance