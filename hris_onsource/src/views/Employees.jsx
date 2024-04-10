import { useEffect, useRef, useState } from "react";
import axiosClient from "../axiosClient"
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

 
function Employees() {


   const refRole = useRef(null);
   const refDep = useRef(null);
   const refPos = useRef(null);
   const refGen = useRef(null);
   const refStat = useRef(null);
   const refChoose = useRef(null);
  
   
   const [startDate, setStartDate] = useState(new Date());
   const [_endDate, setEndDate] = useState(new Date());
   const [department, setDepartment] = useState([]);
   const [position, setPosition] = useState([]);
   const [empList, setEmployeeList] = useState([]);
   const [_id, setEmpId] = useState("");
   const [reason, setReason] = useState("");
   const [payload, setPayload] = useState({
      employee_id: "",
      employee_image: "",
      employee_gender: "",
      employee_name: "",
      employee_address: "",
      employee_email: "",
      employee_phone: "",
      employee_role: "",
      department_id: "",
      position_id: "",
      employee_image_url:"",
      employee_start_date: "",
      employee_end_date: "",
      employee_status: "Active",
   });





   useEffect(()=>{
      Promise.all([getDataList('position'), getDataList('department')])
        .then((data) => {
            setPosition(data[0].data);
            setDepartment(data[1].data);
            getAllEmployees(data[1].data, data[0].data );
        
        })
        .catch((err) => {
            console.error(err);
        });
   },[])


   const Items = ({empList}) => {

      if(empList.length){
         return empList.map((emp , i)=>{
               return (
                 <tr key={i}>
                 <td className="p-3">
                    <div className="avatar">
                       <div className="w-8 rounded">
                          <img src={`${emp.employee_image || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} alt="Tailwind-CSS-Avatar-component" />
                       </div>
                    </div>
                 </td>
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {emp.employee_id}
                 </td>
   
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {emp.employee_name}
                 </td>
   
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {emp.employee_address}
                 </td>
   
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {emp.employee_deparment}
                 </td>
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {emp.employee_position}
                 </td>
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {emp.employee_start_date}
                 </td>
                 <td className={`p-3 whitespace-nowrap text-sm  text-gray-500 ${emp.employee_end_date === null ? "text-green-700 font-bold uppercase" : "font-normal"}`}>
                    {emp.employee_end_date || "Ongoing"}
                 </td>
                 <td className="p-3 whitespace-nowrap text-sm font-normal text-gray-500">
                    {moment(emp.created_at).calendar()}
                 </td>
                 <td className={`p-3 whitespace-nowrap text-sm font-bold uppercase`}>
                       <select value={emp.employee_status} className={`${emp.employee_status === "Active" ? "text-blue-700" : "text-red-700"} select select-bordered select-sm w-28 opacity-90`} onChange={(e)=> {
                          changeStatus(e.target.value, emp.id, emp.employee_start_date, emp.employee_end_date)
                       }}>
                          <option disabled defaultValue>Select here</option>
                          <option value="Active">ACTIVE</option>
                          <option value="Inactive">INACTIVE</option>
                       </select>
                   
                 </td>
                 <td className="pt-6 px-2 whitespace-nowrap text-sm font-semibold text-gray-900 flex gap-2">
                       <Link to={`/employees/${emp.id}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#00b894] cursor-pointer transition-all opacity-75 hover:opacity-100">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                          </svg>
                       </Link> 
                       <span>/</span>
                       <Link to={`/employees/${emp.id}/update`}>
                       <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#0984e3] cursor-pointer transition-all opacity-75 hover:opacity-100">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                       </svg>
                       </Link> 
                 </td>
              </tr>
               )
         })
         
      }else if (!empList.length) {
         return (
          
             <tr>
             <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
              <div className='ml-5'>
                <span>No data found!</span>
             </div>
             </td>
          </tr>
         )
      }else{
         <tr>
         <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
          <div className='ml-5'>
            <span className="loading loading-ring loading-lg text-primary"></span>
         </div>
         </td>
      </tr>
      }
   }


   const changeStatus = (value, id, startDate, currentEndDate) => {
      document.getElementById('my_modal_3').showModal()
      setPayload({...payload, employee_status: value, employee_start_date: startDate, employee_end_date:currentEndDate})
      setEmpId(id);
   }

   const handleSubmitStatus = () => {
      
      const startdate = moment(payload.employee_start_date).format('L');
      const enddate = moment(_endDate).format('L')
      const startDateSeconds = moment(startDate).unix();
      const endDateSeconds = moment(_endDate).unix();
     
      if (startDateSeconds === endDateSeconds && !payload.employee_end_date) {
          alert("The employee reason for leaving field must be a date after the employee start date.");
          return;
      }
     
            axiosClient.put(`/employee/${_id}`, {
               employee_status: payload.employee_status,
               employee_reason_for_leaving:reason,
               employee_start_date: moment(payload.employee_start_date).format('L') || "",
               employee_end_date: startdate === enddate ? "" : enddate,
               action: "Employee",
            }, {
               headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
               }
            })
            .then(()=>{
               alert("Status is updated successfully!");
               document.getElementById('my_modal_3').close()
               getAllEmployees(department, position);
               setPayload({
                  ...payload,
                  employee_status:"",
                  employee_reason_for_leaving:"",
                  employee_start_date:"",
                  employee_end_date:"",
               });
               setEmpId("");
               setStartDate(new Date());
         
            })
            .catch((err)=>{
               const {response} = err;
               if(response &&  response.status  === 422){
               alert(response.data.message)
               }
            })
   }

   const getAllEmployees = async (de, po) => {
      try {
         const res = await axiosClient.get('/employee')
         const empData = [];
        
         res.data.data.map(data => {
           
            empData.push({
               id:data.id,
               employee_id: data.employee_id,
               employee_name: data.employee_name,
               employee_address: data.employee_address,
               employee_phone: data.employee_phone,
               employee_image: data.employee_image,
               employee_email: data.employee_email,
               employee_role: data.employee_role,
               employee_gender: data.employee_gender,
               employee_deparment: de.find(d => d.id === data.department_id).department,
               employee_position: po.find(d => d.position_id === data.position_id).position,
               employee_status: data.employee_status,
               employee_start_date: data.employee_start_date,
               employee_end_date: data.employee_end_date,
               created_at: data.created_at,
          })
          
          setEmployeeList(empData.sort((a,b) => b.id - a.id));
        });

       } catch (err) {
          const {response} = err;
          if(response &&  response.status  === 422){
            console.log(response.data)
          }
       }
   }


   

   const handleSubmitEmployee = () => {
     
      if(payload.employee_image_url){
         payload.employee_image = payload.employee_image_url;
      }

      if(_id){

         if(!payload.employee_image_url){
            payload.employee_image = payload.employee_image ? `${payload.employee_image.split('/')[3]}/${payload.employee_image.split('/')[4]}` : "";
         }else{
            payload.employee_image = payload.employee_image_url;

         }
         delete payload.employee_image_url;
       
         const params = {...payload, employee_start_date:moment(startDate).format('L'), 
         employee_end_date:moment(startDate).format('L') === moment(_endDate).format('L') && payload.employee_status === "Active" ? "" : moment(_endDate).format('L'),
         }

         const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

         const queryString = new URLSearchParams(params).toString();

        
        
         axiosClient.put(`/employee/${_id}`, queryString, config)
         .then(()=>{
            refChoose.current.value = "";
            alert("Employee updated successfully");
            getAllEmployees(department, position);
            setPayload({
               employee_image: "",
               employee_gender: "",
               employee_name: "",
               employee_address: "",
               employee_email: "",
               employee_phone: "",
               employee_role: "",
               department_id: "",
               position_id: "",
               employee_image_url:"",
               employee_start_date: "",
               employee_end_date: "",
               employee_status: "Active",
            })

         })
         .catch((err)=>{
            const {response} = err;
            if(response &&  response.status  === 422){
            console.log(response.data)
            }
         })
         return;
      }

    
      delete payload.employee_image_url
     
      axiosClient.post('/employee', {...payload, employee_start_date:moment(startDate).format('L'), 
      employee_end_date:moment(startDate).format('L') === moment(_endDate).format('L') ? null : moment(_endDate).format('L'),
      action:"Employee"
      }).then((d)=>{
         alert("Employee is created successfully");
         getAllEmployees(department, position);
      })
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
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] z-0">

        <div  className=" shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5 z-0">
       
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
                           refRole.current.value = "Select here";
                           refDep.current.value = "Select here";
                           refPos.current.value = "Select here";
                           refGen.current.value = "Select here";
                           refChoose.current.value = "Select Image"
                         
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                          <span className='font-bold opacity-70'>NEW EMPLOYEE</span>
                        </div>

                  
                     </div>
             
                     <div className="flex flex-col mt-8 z-0" >
                        <div className="overflow-x-auto rounded-lg z-0">
                           <div className="align-middle inline-block min-w-full z-0">
                              <div className="shadow overflow-hidden sm:rounded-lg z-0 relative">
                                 <table className="min-w-full divide-y divide-gray-200 z-0">
                                    <thead className="">
                                       <tr>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             IMAGE
                                          </th>

                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMPLOYEE ID#
                                          </th>

   
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMPLOYEE NAME
                                          </th>

                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             ADDRESS
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             DEPARTMENT
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             POSITION
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             START DATE
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             END DATE
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             CREATED AT
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            STATUS
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ACTION
                                          </th>
                                        
                                       </tr>
                                    </thead>
                                    <tbody>
                                     
                                    <Items empList = {empList}/>         
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box w-[10px]">
            <div className="flex justify-between">
            <div>
            <h3 className="font-bold text-lg">New Employee</h3>
            <span className="label-text opacity-70 ">Input all the fields below</span>
            </div>
            <button type='button' className="btn shadow" onClick={()=>{
                     document.getElementById('my_modal_5').close();
                     setEmpId("");
                     setPayload({
                        employee_id: "",
                        employee_image: "",
                        employee_gender: "",
                        employee_name: "",
                        employee_address: "",
                        employee_email: "",
                        employee_phone: "",
                        employee_role: "",
                        department_id: "",
                        position_id: "",
                        employee_image_url:"",
                        employee_start_date: "",
                        employee_end_date: "",
                        employee_status: "Active",
                     })
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <form  method="dialog">
            <div className="avatar mt-5 w-full flex-col flex justify-center items-center gap-3">
               <div className="w-24 rounded-full ring ring-[#00b894] ring-offset-base-100 ring-offset-2">
                  <img  src={payload.employee_image ? typeof payload.employee_image === "object" ? URL.createObjectURL(payload.employee_image) : payload.employee_image  : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                 
               </div>
               <input ref={refChoose} type="file"  className="file-input file-input-bordered w-full mt-2" onChange={(e)=>{
                    const file = e.target.files[0]; 
                     const reader = new FileReader();
                     reader.onload = () => {
                        setPayload({...payload, employee_image:e.target.files[0], employee_image_url: reader.result})
                     };
                     reader.readAsDataURL(file);
               }} />
            </div>
            <label className="input input-bordered mt-2 flex items-center gap-2">
              Employee ID#
               <input value={payload.employee_id} type="text" className="grow" placeholder="i.g Onsoure000***" onChange={(e)=> setPayload({...payload, employee_id: e.target.value })} />
            </label>
            <label className="input input-bordered mt-2 flex items-center gap-2">
              Full name
               <input value={payload.employee_name} type="text" className="grow" placeholder="i.g marcus" onChange={(e)=> setPayload({...payload, employee_name: e.target.value })} />
            </label>
            <label className="input input-bordered mt-2 flex items-center gap-2">
               Address
               <input value={payload.employee_address} type="text" className="grow" placeholder="i.g address"  onChange={(e)=> setPayload({...payload, employee_address: e.target.value })}/>
            </label>
            <label className="input input-bordered mt-2 flex items-center gap-2">
               Email
               <input value={payload.employee_email} type="email" className="grow" placeholder="i.g email"  onChange={(e)=> setPayload({...payload, employee_email: e.target.value })}/>
            </label>
            <label className="input input-bordered mt-2 flex items-center gap-2">
               Contact#:
               <input value={payload.employee_phone} type="number" className="grow" placeholder="i.g 0969*****" onChange={(e)=> setPayload({...payload, employee_phone: e.target.value })} />
            </label>

            <label className="input input-bordered mt-2 flex items-center gap-2 mb-4">
               Start-date:
               <DatePicker className="grow"  selected={startDate}  onChange={(date) => setStartDate(date)} />
            </label>
            <label className="opacity-70 text-sm">
               End-date (Leave as empty if employee is still active):
            </label>
            <DatePicker  className="input input-bordered mt-2 flex items-center gap-2" selected={_endDate}  onChange={(date) => setEndDate(date)} />


            {_id && (
            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Status</span>
               </div>
               <select ref={refStat} className="select select-bordered" onChange={(e)=> setPayload({...payload, employee_status: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  <option value="Active">ACTIVE</option>
                  <option value="Inactive">INACTIVE</option>
               </select>
            </label>
            )}
           
            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Gender</span>
               </div>
               <select ref={refGen} className="select select-bordered" onChange={(e)=> setPayload({...payload, employee_gender: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  <option value="M">MALE</option>
                  <option value="F">FEMALE</option>
               </select>
            </label>

            <label className="form-control w-full mt-2">
               <div className="label">
                  <span className="label-text">Role</span>
               </div>
               <select ref={refRole} className="select select-bordered" onChange={(e)=> setPayload({...payload, employee_role: e.target.value})}>
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
               <select ref={refDep} className="select select-bordered" onChange={(e)=> setPayload({...payload, department_id: e.target.value})}>
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
               <select ref={refPos} className="select select-bordered" onChange={(e)=> setPayload({...payload, position_id: e.target.value})}>
                  <option disabled defaultValue>Select here</option>
                  {position.map((pos)=>{
                     return <option key={pos.position_id} value={pos.position_id}>{pos.position}</option> ;
                  })}
               </select>
            </label>

           
            <div className="modal-action">
                <button type='submit' onClick={handleSubmitEmployee} className="btn btn-success text-white w-[30%]">{_id ? 'Submit':'Create'}</button>
            </div>
            </form>
        </div>
    </dialog>

          
         <dialog id="my_modal_3" className="modal">
         <div className="modal-box">
            <form method="dialog">
               <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className="-mx-6 px-6 py-4 text-center mb-2">
                  <a href="#" title="home">
                  <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Workwise<span className=' text-[#00b894] font-bold'>HR.</span>
                  </h4>
                  </a>
              </div>
            <label className="form-control">
                  <h3 className="font-bold text-lg">Reason for leaving</h3>
                  <span className="label-text opacity-70 my-2">(Leave empty if the employee still active)</span>
        
                  <textarea onChange={(e)=>setReason(e.target.value)} className="textarea textarea-bordered h-24 w-full" placeholder="Input here the reason why the employee is leaving the company?"></textarea>
                  <label className="opacity-70 text-sm mt-2">
                     Select employee end-date:
                  </label>
                  <DatePicker  className="input input-bordered mt-2 flex items-center gap-2" selected={_endDate}  onChange={(date) => setEndDate(date)} />
                  <button type="button" onClick={handleSubmitStatus} className="btn btn-success mt-5 text-white">Submit Reason</button>
               </label> 
         </div>
         </dialog>
      </div> 
  )
}

export default Employees