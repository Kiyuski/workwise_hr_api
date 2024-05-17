import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";
import moment from "moment";
import { useLocation } from "react-router-dom";

function History() {

 const [leaveHistory, setLeaveHistory] = useState([])

 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);

 const id = searchParams.get('id') || null;

 const [pagination, setPagination] = useState([]);
 const [load, setLoad] = useState(false);
 const [search, setSearch] = useState("");


   const handleSearchPosition = (e) => {
      setSearch(e.target.value)

      if(e.target.value){
         getAllLeaveHistory(null, e.target.value)
      }else{
         getAllLeaveHistory()
      }
   }





  
   const handleUrlPaginate = (url) => {
      if(url){
         getAllLeaveHistory(`?${url.split("?")[1]}`);
         setCheckboxHead(false)
      }
      
   }
  
 useEffect(()=>{
  getAllLeaveHistory();
 },[])

 const getAllLeaveHistory = async (qry = null, srch = null) => {
   setLoad(true)
   try {
      const { data : {data}  }= await axiosClient.get(`/leave${qry ? qry : ""}`, {
        params: {
          type: 'leave_history',
          search: srch
        }
      })

      setLeaveHistory(data.data)
      setPagination(data.links)
      setLoad(false)


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
                     <div className="relative flex gap-2 items-center  focus-within:text-[#00b894] w-[50%]">
                                 <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                 <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                    <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                 </svg>
                                 </span>
                                 <input type="search" value={search} name="leadingIcon" id="leadingIcon" placeholder="Search position here"  onChange={handleSearchPosition} className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-[#00b894] transition"/>
                               
                           </div>
                     </div>
                     <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                           <div className="align-middle inline-block min-w-full">
                              <div className="shadow overflow-hidden sm:rounded-lg">
                              <div className="overflow-x-auto">
                              <table className="table">
                                 {/* head */}
                                 <thead>
                                    <tr>
                                  
                                    <th>APPROVAL PERSON</th>
                                    <th>REQUEST FROM</th>
                                    <th>LEAVE TYPE</th>
                                    <th>LEAVE DATE STATUS</th>
                                    <th>REMARK</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                 {!leaveHistory?.length && (
                                        <tr>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                         <div className='ml-5'>
                                           <span className='font-bold text-sm opacity-70'>No leave history found!</span>
                                        </div>
                                        </td>
                                     </tr>
                                    )}

                                    {load && leaveHistory?.length > 0 ? (
                                         <tr>
                                         <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                            <div className='ml-5'>
                                               <span className='font-bold text-sm opacity-70'>Search for leave history...</span>
                                            </div>
                                         </td>
                                      </tr>
                                    ) : leaveHistory.length > 0 && leaveHistory.map((l, i) => {
                                       return (
                                          <tr key={i} className={`${parseInt(l.leave_id) === parseInt(id) && "bg-slate-100 border-l-4 border-l-red-500 "}`}>
                                          <td>
                                             <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                   <img src={l.employee_image ? l.employee_image : "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                                </div>
                                                <div>
                                                <div className="font-bold">{l.approval_head.split("-")[1]}</div>
                                                <div className="text-sm opacity-50">{l.approval_head.split("-")[0]}</div>
                                                </div>
                                             </div>
                                          </td>
                                          <td>
                                             <span className="font-semibold opacity-85">{l.employee_name} </span>
                                                <br/>
                                             <span className="badge badge-ghost badge-sm"><span className="text-red-500 opacity-70">{l.department} / {l.position}</span></span>
                                          </td>
                                          <td>
                                             <span className="font-semibold uppercase opacity-70">{l.leave_type}</span>
                                          </td>
                                         
                                          <th>
                                            <span className={`${moment(l.leave_status_date_time).calendar() === "Invalid date" ? "text-red-500": "text-gray-500"}`}> {moment(l.leave_status_date_time).calendar() === "Invalid date" ? "NOT CHECK YET" : moment(l.leave_status_date_time).calendar()}</span>
                                          </th>
                                          <th>
                                           <span className={`badge badge-ghost badge-sm p-2  text-sm ${l.leave_status === "DISAPPROVED" || l.leave_status === "PENDING" ? "text-red-500" : "text-blue-500"} font-bold`}>{l.leave_status}</span>
                                          </th>
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
                <div className="join w-full justify-end mt-6">
                              {pagination.length > 0  && pagination.map((p, i) => {
                                    return (
                                       <button key={i} disabled={p.url ? false:true}   className={`join-item btn ${p.active ? "btn-active bg-[#00b894] text-white  hover:bg-[#00b894]" : ""} `}   dangerouslySetInnerHTML={{ __html: p.label }} onClick={()=> handleUrlPaginate(p.url)}></button>
                                    )
                              })}

                  </div>
        </div>
    </div> 

  )
}

export default History