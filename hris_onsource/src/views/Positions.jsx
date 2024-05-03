import { useEffect,useState } from 'react';
import axiosClient from '../axiosClient';
import moment from 'moment';


function Positions() {


   const [_position, _setPosition] = useState("");
   const [positions, setDataPosition] = useState([]);
   const [id, setPositionId] = useState("");
   const [_defaultPosition, _setDefaultPosition] = useState("")

   const submitPosition = (ev) => {
      ev.preventDefault();

      if(id){
         axiosClient.put(`/position/${id}?position=${_position}`)
         .then(()=>{
            alert("Position updated successfully");
            document.getElementById('my_modal_5').close()
            getListPosition();
            setPositionId("");
         })
         .catch((err)=>{
            const {response} = err;
            if(response &&  response.status  === 422){
            console.log(response.data)
            }
         })
         return;
      }

    
      axiosClient.post('/position',{
         position: _position,
      })
      .then((res)=>{
         alert(res.data.message);
         _setPosition("");
         document.getElementById('my_modal_5').close()
         getListPosition();
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })

      
   }


   useEffect(()=>{
      getListPosition();
   },[])


   const removePosition = (id) => {
      axiosClient.delete(`/position/${id}`)
      .then(()=>{
         getListPosition();
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }


   const getSinglePosition = (id) => {
      axiosClient.get(`/position/${id}`)
      .then(({data})=>{
         document.getElementById('my_modal_5').showModal();
         _setPosition(data.data.position);
         setPositionId(data.data.position_id)

      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }



   const getListPosition = () => {
      axiosClient.get('/position')
      .then(({data})=>{
         setDataPosition(data);
      
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
         }
      })
   }

  return (
    <div>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                     <div className="mb-4 flex items-center justify-between">
                        <div>
                           <span className="text-base font-normal text-gray-500">List of Positions</span>
                        </div>
                        <div className="flex-shrink-0 flex justify-center items-center gap-3" onClick={()=>{
                           document.getElementById('my_modal_5').showModal();
                        }}>
                        <div className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                          <span className='font-bold opacity-70'>NEW POSITIONS</span>
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
                                       {!positions.data?.length && (
                                          <tr>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                                <div className='ml-5'>
                                                   <span>No position found!</span>
                                                </div>
                                             </td>
                                          </tr>
                                       )}
                                       {positions.data && positions.data.map((pos, i)=>{
                                          return (
                                          <tr key={i}>
                                             <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                {pos.position}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                {moment(pos.created_at).calendar()}
                                             </td>
                                             <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                                                   <div onClick={()=> removePosition(pos.position_id)}>
                                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                   </svg>
                                                   </div>
                                                   <span>/</span>
                                                   <div onClick={()=> getSinglePosition(pos.position_id)}>
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

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">New Position</h3>
            <form onSubmit={submitPosition} method="dialog">
            <label className="form-control w-full ">
            <div className="label">
                <span className="label-text">Company position:</span>
            </div>
            <input value={_position} type="text" placeholder="Input position here" className="input input-bordered w-full"  onChange={(e)=> {
                const positionVal = e.target.value.toUpperCase();
               _setPosition(positionVal)
            }} />
            </label>
            <div className="modal-action">
                <button type='submit' className="btn btn-success text-white w-[30%]"> {id ? 'Submit': 'Create'}</button>
                <button type='button' className="btn shadow" onClick={() => {
                  setPositionId("")
                  _setPosition("")
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

export default Positions