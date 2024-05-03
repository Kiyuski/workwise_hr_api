export const ComponentDataList = ({ind, chilIn, data, moment, showReusableData, department_id, handleRemoveData}) => {
 

  const duration = (start_date, end_date) => {
    const currentDate = new Date(start_date);
    const endDate = new Date(end_date);
    const differenceInMs = endDate - currentDate;
    const millisecondsInHour  =1000 * 60 * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const remainingHours = Math.floor(differenceInMs / millisecondsInHour);
    const remainingDays = Math.floor(differenceInMs / millisecondsInDay);
    return `${remainingHours} hours in ${remainingDays} days`;
  }



   
  
    if(!data.length){
     return (
      <tr>
          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
          No data found!
          </td>
      </tr>
     )
    }
    



    switch (ind) {
     
      case 1:
        return data.length && data.map((l, i)=>{
            return (
            <tr key={i}>
               <td className="p-4 whitespace-nowrap text-sm font-bold uppercase text-gray-900">
                {l.leave_type}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
                {l.leave_number_of_days}
               </td>
               <td className={`p-4 whitespace-nowrap text-sm font-bold ${l.leave_status === "ACTIVE" ? "text-blue-500": "text-red-500"} `}>
                {l.leave_status}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2" >
                     <div onClick={()=> handleRemoveData(l.id, 'leave_type')}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                     </svg>
                     </div>
                     <span>/</span>
                     <div onClick={() => showReusableData(l.id, null, 'leave_type')}>
                     <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                     </svg>
                     </div>
                   
               </td>
            </tr>
     
            )
         })

       case 2:

        if(chilIn === 0) {
          return data?.length && data.map((l, i)=>{
            return (
            <tr key={i}>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                {l.employee_id}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                {l.employee_name}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                {l.leave_type}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_apply_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_start_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_end_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                 {duration(l.leave_start_date, l.leave_end_date)}
               </td>
               <td className={`p-4 whitespace-nowrap text-sm font-bold ${l.leave_status === "Pending..." ? "text-red-500" : "text-blue-500"} `}>
               {l.leave_status}
             </td>
               <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                     <div >
                     <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                     </svg>
                     </div>
                   
               </td>
            </tr>
     
            )
         })
      
        }else if(chilIn === 1){

          return data?.length && data.map((l, i)=>{
            return (
            <tr key={i}>
               <td className={`p-4 whitespace-nowrap text-sm font-bold uppercase ${!l.leave_type ? " text-red-500": "text-gray-900"}  opacity-70`}>
                {l.leave_type || "DELETED TYPE PLEASE CHOOSE OTHER TYPE"}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_apply_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_start_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_end_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                 {duration(l.leave_start_date, l.leave_end_date)}
               </td>
               <td className={`p-4 whitespace-nowrap text-sm font-bold ${l.leave_status === "PENDING" || l.leave_status === "DISAPPROVED" ? "text-red-500" : "text-blue-500"} `}>
               {l.leave_status}
             </td>
               <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                     <div onClick={()=> handleRemoveData(l.leave_id, 'leave')}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                     </svg>
                     </div>
                     {l.leave_status !== "APPROVED" && (
                      <>
                     <span>/</span>
                     <div onClick={() => showReusableData(l.leave_id, department_id, 'leave')}>
                      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                     </div>
                      </>
                     )}
                   
               </td>
            </tr>
     
            )
         })
            
        }else{
          return data?.length && data.map((l, i)=>{
         
            return (
            <tr key={i}>
                <td className="p-4 whitespace-nowrap text-sm font-bold text-blue-500">
                {l.department}
               </td>
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                {l.employee_id}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                {l.employee_name}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                {l.leave_type}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_apply_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_start_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {moment(l.leave_end_date).format("LL")}
               </td>
               <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                 {duration(l.leave_start_date, l.leave_end_date)}
               </td>
               <td className={`p-4 whitespace-nowrap text-sm font-bold ${l.leave_status === "PENDING" || l.leave_status === "DISAPPROVED" ? "text-red-500" : "text-blue-500"} `}>
               {l.leave_status}
             </td>
               <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                     <div  onClick={() => showReusableData(l.leave_id, department_id, 'leave')}>
                     <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                     </svg>
                     </div>
                   
               </td>
            </tr>
     
            )
         })
        }
         
      default:
        return data.length && data.map((h, i)=>{
          return (
          <tr key={i}>
             <td className="p-4 whitespace-nowrap text-sm font-bold uppercase text-gray-900">
              {h.holiday}
             </td>
             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
               {moment(h.holiday_start_date).format("LL")}
             </td>
             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
               {moment(h.holiday_end_date).format("LL")}
             </td>
             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
               {h.number_of_days}
             </td>
             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
               {moment(h.holiday_year).format("MMMM, YYYY")}
             </td>
             <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                   <div onClick={()=> handleRemoveData(h.id, 'holiday')}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                   </svg>
                   </div>
                   <span>/</span>
                   <div onClick={() => showReusableData(h.id, null, 'holiday')}>
                   <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                   </svg>
                   </div>
                 
             </td>
          </tr>
   
          )
       })
      
    }
  }
