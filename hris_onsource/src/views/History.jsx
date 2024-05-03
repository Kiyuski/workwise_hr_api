import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";
import moment from "moment";

function History() {

 const [leaveHistory, setLeaveHistory] = useState([])

 useEffect(()=>{
  getAllLeaveHistory();
 },[])

 const getAllLeaveHistory = async () => {
   try {
      const { data : {data}  }= await axiosClient.get(`/leave`, {
        params: {
          type: 'leave_history',
        }
      })
      

      setLeaveHistory(data)

    } catch (err) {
       const {response} = err;
       if(response &&  response.status  === 422){
         console.log(response.data)
       }
    }
 }


  return (
   
  <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
     
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                     <div className="mb-4 flex items-center justify-between">
                        <div>
                         
                        </div>
                     </div>
                     <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                           <div className="align-middle inline-block min-w-full">
                              <div className="shadow overflow-hidden sm:rounded-lg">
                                 <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                       <tr>
                                       <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMPLOYEE ID#
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             LEAVE TYPE 
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMPLOYEE NAME
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             POSITION
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             DEPARTMENT
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             DEPARTMENT HEAD
                                          </th>
                                       
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Date & Time
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            REMARKS
                                          </th>
                                       </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                       {leaveHistory.length > 0 && leaveHistory.map((l, i) => {
                                          return (
                                             <tr key={i}>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold opacity-70 text-gray-900">
                                                {l.employee_id}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                                {l.leave_type}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                {l.employee_name}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold opacity-70 text-gray-500">
                                                {l.position}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold opacity-70 text-gray-500">
                                                {l.department}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold opacity-70 text-gray-500">
                                               {l.department_head}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                                               {moment(l.leave_status_date_time).calendar() === "Invalid date" ? "NOT CHECK YET" : moment(l.leave_status_date_time).calendar()}
                                             </td>
                                             <td className={`p-4 whitespace-nowrap text-sm ${l.leave_status === "DISAPPROVED" || l.leave_status === "PENDING" ? "text-red-500" : "text-blue-500"} font-bold`}>
                                                {l.leave_status}
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

export default History