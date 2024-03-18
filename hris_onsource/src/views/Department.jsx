import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";

function Department() {

   const [department, setDepartment] = useState('');
   const [departments, setDataDepartment] = useState([]);

   const addDepartment = () => {
      const data = {
         department,  
      }
      axiosClient.post('/department', data)
      .then(() => {
         getListDepartment();
         })
      .catch((err) => {
            console.log(err)
         })
   }

   
   const getListDepartment = () => {
      axiosClient.get('/department')
      .then(({data})=>{
         setDataDepartment(data);
      
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }

   useEffect(()=>{
      getListDepartment();
   },[])


  return (
    
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                     <div class="mb-4 flex items-center justify-between">
                        <div>
                           <span class="text-base font-normal text-gray-500">This is a list of Department</span>
                        </div>
                        <div class="flex-shrink-0 flex justify-center items-center gap-3">
                        <div className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100'  onClick={()=>document.getElementById('my_modal_5').showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                          <span className='font-bold opacity-70'>NEW DEPARTMENT</span>
                        </div>
                     </div>
                     <div class="flex flex-col mt-8">
                        <div class="overflow-x-auto rounded-lg">
                           <div class="align-middle inline-block min-w-full">
                              <div class="shadow overflow-hidden sm:rounded-lg">
                                 <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                       <tr>
                                          <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             DEPARTMENT
                                          </th>
                                          <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             Date & Time
                                          </th>
                                          <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ACTION
                                          </th>
                                        
                                       </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                    {!departments.data?.length && (
                                          <tr>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                                No data available.
                                             </td>
                                          </tr>
                                       )}
                                       {departments.data && departments.data.map((de, i)=>{
                                          return (
                                          <tr key={i}>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                {de.department}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 23 ,2021
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                                                   <div onClick={{}}>
                                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                   </svg>
                                                   </div>
                                                   <span>/</span>
                                                   <div onClick={{}}>
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
            <form onSubmit={{}} method="dialog">
            <label className="form-control w-full ">
            <div className="label">
                <span className="label-text">Department name:</span>
            </div>
            <input value={department} onChange={(e)=> setDepartment(e.target.value)} type="text" placeholder="Input Department here" className="input input-bordered w-full"   />
            </label>
            <div className="modal-action">
                <button type='submit' onClick={addDepartment} className="btn btn-success text-white w-[30%]"> { 'Create'}</button>
                <button type='button' className="btn shadow" onClick={() => {
                
                  document.getElementById('my_modal_5').close();
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            </form>
        </div>
    </dialog>
      </div> 

  )
}

export default Department