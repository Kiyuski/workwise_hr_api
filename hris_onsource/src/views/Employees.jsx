import { useEffect, useState } from "react";
import axiosClient from "../axiosClient"
import { Link } from "react-router-dom";


function Employees() {

   const [department, setDepartment] = useState([]);
   const [position, setPosition] = useState([]);
   const [payload, setPayload] = useState({
      image: "",
      employee: "",
      address: "",
      contact: null,
      role: "",
      department: "",
      position: "",
      image_url:"",
      status: "Active",
   });



 

   useEffect(()=>{
      Promise.all([getDataList('position'), getDataList('department')])
        .then((data) => {
            setPosition(data[0].data);
            setDepartment(data[1].data);
        })
        .catch((err) => {
            console.error(err);
        });
   
        
   },[])


   const handleSubmitEmployee = () => {
      console.log(payload);
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
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
       
                     <div className="mb-4 flex items-center justify-between">
                      
                        <div className="flex-shrink-0 flex justify-center items-center gap-3" >
                           
                           <Link to="/employees/add-excel" className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                              </svg>

                            
                           </Link>
                             <span className='font-bold opacity-70'> VIA ( EXCEL )</span>
                           </div>
                        
                        <div className="flex-shrink-0 flex justify-center items-center gap-3" >
                           
                        <div className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100' onClick={()=>{
                           document.getElementById('my_modal_5').showModal();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                          <span className='font-bold opacity-70'>NEW EMPLOYEE</span>
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
                                             EMPLOYEE NAME
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             ADDRESS
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             CONTACT #
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             DEPARTMENT
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             POSITION
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Date & Time
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ACTION
                                          </th>
                                        
                                       </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                       <tr>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                             MARCUS T. 
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                             TALAMBAN, CHICAGO CEBU
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                             #09692865789
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                             IT OFFICE
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                             WEB DEVELOPER
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                             August 20, 2020 - 10:00 AM
                                          </td>
                                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <span>/</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">New Employee</h3>
            <span className="label-text opacity-70 ">Input all the fields below</span>
            <form  method="dialog">
            <div className="avatar mt-5 w-full flex-col flex justify-center items-center gap-3">
               <div className="w-24 rounded-full ring ring-[#00b894] ring-offset-base-100 ring-offset-2">
                  <img  src={payload.image ? typeof payload.image === "object" ? URL.createObjectURL(payload.image) : payload.image  : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                 
               </div>
               <input type="file" className="file-input file-input-bordered w-full mt-2" onChange={(e)=>{
                    const file = e.target.files[0]; 
                     const reader = new FileReader();
                     reader.onload = () => {
                        setPayload({...payload, image:e.target.files[0], image_url: reader.result})
                     };
                     reader.readAsDataURL(file);
               }} />
            </div>
            <label className="input input-bordered mt-5 flex items-center gap-2">
               Employee name
               <input value={payload.employee} type="text" className="grow" placeholder="i.g marcus" onChange={(e)=> setPayload({...payload, employee: e.target.value })} />
            </label>
            <label className="input input-bordered mt-2 flex items-center gap-2">
               Address
               <input value={payload.address} type="text" className="grow" placeholder="i.g address"  onChange={(e)=> setPayload({...payload, address: e.target.value })}/>
            </label>
            <label className="input input-bordered mt-2 flex items-center gap-2">
               Contact#:
               <input value={payload.contact} type="number" className="grow" placeholder="i.g 0969*****" onChange={(e)=> setPayload({...payload, contact: e.target.value })} />
            </label>

            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Gender</span>
               </div>
               <select className="select select-bordered" onChange={(e)=> setPayload({...payload, gender: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
               </select>
            </label>

            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Role</span>
               </div>
               <select className="select select-bordered" onChange={(e)=> setPayload({...payload, role: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  <option value="HR">HR</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
               </select>
            </label>

            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Department</span>
               </div>
               <select className="select select-bordered" onChange={(e)=> setPayload({...payload, department: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  {department.map((de)=>{
                     return <option key={de.id} value={de.id}>{de.department}</option> ;
                  })}
                 
               </select>
            </label>

            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Position</span>
               </div>
               <select className="select select-bordered" onChange={(e)=> setPayload({...payload, position: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  {position.map((pos)=>{
                     return <option key={pos.position_id} value={pos.position_id}>{pos.position}</option> ;
                  })}
               </select>
            </label>

           
            <div className="modal-action">
                <button type='submit' onClick={handleSubmitEmployee} className="btn btn-success text-white w-[30%]">Create</button>
                <button type='button' className="btn shadow" onClick={()=>{
                     document.getElementById('my_modal_5').close();
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            </form>
        </div>
    </dialog>
      </div> 
  )
}

export default Employees