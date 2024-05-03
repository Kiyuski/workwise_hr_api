import React, { useCallback, useEffect, useState } from 'react'
import { ComponentShowHeader } from '../ComponentShowHeader';
import Modal from '../components/Modal';
import axiosClient from '../axiosClient';
import { ComponentDataList } from '../ComponentDataList';
import moment from 'moment';
import { tabs, tabsLinks } from '../utils/utils';

function Leave() {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabIndexChild, setTabIndexChild] = useState(0);
  const [showTabs, setShowTabs] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [payload, setPayload] = useState({});
  const [department, setDepartment] = useState([])
  const [data, setData] = useState([]);
  const [department_id, setDepartment_id] = useState("")
  const [leaveData, setLeaveData] = useState([]);
  const [_id, setReuseDataId] = useState("");
  const [load, setModalLoad] = useState(false);
  const [ruleCanAccess, setRuleCanAccess] = useState("");
  const [loadPage, setLoadPage] = useState(false);
  const [employee_data, setEmployee_data] = useState({});
  const [loadTable, setLoadTable] = useState(false);
  const [forHRIS_head_request, setForHRIS_head_request] = useState(false)



  const calculateDays = (stDate, edDate) => {
    const startDate = new Date(stDate);
    const endDate = new Date(edDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.abs(Math.round(differenceInDays))
  };
 

  const handleShowType = (id) => {

    if(id === 2){
      setShowTabs(true)
      return;
    }else{
      setLoadTable(true)
      setTabIndex(id)
      setShowButton(true)

      switch (parseInt(id)) {
        case 1:
          getLeaveType();
          break;
        default:
          setTabIndex(0)
          getHoliday();
          break;
      }

    }
 
   
  }



  const handleShowTab = (id) => {
    setLoadTable(true)
    setTabIndexChild(id)
    setTabIndex(2)

    switch (id) {
      case 0:
    
        setShowButton(false);
        getAllLeave('all')
        break;
      case 1:
        setShowButton(true);
        getAllLeave('single');
        break;
      case 2:
        setShowButton(false);
        getAllLeave('department_request', true)
        break;
    
      default:
    
        break;
    }
    
    
  }

  useEffect(()=>{
    getEmployeeDetails();
    getHoliday()
    setShowButton(true)
 },[])

 


 const getHoliday = async () => {
  try {
    const res = await axiosClient.get(`/holiday`)
    setLoadTable(false);
    setData(res.data.map(h => {
      return {...h, number_of_days: calculateDays(h.holiday_start_date, h.holiday_end_date)}
    }))
  } catch (err) {
     const {response} = err;
     if(response &&  response.status  === 422){
       console.log(response.data)
     }
  }
 }

 const getLeaveType = async (request = false) => {
  if(!request){
    setLoadTable(true);
  }
  try {
    const res = await axiosClient.get(`/leave_type`)
    setLoadTable(false);
    if(request){
      setLeaveData(res.data.filter(h => h.leave_status !== "INACTIVE"))
      return;
    }
    setData(res.data);

  } catch (err) {
     const {response} = err;
     if(response &&  response.status  === 422){
       console.log(response.data)
     }
  }
 }


const getEmployeeDetails = () => {
  setLoadTable(true)
  setLoadPage(true);
  Promise.all([
    getDataList('employee'),
    getDataList('user')
   ])
      .then(async(data) => {

        const employee_data = data[0].data.find(emp => emp.employee_email === data[1].email)
       
        try {
          
          const res = await axiosClient.get(`/department/${employee_data?.department_id}`);
        
          const department_head_id = res.data.data.employee_id
          setRuleCanAccess(employee_data.employee_role.toUpperCase())
          employee_data['department_head_id'] = department_head_id;
          setEmployee_data(employee_data)

          if(employee_data.employee_role.toUpperCase() === "HR" || employee_data.employee_role.toUpperCase() === "ADMIN"){
            if(employee_data.id === department_head_id){
              setTabIndexChild(0);
              setLoadTable(false)
              setLoadPage(false)
              return;
            }
            setTabIndex(0);
            setTabIndexChild(0);
            setLoadPage(false)
            setLoadTable(false)

          }else{
          
            if(employee_data.id === department_head_id){
                setTabIndex(2);
                handleShowTab(1);
                setLoadTable(false)
                setLoadPage(false)
                return;
            }

            // setTabIndex(2);
            // handleShowTab(0);
            // setTabIndexChild(0);
            // setLoadPage(false)
          }

   
        } catch (err) {
           const {response} = err;
           if(response &&  response.status  === 422){
             console.log(response.data)
           }
        }
  
      })
      .catch((err) => {
          console.error(err);
      });
}





 const getAllLeave = async (type, isDepartmentHead = false) => {

  setData([])
  Promise.all([
    getDataList('employee'),
    getDataList('user')
   ])
      .then(async (data) => {
       
       const EmpId = data[0].data.find(emp => emp.employee_email === data[1].email).id;
       const employee_department_id = data[0].data.find(emp => emp.employee_email === data[1].email).department_id
      
        try {
          const { data : {data}  }= await axiosClient.get(`/leave`, {
            params: {
              employee_id: !isDepartmentHead ?  EmpId : employee_data.department_head_id,
              type: type,
            }
          })

  
          setDepartment_id(employee_department_id)
          setPayload({...payload, employee_id: !isDepartmentHead ?  EmpId : employee_data.department_head_id})
          setLoadTable(false);
          setData(data);      
      
        } catch (err) {
           const {response} = err;
           if(response &&  response.status  === 422){
             console.log(response.data)
           }
        }

      })
      .catch((err) => {
          console.error(err);
      });
 }

 const handleRemoveData = (id, path) => {

    axiosClient.delete(`/${path}/${id}`)
      .then(()=>{
          switch (path) {
            case 'holiday':
              getHoliday();
              alert(`${path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()} item is deleted successfully!`);
              break;
          case 'leave_type':
              getLeaveType()
              alert(`${path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()} item is deleted successfully!`);
              break;
          case 'leave':
              getAllLeave('single')
              alert(`${path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()} item is deleted successfully!`);
              break;
            default:
              break;
          }
      })
      .catch((err)=>{
         const {response} = err;
         if(response &&  response.status  === 422){
           console.log(response.data)
        }
    })
   
 }

 const showReusableData = (id, param = null, path) => {
   document.getElementById('my_modal_5').showModal()
   setModalLoad(true)
   axiosClient.get(`/${path}/${id}`, {
     params: {
       data: param 
     }
   })
   .then(({ data : {data} }) => {
    setModalLoad(false)
    let _data;
 
    switch (path) {
     case "holiday":
       _data = {
         name: data.holiday,
         start_date: data.holiday_start_date,
         end_date: data.holiday_end_date,
         year: data.holiday_year
       }
 
       break;
 
     case "leave_type":
     
       _data = {
         name: data.leave_type,
         number_of_days: data.leave_number_of_days,
         status: data.leave_status
       }
       break;
     case "leave":

     
       getLeaveType(true);
       _data = {
         leave_type: data.leave_type_id,
         department_head: data.department_head,
         apply_date: data.leave_apply_date,
         start_date: data.leave_start_date,
         end_date: data.leave_end_date,
         leave_reason: data.leave_reason,
         leave_status:data.leave_status,
         leave_image:data.employee_image,
         department_id: data.department_id
       }


       break;
    
     default:
       break;
    }
 
  
    setPayload({
     ...payload,
     ..._data
   })
    setReuseDataId(data.id)
 
   })
   .catch((err)=>{
      const {response} = err;
      if(response &&  response.status  === 422){
        console.log(response.data)
      }
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


  const handleSubmitPayload = () => {
    let request;
    let _payload;

    
  
    
    switch (tabs[tabIndex].text) {
      case 'HOLIDAYS':

        _payload = {
          holiday: payload.name,
          holiday_start_date: payload.start_date,
          holiday_end_date: payload.end_date,
          holiday_year: payload.year
        }
    
        request = _id ? axiosClient.put(`/holiday/${_id}?${new URLSearchParams(_payload).toString()}`) : axiosClient.post('/holiday', _payload);
        break;

        case 'LEAVE TYPE':

        _payload = {
          leave_type: payload.name,
          leave_number_of_days: parseInt(payload.number_of_days),
          leave_status: payload.status,

        }

        request = _id ? axiosClient.put(`/leave_type/${_id}?${new URLSearchParams(_payload).toString()}`) : axiosClient.post('/leave_type', _payload);
        
  
        break;
      case 'LEAVE APPLICATION':
     
        
    if(!payload.leave_type){
      alert("Please select leave type")
      return;
    }
   
       
         _payload = {
          employee_id: payload.employee_id,
          department_id: _id ? payload.department_id : department_id,
          leave_type_id: parseInt(payload.leave_type),
          leave_start_date: payload.start_date,
          leave_end_date: payload.end_date,
          leave_apply_date: payload.apply_date,
          leave_reason : payload.leave_reason,
          leave_status: _id ? payload.leave_status :  "PENDING"
         }

        

         if(parseInt(tabsLinks[tabIndexChild].id) === 2){
          delete _payload.employee_id
          _payload.leave_status_date_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
         }

         if(forHRIS_head_request){
           _payload.employee_approval_id = payload.head_id;
           _payload.employee_approval_role = department.find(d => d.head_id === payload.head_id).emp_role
         }

      
         request = _id ? axiosClient.put(`/leave/${_id}?${new URLSearchParams(_payload).toString()}`) : axiosClient.post('/leave', _payload);
      

        break;
    
      default:
        
        break;
    }

    request.then(({data})=>{
        setData([]);
        alert(data.message);
      
        switch (tabs[tabIndex].text) {
          case 'HOLIDAYS':
            getHoliday()

            break;
         case 'LEAVE TYPE':
 
            break;
        case 'LEAVE APPLICATION':
          
          if(parseInt(tabsLinks[tabIndexChild].id) === 2){
            getAllLeave('department_request', true)
          }else{
            getAllLeave('single');
          }
      
            break;
          default:
            break;
        }
      
    })
    .catch((err)=>{
        const {response} = err;
        if(response &&  response.status  === 422){
          console.log(response.data)
        }
    })
       setReuseDataId("")
       setPayload({})
      document.getElementById('my_modal_5').close()
  }
  

  const ComponentShowTabs = ({
    tabs,
    tabIndex,
    handleShowType,
    tabsLinks,
    tabIndexChild,
    handleShowTab,
    employee_data
  }) => {
    let dataTabs = [];
    let tabsLink = [];
    
    const employee_current_id = employee_data.id;
    const department_head_id = employee_data.department_head_id;

    let isHead = employee_current_id === department_head_id;
    
  


  
    switch (employee_data.employee_role) {
      case "HR":
      case "ADMIN":
         dataTabs = tabs.filter(t => t.accessUserRole.includes(employee_data.employee_role))
         tabsLink = !isHead ?  tabsLinks.filter(d => parseInt(d.id) !== 2) : tabsLinks.slice(0, tabsLinks.length - 1);
      break;
      case "EMPLOYEE":
         dataTabs = tabs.filter(t => t.accessUserRole.includes(employee_data.employee_role))
         tabsLink = !isHead ?  tabsLinks.filter(d => parseInt(d.id) !== 2) :  tabsLink = tabsLinks.slice(1);
      break;
      default:
        break;
    }

 

  

 
  
    return dataTabs.map((tab) => {
      return (
        <div role="tab" tabIndex={0}  key={tab.id} className={`tab ${tab.id === tabIndex  && "bg-[#00b894] text-white"} dropdown dropdown-bottom  font-bold`} 
        onClick={()=> {
          handleShowType(tab.id)  
        }}
        >
          {tab.id === 2 ? tabsLink.find(d =>  parseInt(d.id) === parseInt(tabIndexChild))?.text : tab?.text}
   
         
          {tab.id === 2 &&  (
            <ul  className="dropdown-content text-black  z-[1] menu mt-3 ml-10 p-2 shadow bg-base-100 rounded-box w-60">
              {tabsLink.map((tab,i)=>{
                return (
                  <li  key={i} className={`${tabIndexChild === tab.id ? "bg-[#00b894] rounded-box text-white " : "text-black"} `} onClick={()=> handleShowTab(tab.id)} ><a>{tab?.text}</a></li>
                )
              })}
              
            </ul>
          )}
   
        </div>
      )
    })

  }


 

  if(loadPage){
    return (
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className='ml-5'>
            <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      </div>  
    )
  }

 
  return (
    <>
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
               <div className="mb-4 flex items-center justify-between">
                <div role="tablist" className="tabs tabs-boxed">
                    <ComponentShowTabs 
                    emp_role={ruleCanAccess} 
                    tabs={tabs} 
                    setShowTabs={setShowTabs} 
                    tabIndex={tabIndex}
                    handleShowType={handleShowType}
                    showTabs={showTabs}
                    tabsLinks={tabsLinks}
                    tabIndexChild={tabIndexChild} 
                    handleShowTab={handleShowTab}
                    employee_data={employee_data}
                    />
                </div>
          
                  {showButton && (
                  <div className="flex-shrink-0 flex justify-center items-center gap-3" onClick={()=>  {
                    document.getElementById('my_modal_5').showModal()
                    if(parseInt(tabIndex) === 2) {
                      if(!department_id) return alert("You don't have a department please update your account and add a department.");
                      setModalLoad(true);
                   

                      const fetCher = employee_data.department_head_id === employee_data.id ? 
                      axiosClient.get(`/department/${department_id}`, {
                        params: {
                          type: "get_hr_and_admin"
                        }
                      }) :  axiosClient.get(`/department/${department_id}`)

                      
                      if(employee_data.department_head_id === employee_data.id){
                       setForHRIS_head_request(true)
                      }else{
                        setForHRIS_head_request(false)
                      }
            
                      Promise.all([
                        fetCher,
                        getDataList('employee'),
                        getDataList('user')
                       ])
                        .then((data) => {
                             
                             setModalLoad(false)
                             const EmpId = data[1].data.find(emp => emp.employee_email === data[2].email).id;
                             setDepartment(data[0].data.data)
                             setPayload({...payload, department_head: data[0].data.data.department_status,  
                              employee_id: EmpId , 
                              hris_hr_or_admin: data[0].data.data || []
                            });
                            
                             
                             getLeaveType(true) 
                         
                          })
                          .catch((err) => {
                              console.error(err);
                          });
                    }
      
                  }}>
                  <div className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </div>
                        <span className='font-bold opacity-70'>ADD {tabIndex === 2 ? tabsLinks[tabIndexChild]?.text : tabs[tabIndex]?.text}</span> 
                  </div>
                  )}
               </div>
               {loadTable && (
                    <div className="mb-6 mt-5 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                          <div className='ml-5 flex items-center gap-2'>
                              <span className="loading loading-ring loading-lg text-primary"></span><span className=' opacity-70 text-sm font-semibold'>Loading table....</span>
                          </div>
                    </div>  
                )}
               <div className="flex flex-col mt-8">
                  <div className="overflow-x-auto rounded-lg">
                     <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                           <table className="min-w-full divide-y divide-gray-200">

                              <thead className="bg-gray-50">
                            
                               {!loadTable && (<ComponentShowHeader ind={tabIndex} chilIn = {tabIndexChild}/>)} 
                              </thead>
                              <tbody className="bg-white">
                               {!loadTable && (
                                  <ComponentDataList ind={tabIndex} 
                                  chilIn = {tabIndexChild} 
                                  data={data} 
                                  moment={moment} 
                                  showReusableData={showReusableData} 
                                  department_id={department_id}
                                  handleRemoveData={handleRemoveData}
                                  />
                               )} 
                              </tbody>
                           </table>
                        </div>
                     </div>
              </div>

           </div>
      </div>
</div> 
    <Modal 
    title={tabs[tabIndex].text}
    childtitle={tabsLinks[tabIndexChild].text}
    payload={payload}
    data_id = {_id}
    setReuseDataId={setReuseDataId}
    department={department}
    setPayload={setPayload}
    handleSubmitPayload={handleSubmitPayload}
    data={leaveData}
    load={load}
    />
    </>
  )
}

export default Leave