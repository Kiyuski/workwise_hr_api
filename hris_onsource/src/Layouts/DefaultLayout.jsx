import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context';
import { links } from '../links';
import { useLocation } from 'react-router-dom'
import axiosClient from '../axiosClient';
import { googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./../App.css"


const ComponentShow = ({settings, payload, setPayload, allRole, allDepartment, allPosition, handleSubmit, handleEditEmail, dis}) => {
  let html_render = ""
  switch (settings) {
    case "Profile":
      html_render = (
        <form  method="dialog">
        <div className="avatar mt-5 w-full flex-col flex justify-center items-center gap-3">
           <div className="w-24 rounded-full ring ring-[#00b894] ring-offset-base-100 ring-offset-2">
              <img  src={
                payload.employee_image ? typeof payload.employee_image === "object" ? URL.createObjectURL(payload.employee_image) : payload.employee_image  : 
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
             
           </div>
           <input  type="file"  className="file-input file-input-bordered w-full mt-2" 
           onChange={(e)=>{
                const file = e.target.files[0]; 
                 const reader = new FileReader();
                 reader.onload = () => {
                    setPayload({...payload, employee_image:e.target.files[0], employee_image_url: reader.result})
                 };
                 reader.readAsDataURL(file);
           }} 
           />
        </div>
        <label className="input input-bordered mt-2 flex items-center gap-2">
          Employee ID:
           <input value={payload.employee_id || ""} name="employee_id"  type="text" className="grow"  placeholder="i.g Onsoure000***" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })}  />
        </label>
        <label className="input input-bordered mt-2 flex items-center gap-2">
          Full name:
           <input value={payload.employee_name || ""}  name="employee_name"   type="text" className="grow" placeholder="i.g marcus"  
           onChange={(e)=> {
            setPayload({...payload, [e.target.name]: e.target.value })
           }}  
           />
        </label>
        <label className="input input-bordered mt-2 flex items-center gap-2 ">
          Email:
           <input value={payload.employee_email || ""} name="employee_email" disabled={dis}  type="text" className={`grow ${dis && "opacity-50"}`} placeholder="i.g marcus" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })}  />

          {dis ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer opacity-70" onClick={handleEditEmail}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
           
          ): (
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer opacity-70" onClick={handleEditEmail}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
         </svg>

          )}

        </label>
        <label className="input input-bordered mt-2 flex items-center gap-2">
           Address:
           <input value={payload.employee_address || ""} name="employee_address"  type="text" className="grow" placeholder="i.g address" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })} />
        </label>

        <label className="input input-bordered mt-2 flex items-center gap-2">
           Contact:
           <input value={payload.employee_phone || ""} name="employee_phone"  type="number" className="grow" placeholder="i.g 0969*****" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })} />
        </label>

        <label className="form-control w-full mt-2">
           <div className="label">
              <span className="label-text">Gender:</span>
           </div>
           <select value={payload.employee_gender || ""} name="employee_gender" className="select select-bordered" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })} >
              <option  defaultValue>Select here</option>
              <option value="M">MALE</option>
              <option value="F">FEMALE</option>
           </select>
        </label>

        <label className="form-control w-full mt-2">
           <div className="label">
              <span className="label-text">Role:</span>
           </div>
           <select value={payload.employee_role || ""} name="employee_role"  className="select select-bordered" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })} >
              <option defaultValue>Select here</option>
              {allRole && allRole.map(r => {
                 return (
                    <option value={r} key={r}>{r}</option>
                 )
              })}
           </select>
        </label>

        <label className="form-control w-full mt-2">
           <div className="label">
              <span className="label-text">Department:</span>
           </div>
           <select value={payload.department_id || ""} name="department_id" className="select select-bordered"onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })} >
              <option  defaultValue>Select here</option>
              {allDepartment.map((de)=>{
                 return <option key={de.id} value={de.id}>{de.department}</option> 
              })}
             
           </select>
        </label>

        <label className="form-control w-full mt-2">
           <div className="label">
              <span className="label-text">Position:</span>
           </div>
           <select value={payload.position_id || ""} name="position_id" className="select select-bordered" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })} >
              <option defaultValue>Select here</option>
              {allPosition.map((pos)=>{
                 return <option key={pos.position_id} value={pos.position_id}>{pos.position}</option> 
              })}
           </select>
        </label>

       
        <div className="modal-action">
            <button type='submit' className="btn btn-success text-white w-[50%]" onClick={handleSubmit}>UPDATE ACCOUNT</button>
        </div>
        </form>
      )
    break;
    case "Account Verification":
      html_render = (
        <form  method="dialog">
      
        <label className="input input-bordered mt-2 flex items-center gap-2 ">
          Email:
           <input value={payload.employee_email || ""} name="employee_email" disabled={true}  type="text" className={`grow ${dis && "opacity-50"}`} placeholder="i.g marcus" onChange={(e)=> setPayload({...payload, [e.target.name]: e.target.value })}  />
        </label>
       
        <div className="modal-action">
            <button type='submit' className="btn btn-success text-white w-[50%]" onClick={handleSubmit}>VERIFY EMAIL</button>
        </div>
        </form>
      )
    break;
    case "Change Password":
      html_render = (
        <form  method="dialog">
      
        <label className="input input-bordered mt-2 flex items-center gap-2 ">
          Current Password:
           <input name="employee_email" type="text" className={`grow `} placeholder="Your current password here..."  />
        </label>
        <label className="input input-bordered mt-2 flex items-center gap-2 ">
          New Password:
           <input  name="employee_email" type="text" className={`grow `} placeholder="New password here"  />
        </label>
       
        <div className="modal-action">
            <button type='submit' className="btn btn-success text-white w-[50%]" onClick={handleSubmit}>VERIFY EMAIL</button>
        </div>
        </form>
      )
    break;
    default:
      break;
  }
  return html_render;
}


function DefaultLayout() {

  const [totalNotifications, setTotalNotifications] = useState([]);
  const location = useLocation();
  const {id} = useParams();
  const { pathname } = location;
  const {setToken, setUser, user} = useAuth();
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [_id, setEmployee_id] = useState("")
  const [canFileLeave, setCanFileLeave] = useState(false);
  const [chooseSettings, setChooseSettings] = useState("");
  const [payload, setPayload] = useState({
    employee_name:""
  });
  const [allPosition, setAllPosition] = useState([]);
  const [allDepartment, setAllDepartment] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [dis, setDisabled] = useState(true)

 

  const logOut = () => {

    axiosClient.post("/logout")
    .then(()=>{
        googleLogout();
        setUser({});
        setToken(null);
    })
  }


  const handleSubmit = () => {
    console.log(_id);
    if(!payload.employee_image_url){
      payload.employee_image = payload.employee_image ? payload.employee_image : "";
   }else{
      payload.employee_image = payload.employee_image_url;

   }
   delete payload.employee_image_url;
  
   const data = {
      employee_image:payload.employee_image || "",
      employee_id:payload.employee_id,
      employee_name:payload.employee_name,
      employee_address:payload.employee_address || "",
      employee_phone:payload.employee_phone || "",
      employee_gender:payload.employee_gender || "",
      employee_email:payload.employee_email || "",
      employee_role:payload.employee_role,
      department_id:payload.department_id,
      position_id:payload.position_id,
      action: 'Employee_update_data'
   }

   const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  
  const queryString = new URLSearchParams(data).toString();

   axiosClient.put(`/employee/${_id}`, queryString, config)
         .then(()=>{
            document.getElementById('my_settings_3').close()
            alert("YOUR ACCOUNT IS SUCCESSFULLY UPDATED");
            fetchData();
            setPayload({})
         })
         .catch((err)=>{
            const {response} = err;
            if(response &&  response.status  === 422){
            console.log(response.data)
            }
         })

  

  }


  

  useEffect(()=>{
    fetchData();
 },[])


 const fetchData = () => {
  Promise.all([
    getDataList('user'), 
    getDataList('employee'), 
    getDataList('position'),
    getDataList('department')
  ])
    .then((data) => {
 
      const emp_id = data[1].data.find(emp => emp.employee_email === data[0].email)?.id;
      const emp_role = data[1].data.find(emp => emp.employee_email === data[0].email)?.employee_role;
      const department_id = data[1].data.find(emp => emp.employee_email === data[0].email)?.department_id;
      const position_id = data[1].data.find(emp => emp.employee_email === data[0].email)?.position_id;

      setUser({...data[1].data.find(emp => emp.employee_email === data[0].email), employee_image: !data[0].image ? data[1].data.find(emp => emp.employee_email === data[0].email).employee_image : data[0].image }); 
      setRole(emp_role);
      setPosition(data[2].data.find(pos => pos.position_id === data[1].data.find(emp => emp.employee_email === data[0].email)?.position_id)?.position);
      setDepartment(data[3].data.find(de => de.id === department_id)?.department)
      setEmployee_id(emp_id);

      setAllPosition(data[2].data);
      setAllDepartment(data[3].data);

      let allRoles = ['EMPLOYEE', 'HR', 'ADMIN'];
  
      setAllRole(allRoles);

      if(!department_id || !position_id){
        setCanFileLeave(false);
      }else{
        setCanFileLeave(true);
      }

  
      if(emp_role === "HR" || emp_role === "ADMIN"){
        getNotificationList()
      }else{
        getNotificationList(emp_id)
      }
      

    })
    .catch((err) => {
        console.error(err);
    });
 }


 const getNotificationList = (id = null) => {
   getDataList('notification', id)
   .then(data => {
    setTotalNotifications(data.data);
   })
 }


 const IconFile = ({authorize_leave, icon}) => {
   if(authorize_leave){
    return icon
   }else{
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
   }
 }

 const handleEditEmail = () => {
  if(dis){
    if (confirm('Are you sure you want to change your email?')) {
      console.log("yes i am")
      setDisabled(false);
      } else {
      alert('Okay, Thank you!');
      setDisabled(true);
      }
      return;
  }

  setDisabled(true)
 }




 



  const getDataList = async (path, id = null) => {
    try {
      const res = await axiosClient.get(`/${path}`, {
        params:{
           id,
           data: path === "department" ? "ALL":"",
           allDepartment: path === "department",
           all:true
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


 



  const {token} = useAuth();
  if(!token) {
    return <Navigate to='/login' />
  }


  const Component  = () => {
    switch (role) {
      case 'HR':
      case 'ADMIN':
        return links.filter(link => link.path === '/dashboard' 
        || link.path === '/positions' 
        || link.path === '/department'
        || link.path === '/employees'
        || link.path === '/notification'
        || link.path === '/leave'
        || link.path === '/history'
      ) 
        .map((link ,i) => (
             <li key={i} >
             <Link to={`${link.path}`} onClick={(e)=> {
              if(!canFileLeave && link.path === '/leave'){
                e.preventDefault();
                alert(`You are not allowed to add leave, because you don't have a department or a position as an ${role}.`)
                return false;
              }
             }}  aria-label="dashboard" className={`${link.path === "/leave" && !canFileLeave ? "cursor-not-allowed" : ""} relative px-4 py-3 flex items-center space-x-4 rounded-xl ${link.name.toLowerCase()=== pathname.split('/')[1] ? "rounded-xl text-white bg-gradient-to-r from-[#00b894] to-[#00b894]" : " group"} `}>
                 {link.path === "/leave" ? <IconFile authorize_leave={canFileLeave} icon={link.icons}/> : link.icons}
                 <span  className="-mr-1 font-medium">{link.name}</span>
             </Link>
         </li>
         ))

      case 'EMPLOYEE':
        return links.filter(link => link.path === '/dashboard'
        || link.path === '/notification'
        || link.path === '/leave'
      ) 
        .map((link ,i) => (
             <li key={i} >
             <Link to={`${link.path}`} aria-label="dashboard" className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${link.name.toLowerCase()=== pathname.split('/')[1] ? "rounded-xl text-white bg-gradient-to-r from-[#00b894] to-[#00b894]" : " group"} `}>
                 {link.icons}
                 <span className="-mr-1 font-medium">{link.name}</span>
             </Link>
         </li>
         ))
    
      default:
        return links.filter(link => link.path === '/dashboard'  )
       .map((link ,i) => (
            <li key={i}>
            <Link to={`${link.path}`} aria-label="dashboard" className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${link.name.toLowerCase()=== pathname.split('/')[1] ? "rounded-xl text-white bg-gradient-to-r from-[#00b894] to-[#00b894]" : " group"} `}>
                {link.icons}
                <span className="-mr-1 font-medium">{link.name}</span>
            </Link>
        </li>
        ))
    }
  }


 

  

  




  return (
    <div className="App ">
       <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
          <div>
              <div className="-mx-6 px-6 py-4 text-center">
                  <a href="#" title="home">
                  <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Workwise<span className=' text-[#00b894] font-bold'>HR.</span>
                  </h4>
                  </a>
              </div>

              <div className="mt-2 text-center flex justify-center items-center flex-col">
           
                 {user.employee_image ? (
                   
                    <div className="avatar">
                    <div className="w-24 rounded-full ring ring-[#00b894] ring-offset-base-100 ring-offset-2">
                      <img src={user.employee_image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}  srcSet={user.employee_image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}/>
                    </div>
                  </div>
             
                 ): (

                  <div className="avatar placeholder">
                    <div className=" bg-[#00b894] rounded-full w-24 from-[#00b894] to-[#00b894] text-white shadow-[#00b894]/20 shadow-lg">
                        <span className="text-3xl">{user.employee_name && user.employee_name.split("")[0]}</span>
                    </div>
                    </div> 
                 )}
                  <div className=' max-md:hidden flex flex-col mt-4 justify-center items-center gap-2'>
                    
                    <h5 className="hidden  text-xl font-semibold  lg:block">{user.employee_name}</h5> 
                    <span className='border w-full'></span>
                    
                    {!position && !role && (
                      <span className="hidden opacity-70  lg:block">No Position</span>
                    )}
                    {role && (
                      <>
                      <span className="hidden opacity-70 lg:block text-sm font-semibold">{role === "EMPLOYEE" ? position : role} {department && (<>/ <span className="text-blue-500">{department}</span></> )} </span>
                      </>
                    )}
                   
                  </div>
              </div>

              <ul className="space-y-2 tracking-wide mt-8">
                <Component />
          
                
              </ul>
          </div>

          <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              <button onClick={logOut} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="group-hover:text-gray-700">Logout</span>
              </button>
          </div>
      </aside>

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
          <div className="sticky z-10 top-0 h-16 border-b  lg:py-2.5">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                <div className='flex  justify-center items-center gap-1'>
                <svg className="-ml-1 h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
               </svg>

                  <div className="text-sm breadcrumbs ">
                        <ul>
                           {pathname.split("/").slice(1, pathname.split("/").length).map((pt, i)=>{
                              return (
                                <li   key={i}>
                                  <Link  to={pathname.split("/").slice(1, pathname.split("/").length)[0] === pt ? `/${pt}`: `${pathname.split("/").slice(1, pathname.split("/").length)[0]}/${pt}` }>
                                       <h5  hidden className={`text-sm text-gray-600 font-medium lg:block capitalize ${pt === id ? "cursor-not-allowed" : "cursor-pointer"}`} >{pt}</h5>
                                  </Link>
                                </li> 
                              )
                           })}
                        </ul>
                  </div>
              
                </div>
                  <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                  </button>
                  
                
                  {_id && (
                  <div className="flex space-x-2 items-center">  
                      <div>
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-md ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

                          </div>
                          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60 ">
                            <li>
                              <a className="justify-between" onClick={()=>{
                                setChooseSettings("Account Verification")
                                setPayload({...payload, employee_email:user.employee_email});
                                document.getElementById('my_settings_3').showModal()
                              }}>
                                Account Verification
                                <span className="badge badge-error badge-sm"></span>
                              </a>
                            </li>
                            <li><a onClick={()=>{
                                setChooseSettings("Profile")
                                setPayload(user);
                                document.getElementById('my_settings_3').showModal()
                              }}>Profile</a></li>
                            <li><a onClick={()=>{
                                setChooseSettings("Change Password")
                                document.getElementById('my_settings_3').showModal()
                              }}>Change Password</a></li>
                          </ul>
                        </div>
                      </div>
         
                      <div className="indicator">
                        <span className="indicator-item badge text-sm badge-success text-white">{totalNotifications &&  totalNotifications.filter(n => n.leave_has_seen !== 1)?.length}</span> 
                        <button aria-label="notification" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 indicator" onClick={()=> document.getElementById('for_notification').show()}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                      </button>
                      </div>
                  </div>
                  )}
              </div>
          </div>
      </div>

      <Outlet/>

          <dialog id="for_notification" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <div className='flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                      </svg>
               
              <h3 className="font-bold text-lg">List of Notifications</h3>
              </div>
              <div className="text-sm my-4 w-full">
                <ul className='flex flex-col overflow-y-scroll w-full h-56 p-2 '>
                  {!totalNotifications.length && (
                    <div className="text-center text-gray-600 font-semibold mt-20">
                      No Notifications found!
                      </div>
                  )}
                  {totalNotifications.length > 0 && totalNotifications.map((notification, i) =>{
                    return (
                      <li key={i}>
                      <div role="alert" className={`alert shadow-sm pb-8 mb-4 relative ${notification.leave_has_seen === 0 ? "opacity-100": "opacity-50"}`}>
                            <div>
                              <h3 className="font-bold">{notification.employee_approval_id === _id ? "YOUR NOTIFICATION: " : `From: ${notification.from_user}`} </h3>
                              {role === "HR" || role === "ADMIN"  ? (
                                <div className="text-xs">{_id === notification.employee_id ? "Your" : notification.to_user} {notification.sender_message.split("is")[0]} is <span className={`font-bold ${notification.sender_message.split("is")[1]?.trim() === "PENDING" || notification.sender_message.split("is")[1]?.trim() === "DISAPPROVED" ? "text-red-500" : "text-blue-500"} `}>{notification.sender_message.split("is")[1]?.trim()}</span>, for <span className='font-bold uppercase'>{notification.sender_leave_request}</span>.</div>
                              ): (
                                <div className="text-xs"> Your {notification.sender_message.split("is")[0]} is <span className={`font-bold ${notification.sender_message.split("is")[1]?.trim() === "PENDING" || notification.sender_message.split("is")[1]?.trim() === "DISAPPROVED" ? "text-red-500" : "text-blue-500"} `}>{notification.sender_message.split("is")[1]?.trim()}</span>, for <span className='font-bold'>{notification.sender_leave_request}</span>.</div>
                              )}
                            </div>
                       
                              <Link to={`/notification?id=${notification.id}`} className="btn btn-sm" onClick={()=> {
                                document.getElementById('for_notification').close();
                                if(notification.leave_has_seen === 0){
                                  axiosClient.put(`/notification/${notification.id}`, {
                                    leave_has_seen: 1
                                  }).then(() => {
                               
                                    getNotificationList(notification.employee_id)
                                  })
                                }
                              }}>View</Link>

                            <span className='text-[9px] font-semibold absolute right-5 opacity-70 bottom-2'>{moment(notification.created_at).calendar()}</span>
                        </div>
                    
                      </li>
                    )
                  })}
                </ul>
               </div>
             
            </div>
          </dialog>

          <dialog id="my_settings_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> {
                   document.getElementById('my_settings_3').close()
                   setDisabled(true)
                }}>✕</button>
              </form>
              <h3 className="font-bold text-lg uppercase">{chooseSettings === "Profile" ? "PROFILE INFORMATION": chooseSettings}</h3>
              <ComponentShow settings={chooseSettings} 
              payload={payload}
              allRole={allRole}
              setPayload={setPayload}
              allDepartment={allDepartment}
              allPosition={allPosition}
              handleEditEmail={handleEditEmail}
              handleSubmit={handleSubmit}
              dis={dis}
                />
            </div>
          </dialog>

          
    </div>
  )
}

export default DefaultLayout