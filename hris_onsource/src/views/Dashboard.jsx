import { useEffect, useState } from "react"
import axiosClient from "../axiosClient";
import DatePicker from "react-datepicker";
import { useAuth } from "../context";
import moment from "moment";


function Dashboard() {
    

    const {user} = useAuth();
    const [empRole, setRole] = useState("");

    const [userData, setUserData] = useState({
        employee_id: "",
        employee_image: "",
        employee_name: "",
        employee_email: "",
        employee_role: "",
        employee_start_date: new Date(),
     })

     const [load, setLoading] = useState(false);

    useEffect(()=>{
      
        setLoading(true);
        axiosClient.get("/employee")
        .then(({data: {data}}) => {
            if(!data.length){
                setLoading(false);
                setRole("FIRTS_USER");
                return;
            }
            setLoading(true);
            axiosClient.get("/user")
            .then((res) => {
                setLoading(false);
                setRole(data.find(d => d.employee_email === res.data.email)?.employee_role || 'NOT_EMPLOYEED')
            })
        })
    
      },[])

      const handleSetAccount = (e) => {
        e.preventDefault();
        const payload = {
            employee_id: userData.employee_id,
            employee_name: userData.employee_name,
            employee_email: userData.employee_email,
            employee_role: userData.employee_role,
            employee_start_date: moment(userData.employee_start_date).format('L'),
            employee_status: 'Active',
            type:'setAccount',
        }
   
        
        axiosClient.post("/employee", payload)
       .then(({data}) => {
        alert(data.message);
        window.location.href = '/dashboard'
       
       }).catch((er)=>{
        console.log(er);
       })
      }

      
      if(load){
        return (
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div className='ml-5'>
                    <span className="loading loading-ring loading-lg text-primary"></span>
                </div>
           </div>  
        )
      }

      switch (empRole) {
        case 'HR': 
        case 'ADMIN': 
        case 'EMPLOYEE':  
            return (
                <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] bg-white">
                    <div className="px-6 pt-6 2xl:container ">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#0984e3] to-[#0984e3] text-white shadow-[#0984e3]/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Employees</p>
                                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">20</h4>
                                </div>
                                <div className="border-t border-blue-gray-50 p-4">
                                    <div className='border w-[30%] p-2 text-sm rounded-md flex gap-2 justify-center items-center bg-[#0984e3] text-white font-bold cursor-pointer transition-all ease-in opacity-80 hover:opacity-100'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className ="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                    </svg>
        
                                        <span>View User</span>
                                    </div>
                                </div>
                            </div>
        
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div className="bg-clip-border  mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#00b894] to-[#00b894] text-white shadow-[#00b894]/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                    </svg>
        
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Notifications</p>
                                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">50</h4>
                                </div>
                                <div className="border-t border-blue-gray-50 p-4">
                                <div className='border w-[40%] p-2 rounded-md flex gap-2 justify-center items-center bg-[#00b894] text-white font-bold cursor-pointer transition-all ease-in opacity-80 hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
        
                                        <span>Notifications</span>
                                    </div>
                                </div>
                            </div>
        
                            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                </div>
                                <div className="p-4 text-right">
                                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Applied users</p>
                                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">5</h4>
                                </div>
                                <div className="border-t border-blue-gray-50 p-4">
                                <div className='border w-[40%] text-sm p-2 rounded-md flex gap-2 justify-center items-center bg-orange-600 text-white font-bold cursor-pointer transition-all ease-in opacity-80 hover:opacity-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
        
                                        <span>View Application</span>
                                    </div>
                                </div>
                            </div>
                        
        
                        </div>
                    </div> 
        
                
                </div> 
        
        
        
            )
        case 'NOT_EMPLOYEED':
            return (
                <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                        <div className="hero min-h-screen bg-base-200">
                            <div className="hero-content text-center">
                                <div>
                                    <h1 className="text-5xl font-bold">Hi there, Welcome to Workwise<span className="text-[#00b894]">HR.</span></h1>
                                        <p className="py-6 opacity-70 font-medium">Ooopps, looks like you don't have a position yet. <br></br> Please contact to your HR or ADMIN to add your a position.</p> 
                                    <button className="btn bg-[#00b894] opacity-70 text-white hover:bg-[#00b894] hover:opacity-100 transition-all ease-in" onClick={()=> {
                                        document.getElementById('my_modal_5').showModal();
                                        roleRef.current.value = "Select role here"
                                    }}>Contact HR</button>
                                </div>
                            </div>
                        </div>   
                    </div>
                    {/* <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
            <div className="modal-box w-[10px]">
                <div className="flex justify-between">
                <div>
                <h3 className="font-bold text-lg">New Employee</h3>
                <span className="label-text opacity-70 ">Input all the fields below</span>
                </div>
                <button type='button' className="btn shadow"  onClick={()=>  document.getElementById('my_modal_5').close()} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSetAccount}  method="dialog">
                <div className="avatar mt-5 w-full flex-col flex justify-center items-center gap-3">
                </div>
                <label className="input input-bordered mt-2 flex items-center gap-2">
                  Employee ID#
                   <input ref={emp_idRef}  type="text" className="grow" placeholder="i.g Onsoure000***" />
                </label>
                <label className="input input-bordered mt-2 flex items-center gap-2">
                  Full name
                   <input ref={fullnameRef}  type="text" className="grow opacity-70 cursor-not-allowed" placeholder="i.g marcus" disabled    />
                </label>
                <label className="input input-bordered mt-2 flex items-center gap-2">
                   Email
                   <input ref={emailRef} type="email" className="grow opacity-70 cursor-not-allowed" placeholder="i.g email" disabled  />
                </label>
                <label className="input input-bordered mt-2 flex items-center gap-2 mb-4">
                   Start-date:
                   <DatePicker className="grow"  selected={userData.employee_start_date}  onChange={(date) => setUserData({...userData, employee_start_date:date})} />
                </label>
            
    
                <label className="form-control w-full mt-2">
                   <div className="label">
                      <span className="label-text">Role</span>
                   </div>
                   <select ref={roleRef} className="select select-bordered" >
                      <option disabled defaultValue>Select here</option>
                      <option value="HR">HR</option>
                      <option value="ADMIN">ADMIN</option>
                   </select>
                </label>
               
                <div className="modal-action">
                    <button type='submit'  className="btn btn-success text-white w-[100%]">Set account as HR</button>
                </div>
                </form>
            </div>
        </dialog> */}
                </div> 
            )
      
        default:
            return (
                <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                        <div className="hero min-h-screen bg-base-200">
                            <div className="hero-content text-center">
                                <div>
                                    <h1 className="text-5xl font-bold">Hi there, Welcome to Workwise<span className="text-[#00b894]">HR.</span></h1>
                                        <p className="py-6 opacity-70 font-medium">Look like no ADMIN or HR role in this application, <br></br> so you can set your account to two role now to manage this application.</p> 
                                    <button className="btn bg-[#00b894] opacity-70 text-white hover:bg-[#00b894] hover:opacity-100 transition-all ease-in" onClick={()=> {
                                        document.getElementById('my_modal_5').showModal();
                                        setUserData({
                                            ...userData,
                                            employee_name:user.name,
                                            employee_email:user.email
                                        })
                                      
                                    }}>Set Account</button>
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
                <button type='button' className="btn shadow"  onClick={()=>  document.getElementById('my_modal_5').close()} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSetAccount}  method="dialog">
                <div className="avatar mt-5 w-full flex-col flex justify-center items-center gap-3">
                </div>
                <label className="input input-bordered mt-2 flex items-center gap-2">
                  Employee ID#
                   <input value={userData.employee_id || ""}   type="text" className="grow" placeholder="i.g Onsoure000***" onChange={(e)=> setUserData({...userData, employee_id: e.target.value })} />
                </label>
                <label className="input input-bordered mt-2 flex items-center gap-2">
                  Full name
                   <input value={userData.employee_name}  type="text" className="grow opacity-70 cursor-not-allowed" placeholder="i.g marcus" disabled   onChange={(e)=> setUserData({...userData, employee_name:  e.target.value})}  />
                </label>
                <label className="input input-bordered mt-2 flex items-center gap-2">
                   Email
                   <input value={userData.employee_email} type="email" className="grow opacity-70 cursor-not-allowed" placeholder="i.g email" disabled  onChange={(e)=> setUserData({...userData, employee_email: e.target.value })} />
                </label>
                <label className="input input-bordered mt-2 flex items-center gap-2 mb-4">
                   Start-date:
                   <DatePicker className="grow"  selected={userData.employee_start_date}  onChange={(date) => setUserData({...userData, employee_start_date:date})} />
                </label>
            
    
                <label className="form-control w-full mt-2">
                   <div className="label">
                      <span className="label-text">Role</span>
                   </div>
                   <select value={userData.employee_role} className="select select-bordered" onChange={(e)=> setUserData({...userData, employee_role: e.target.value})} >
                      <option  defaultValue>Select here</option>
                      <option value="HR">HR</option>
                      <option value="ADMIN">ADMIN</option>
                   </select>
                </label>
               
                <div className="modal-action">
                    <button type='submit'  className="btn btn-success text-white w-[100%]">Set account as HR</button>
                </div>
                </form>
            </div>
        </dialog>
                </div> 
            )
           
      }
      

    

  
}

export default Dashboard