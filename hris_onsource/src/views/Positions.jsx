import { useEffect,useState } from 'react';
import axiosClient from '../axiosClient';
import moment from 'moment';


function Positions() {


   const [_position, _setPosition] = useState("");
   const [positions, setDataPosition] = useState([]);
   const [id, setPositionId] = useState("");
   const [_defaultPosition, _setDefaultPosition] = useState("")
   const [pagination, setPagination] = useState([]);
   const [load, setLoad] = useState(false);
   const [search, setSearch] = useState("");
   const [checkboxState, setCheckboxState] = useState([]);
   const [checkHead, setCheckboxHead] = useState(false);


    const handleCheckboxChange = (e) => {
        setCheckboxHead(false)
        const checkboxId = e.target.id;
        const isChecked = e.target.checked;
      
        if (isChecked) {
         setCheckboxState(prevIds => [...prevIds, {id: checkboxId}]);
         } else {
         setCheckboxState(prevIds => prevIds?.filter(d => parseInt(d.id) !== parseInt(checkboxId)));
         }
   
    };

 

   const handleCheckAll  = (e) => {
      setCheckboxHead(prev => !prev)
      if(e.target.checked){
         setCheckboxState(positions.data.map(d => {
            return {id: d.position_id}
         }))
      }else{
         setCheckboxState([]);
      }

   }


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

   const handleSearchPosition = (e) => {
      setSearch(e.target.value)

      if(e.target.value){
         getListPosition(null, e.target.value)
      }else{
         getListPosition()
      }
   }





   const removePosition = () => {

      if (confirm('Are you sure you want to delete this position into the database?')) {
         axiosClient.delete(`/position/delete`,{
            data: checkboxState
          })
          .then(()=>{
             getListPosition();
             setCheckboxState([])
          })
          .catch((err)=>{
             const {response} = err;
             if(response &&  response.status  === 422){
               console.log(response.data)
             }
          })
       } else {
         setCheckboxState([])
         setCheckboxHead(false)
         console.log('Position is not deleted in database.');
       }
    
     
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

   const handleUrlPaginate = (url) => {
      if(url){
         getListPosition(`?${url.split("?")[1]}`);
      }
      
   }



   const getListPosition = ($qry = null, srch = null) => {
      setLoad(true)
      axiosClient.get(`/position${$qry ? $qry : ""}`, {
         params:{
            search: srch,
         }
      })
      .then(({data})=>{
         setDataPosition(data);   
         setPagination(data.meta.links);  
         setLoad(false)

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
                           <div hidden className="md:block">
                           <div className="relative flex gap-2 items-center  focus-within:text-[#00b894]">
                                 <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                 <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                    <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                 </svg>
                                 </span>
                                 <input type="search" value={search} name="leadingIcon" id="leadingIcon" placeholder="Search position here"  onChange={handleSearchPosition} className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-[#00b894] transition"/>
                                 {checkboxState.length > 0 && (
                                    <button className="btn  text-white btn-sm  btn-error" onClick={removePosition} >
                                       {checkboxState.length > 1? "Delete all": "Delete"}
                                       </button>
                                 )}
                           </div>
                          
                      
                      </div>
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
                               
                                 <div className="overflow-x-auto">
                                    <table className="table">
                                       {/* head */}
                                       <thead>
                                          <tr>
                                          <th>
                                             <label>
                                                <input type="checkbox" className="checkbox" checked={checkHead}   onChange={handleCheckAll}/>
                                             </label>
                                          </th>
                                          <th>POSITION</th>
                                          <th>DATE & TIME</th>
                                          <th>ACTION</th>
                                          <th></th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                       {load ? (
                                            <tr>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                               <div className='ml-5'>
                                                  <span>Search for position...</span>
                                               </div>
                                            </td>
                                         </tr>
                                       ):  positions.data?.length  ?  
                                       positions.data.map((pos, i)=>{
                                       return (
                                          <tr key={i}>
                                          <th>
                                             <label>
                                                 <input type="checkbox" id={pos.position_id} checked={checkboxState.some(d => parseInt(d.id) === parseInt(pos.position_id))}  className="checkbox" onChange={handleCheckboxChange} />
                                             </label>
                                          </th>
                                          <td>
                                             <div className="flex items-center gap-3">
                                               
                                                <div>
                                                <div className="font-bold">{pos.position}</div>
                                                <div className="text-sm opacity-50">{pos.total_employee > 0 ? `${pos.total_employee} employee${pos.total_employee > 1 ? "'s" : ""} who have this position`: "No employees for now"}</div>
                                                </div>
                                             </div>
                                          </td>
                                          <td>
                                             <span className="badge badge-ghost badge-sm font-semibold">{moment(pos.created_at).calendar()}</span>
                                          </td>
                                          <th className='whitespace-nowrap text-sm font-semibold text-gray-900 flex  items-center gap-2'>
                                            
                                             <div onClick={()=> getSinglePosition(pos.position_id)}>
                                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                                                   <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                             </div>
                                          </th>
                                          </tr>
                                       )
                                    }): (
                                       <tr>
                                       <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                          <div className='ml-5'>
                                             <span>No position found!</span>
                                          </div>
                                       </td>
                                    </tr>
                                    )   
                                    }
                                     
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