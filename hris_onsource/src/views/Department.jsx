import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";

function Department() {

   const [department, setDepartment] = useState('');
   const [employee_id, setEmployeeId] = useState('');
   const [departments, setDataDepartment] = useState([]);
   const [_id, setDepartmentId] = useState('');
   const [empData, setEmpData] = useState([]);
   const [show, setShow] = useState(false);
   const [selectData, setSelectData] = useState([]);
   const [emp_user_id, setEmp_user_id] = useState("");


   const showDepartment = (id) => {
    
      axiosClient.get(`/department/${id}`)
      .then(({data})=>{
         document.getElementById('my_modal_5').showModal();
         setShow(true)
         setDepartmentId(data.data.id);
         setDepartment(data.data.department);
         if(!data.list_of_user_in_department[0].employee_name) return empData([])

         console.log(data.list_of_user_in_department);
         setEmpData(data.list_of_user_in_department.filter(d => d.user_id !== emp_user_id)
         .map(d => {
            return {
               ...d,
               employee_name: `${d.employee_name} (${d.employee_role})`
            }
         }))
      
         setEmployeeId(data.data.employee_id);  
         console.log(data.data);
       
       
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }

   const deleteDepartment = (id) => {
      axiosClient.delete(`/department/${id}`)
      .then(()=>{   
         getListDepartment("ALL");
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }

   const addDepartment = (e) => {
      e.preventDefault();

      const data = {
         department,
         employee_id,
      }
 
      if(_id){
         axiosClient.put(`/department/${_id}?department=${department}&employee_id=${employee_id}`)
         .then((d)=>{
      
            alert("Department is updated successfully");
            document.getElementById('my_modal_5').close()
            getListDepartment("ALL");
            setDepartmentId("");
         })
         .catch((err)=>{
            const {response} = err;
            if(response &&  response.status  === 422){
              console.log(response.data)
            }
         })
         return;
      }

      axiosClient.post('/department', data)
      .then(() => {
         getListDepartment("ALL");
         document.getElementById('my_modal_5').close()
         })
      .catch((err) => {
            console.log(err)
         })
   }

   useEffect(()=>{
      Promise.all([getDataList('employee'), getDataList('user')])
        .then((data) => {
    
            setEmp_user_id(data[0].data.find(d => d.employee_email === data[1].email)?.id);
           
        })
        .catch((err) => {
            console.error(err);
        });
   },[])

    
   const getDataList = async (path, id = null) => {
      try {
        const res = await axiosClient.get(`/${path}`,{
         params:{
            data:id
         }
        })
      
        return res.data;
      } catch (err) {
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      }
   } 

   

   const getListDepartment = (id) => {
      axiosClient.get('/department',{
         params: {
            data: id 
          }
      })
      .then(({data})=>{
         console.log(data);
         setSelectData(data.for_filter_button)
         setDataDepartment(data.data);
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }



   const filterByDepartment = (e) => {
     getListDepartment(e.target.value, )
   }



   useEffect(()=>{
      getListDepartment('ALL');
   },[])

  

  return (
    
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                     <div className="mb-4 flex items-center justify-between">
                        <div>
                           <label className="form-control w-full max-w-xs">
                              <div className="label">
                                 <span className="label-text">Filter by Department:</span>
                              </div>
                              <select className="select select-bordered" onChange={filterByDepartment}>
                                 <option value='ALL'>ALL</option>
                                 {selectData.map((de, i)=> {
                                    return (
                                       <option key={i} value={de.id}>{de.department}</option>
                                    )
                                 })}
                              </select>
                           </label>
                        </div>
                        <div className="flex-shrink-0 flex justify-center items-center gap-3">
                        <div className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100'  onClick={()=>document.getElementById('my_modal_5').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                          <span className='font-bold opacity-70'>NEW DEPARTMENT</span>
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
                                             DEPARTMENT
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMPLOYEES
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             REMARKS
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ACTION
                                          </th>
                                        
                                       </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {!departments.length && (
                                          <tr>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                                <div className='ml-5'>
                                                   <span>No department found!</span>
                                                </div>
                                             </td>
                                          </tr>
                                       )}
                                       {departments && departments.map((de, i)=>{
                                          return (
                                          <tr key={i}>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold uppercase text-gray-900">
                                                {de.department}
                                             </td>
                                             <td className={`p-4 whitespace-nowrap text-sm ${de.employees === "CHOOSE DEPARTMENT HEAD" || de.employees === "NO EMPLOYEE'S" ? "text-red-500  font-bold" : "text-gray-900"} `}>
                                                {de.employees}
                                             </td>
                                             <td className={`p-4 whitespace-nowrap text-sm ${de.remarks === "HAS EMPLOYEE" || de.remarks === "NO EMPLOYEE'S"  ? "text-red-500  font-bold" : "text-gray-900"} `}>
                                                {de.remarks}
                                             </td>
                                             
                                             <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                                                   <div onClick={()=> deleteDepartment(de.id)}>
                                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                   </svg>
                                                   </div>
                                                   <span>/</span>
                                                   <div onClick={()=> showDepartment(de.id)}>
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

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">New Department</h3>
            <form onSubmit={addDepartment} method="dialog">
               <label className="form-control w-full ">
               <div className="label">
                  <span className="label-text">Department name:</span>
               </div>
               <input value={department} onChange={(e)=> setDepartment(e.target.value)} type="text" placeholder="Input Department here" className="input input-bordered w-full"   />
               </label>
                  {show && (
                  <label className="form-control w-full mt-2">
                  <div className="label">
                     <span className="label-text">Department Head:</span>
                  
                  </div>
                  <select value={employee_id || "NO EMPLOYEE TO THIS DEPARTMENT"} className="select select-bordered w-full" onChange={(e)=> setEmployeeId(e.target.value)}>
                    
                     {!empData.length && (
                        <option>NO EMPLOYEE TO THIS DEPARTMENT</option>
                         )
                     }
                     {empData.length > 0 &&  <option defaultChecked >Select Employee head here</option>}
                     {empData.map((emp, i) => {
                        
                        return (
                           <option key={i} value={emp.user_id}>{emp.employee_name}</option>
                        )
                     })}
                  
                  </select>
                  </label>
                  )}
            
            <div className="modal-action">
                <button type='submit' className="btn btn-success text-white w-[30%]"> { _id ? 'Submit' : 'Create'}</button>
                <button type='button' className="btn shadow" onClick={() => {
                  setDepartment("");
                  setDepartmentId("");
                  document.getElementById('my_modal_5').close();
                  setEmployeeId("")
                  setShow(false)
                  setEmpData([])
             
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

export default Department