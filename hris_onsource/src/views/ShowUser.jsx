import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom'
import axiosClient from '../axiosClient';
import moment from 'moment';
import { Portal } from "react-overlays";


const CalendarContainer = ({ children }) => {
  const el = document.getElementById("calendar-portal");

  return <Portal container={el}>{children}</Portal>;
};

function ShowUser() {
  const {id} =  useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [empData, setEmpData] = useState({
    employee_position: "",
    employee_start_date: "",
    employee_email: "",
    employee_end_date: "",
    employee_sss: "",
    employee_philhealth: "",
    employee_name: "",
    employee_address: "",
    employee_provincial_address: "",
    employee_birthdate: new Date(),
    employee_date_birth: new Date(),
    employee_birth_place: "",
    employee_civil_status: "Single",
    employee_spouse: "Yes",
    employee_name_of_spouse: "",
    employee_company: "",
    employee_father: "",
    employee_mother: "",
    employee_tin:"",
    employee_dependent: [
      {
        name: "",
        relationship:"",
        age: "",
        date_of_birth: new Date(),
      }
    ],
    employee_educational_background: [
      {
        school: "",
        degree: "",
        years_attended: "",
        type:"Elementary",
      },
      {
        school: "",
        degree: "",
        years_attended: "",
        type:"High School",
      },
      {
        school: "",
        degree: "",
        years_attended: "",
        type:"College",
      },
      {
        school: "",
        degree: "",
        years_attended: "",
        type:"Vocational",
      },
    ],
    employee_history: [
      {
        company:"",
        position:"",
        salary:"",
        length_of_service:"",
        reason_for_leaving:""
      }
    ],
    employee_reference: [
      {
        name: "",
        occupation:"",
        address: "",
        contact: "",
      }
    ],
    employee_case_emergency: {
      name: "",
      relationship: "",
      address: "",
      contact: "",
    },
  });

 
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const addMoreData = (choose) => {
    var data;
    switch (choose) {
      case "Dependents":
        data = {
          ...empData,
           employee_dependent: [
              ...empData.employee_dependent,
             {
               name: "",
               relationship:"",
               age: "",
               date_of_birth: new Date(),
             }
           ]
         }
        break;

        case "Educational_history":
        data = {
          ...empData,
           employee_history: [
              ...empData.employee_history,
             {
              company:"",
              position:"",
              salary:"",
              length_of_service:"",
              reason_for_leaving:""
             }
           ]
         }
        break;

        case "Reference":
        data = {
          ...empData,
           employee_reference: [
              ...empData.employee_reference,
             {
              name: "",
              occupation:"",
              address: "",
              contact: "",
             }
           ]
         }
        break;
    
      default:
        break;
    }
    setEmpData(data)
  }

 
  const removeData = (choose, id = null) => {
    var removeData;

    switch (choose) {
      case "Dependents":
        if(empData.employee_dependent.length === 1){
          return;
        }
  
        removeData = {
          ...empData,
           employee_dependent: [
            ...empData.employee_dependent.filter((d, i) => i !== id),
           ]
         }
        break;

        case "Educational_history":

          if(empData.employee_history.length === 1){
            return;
          }

          removeData = {
            ...empData,
             employee_history: [
              ...empData.employee_history.filter((d, i) => i !== id)
             ]
           }
          break;

          case "Reference":

          if(empData.employee_reference.length === 1){
            return;
          }

          removeData = {
            ...empData,
             employee_reference: [
              ...empData.employee_reference.filter((d, i) => i !== id)
             ]
           }
          break;
    
      default:
        break;
    }
   
    setEmpData(removeData)
  }


  useEffect(()=>{
    Promise.all([getDataList('position'), getDataList('department')])
      .then((dt) => {

        axiosClient.get(`/employee/${id}`)
        .then(({data : {data}})=>{
         
          setEmpData({...empData, 
            employee_name: data.employee_name,
            employee_start_date: data.employee_start_date,
            employee_email: data.employee_email,
            employee_address: data.employee_address,
            employee_position: dt[0].data.find(d => d.position_id === data.position_id).position,        
          })
          setStartDate(data.employee_start_date);
        })
        .catch((e)=>{
          console.log(e);
        })
      
      })
      .catch((err) => {
          console.error(err);
      });
 },[])

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


 const handleSubmitData = () => {
  console.log(empData);
 }


  

  return (
    <>
    <div  className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
        <h2 className="card-title font-bold">EMPLOYEE INFORMTION SHEET</h2>
        <div className='flex gap-5 mt-2'>
          <label className="form-control w-full  mt-2 ">
              <div className="label">
                <span className="label-text">Position:</span>
              </div>
              <input type="text" value={empData.employee_position} placeholder="i.g position" className="input input-bordered w-full" onChange={(e)=> setEmpData({...empData, employee_position: e.target.value})} />   
          </label>
          <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Date Hired:</span>
              </div>
              <DatePicker  className="input input-bordered mt-2 flex items-center gap-2 w-full"  selected={startDate}  onChange={(date) => setStartDate(date)} />
          </label>
        </div>

        <div className='flex gap-5'>
          <label className="form-control w-full  mt-2 ">
              <div className="label">
                <span className="label-text">Email Address:</span>
              </div>
              <input type="email" autoComplete='none' value={empData.employee_email} placeholder="i.g email" className="input input-bordered w-full" onChange={(e)=> setEmpData({...empData, employee_email: e.target.value})} />   
          </label>
          <label className="form-control w-full  mt-2">
            <div className="label">
              <span className="label-text">SSS #:</span>
            </div>
            <input type="number" value={empData.employee_sss} placeholder="i.g sss" className="input input-bordered w-full" onChange={(e)=> setEmpData({...empData, employee_sss: e.target.value})} />   
          </label>

        </div>

        <div className='flex gap-5'>
        <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">PhilHealth #:</span>
            </div>
            <input type="number" value={empData.employee_philhealth} placeholder="i.g philhealth" className="input input-bordered w-full " onChange={(e)=> setEmpData({...empData, employee_philhealth: e.target.value})}/>   
        </label>

        <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">TIN #:</span>
            </div>
            <input type="number" value={empData.employee_tin} placeholder="i.g tin" className="input input-bordered w-full " onChange={(e)=> setEmpData({...empData, employee_tin: e.target.value})} />   
        </label>
        </div>

        <h2 className="card-title mt-7">I. PERSONAL INFORMATION</h2>

        <div>
        <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <input type="text" value={empData.employee_name} placeholder="i.g fullname" className="input input-bordered w-full " onChange={(e)=> setEmpData({...empData, employee_name: e.target.value})} />   
        </label>
        <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Current Address:</span>
            </div>
            <input value={empData.employee_address} type="text" placeholder="i.g address" className="input input-bordered w-full " onChange={(e)=> setEmpData({...empData, employee_address: e.target.value})} />   
        </label>

        <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Provincial Address:</span>
            </div>
            <input type="text" value={empData.employee_provincial_address}  placeholder="i.g address" className="input input-bordered w-full " onChange={(e)=> setEmpData({...empData, employee_provincial_address: e.target.value})}/>   
        </label>
       
       
        </div>

        <div className='flex gap-5'>
          <label className="form-control w-full mt-2">
              <div className="label">
                <span className="label-text">Birth Date:</span>
              </div>
              <DatePicker  className="input input-bordered flex items-center gap-2 w-full" selected={empData.employee_birthdate}  onChange={(date)=> setEmpData({...empData, employee_birthdate:date}) } />
          </label>
          <label className="form-control w-full  mt-2">
            <div className="label">
              <span className="label-text">Birth Place:</span>
            </div>
            <input type="text" value={empData.employee_birth_place}  placeholder="i.g birthplace" className="input input-bordered w-full" onChange={(e) => setEmpData({...empData, employee_birth_place:e.target.value})} />   
        </label>
        </div>

        <div className='flex gap-5 mt-2'>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Civil Status:</span>
              </div>
              <div className='flex gap-2 items-center'>
              <input type="radio" name="radio-1" className="radio"
              checked={empData.employee_civil_status === "Single"}
              value="Single"
              onChange={() =>  setEmpData({...empData, employee_civil_status: "Single"})}
              />
              <span className="label-text">Single</span>
              <input type="radio" name="radio-1" className="radio"
               value="Married"
              checked={empData.employee_civil_status === "Married"}
              onChange={() =>  setEmpData({...empData, employee_civil_status: "Married"})}
              />
              <span className="label-text">Married</span>
              <input type="radio" name="radio-1" className="radio" 
                value="Separated"
                checked={empData.employee_civil_status === "Separated"}
                onChange={() =>  setEmpData({...empData, employee_civil_status: "Separated"})}
              />
              <span className="label-text">Separated</span>
              <input type="radio" name="radio-1" className="radio"
                value="Widow(er)"
               checked={empData.employee_civil_status === "Widow(er)"}
               onChange={() =>  setEmpData({...empData, employee_civil_status: "Widow(er)"})}
              />
              <span className="label-text">Widow(er)</span>
              </div>
          </label>
          <label className="form-control w-full mt-2">
                <div className="label">
                  <span className="label-text">Spouse Employed:</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className="label-text">Yes</span>
                  <input type="radio" name="radio-2" className="radio" 
                    checked={empData.employee_spouse === "Yes"}
                    value="Yes"
                    onChange={() =>  setEmpData({...empData, employee_spouse: "Yes"})}
                  />
                  <span className="label-text">No</span>
                  <input type="radio" name="radio-2" className="radio"
                  checked={empData.employee_spouse === "No"}
                  value="No"
                  onChange={() =>  setEmpData({...empData, employee_spouse: "No"})}
                  />
                </div>
            </label>
        </div>

        <div className='flex gap-5'>
          <label className="form-control w-full mt-2">
              <div className="label">
                <span className="label-text">Name of Spouse:</span>
              </div>
              <input type="text" value={empData.employee_name_of_spouse} placeholder="i.g spouse" autoComplete='false' className="input input-bordered w-full" onChange={(e) => setEmpData({...empData, employee_name_of_spouse: e.target.value}) } />   
          </label>
          <label className="form-control w-full  mt-2">
            <div className="label">
              <span className="label-text">Date of Birth:</span>
            </div>
            <DatePicker  className="input input-bordered flex items-center gap-2 w-full" selected={empData.employee_date_birth}  onChange={(date)=> setEmpData({...empData, employee_date_birth:date}) }  />
        
        </label>
        </div>

        <div className='flex gap-5'>
        
          <label className="form-control w-full  mt-2">
            <div className="label">
              <span className="label-text">Name of Company:</span>
            </div>
            <input type="text" value={empData.employee_company} placeholder="i.g company" className="input input-bordered w-full" onChange={(e)=> setEmpData({...empData, employee_company: e.target.value}) } />   
        </label>
        </div>

        <div className='flex gap-5'>
          <label className="form-control w-full mt-2">
              <div className="label">
                <span className="label-text">Father's Name:</span>
              </div>
              <input value={empData.employee_father} type="text" placeholder="i.g father" className="input input-bordered w-full" onChange={(e)=> setEmpData({...empData, employee_father: e.target.value})} />   
          </label>
          <label className="form-control w-full  mt-2">
            <div className="label">
              <span className="label-text">Mother's Name:</span>
            </div>
            <input type="text" value={empData.employee_mother} placeholder="ig. mother" className="input input-bordered w-full" onChange={(e)=> setEmpData({...empData, employee_mother: e.target.value})}/>   
        </label>
        </div>

        <h2 className="card-title mt-7">Dependents:</h2>
        <p className=' opacity-65 text-sm mt-2'>(For single; Please write down your parents name)</p>
        <div className="overflow-x-auto">
        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>
              <div onClick={()=> addMoreData("Dependents")} className='border flex w-12 justify-center items-center p-1 rounded-md bg-[#00b894] text-white transition-all opacity-70 hover:opacity-100 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"  />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {empData && empData.employee_dependent.map((de, i) => {
              return (
                <tr key={i}>
                <td><input type="text" value={de.name} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updateData = [...empData.employee_dependent];
                  updateData[i].name = e.target.value;
                  setEmpData({...empData, employee_dependent: updateData});
                }} /></td>
                <td><input type="text" value={de.relationship}  placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updateData = [...empData.employee_dependent];
                  updateData[i].relationship = e.target.value;
                  setEmpData({...empData, employee_dependent: updateData});
                }} /></td>
                <td><input type="number" value={de.age}  placeholder="Type here" className="input-md input w-full" onChange={(e)=>{
                  const updateData = [...empData.employee_dependent];
                  updateData[i].age = e.target.value;
                  setEmpData({...empData, employee_dependent: updateData});
                }} /></td>
                <td>
                  <DatePicker  value={de.date_of_birth} className="  input input-bordered flex items-center gap-2 w-full " selected={de.date_of_birth}  onChange={(date)=> {
                  const updateData = [...empData.employee_dependent];
                  updateData[i].date_of_birth = date;
                  setEmpData({...empData, employee_dependent: updateData});
                } }
                popperContainer={CalendarContainer}
               
                />
                </td>
                <th>
                <div onClick={()=> removeData("Dependents", i)}  className={`${ empData.employee_dependent.length > 1 ? "cursor-pointer hover:opacity-100" : "cursor-not-allowed "} border flex w-12 justify-center items-center p-1 rounded-md bg-red-700 text-white transition-all opacity-70 `}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  </div>
                </th>
              </tr>
             
              )
            })}
           
           
          </tbody>
        </table>


        

        
        </div>


        <h2 className="card-title mt-7">II. EDUCATIONAL BACKGROUND</h2>
        <div className="overflow-x-auto mt-2">
        <table className="table">

          <thead>
            <tr>
              <th></th>
              <th>School</th>
              <th>Years Attended</th>
              <th>Degree</th>
            </tr>
          </thead>
          <tbody>
            {empData.employee_educational_background.map((ed , i)=>{
              return (
                <tr key={i}>
                <td>
                  {ed.type}
                </td>
                <td><input value={ed.school} type="text" placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_educational_background];
                  updatePayloadEd[i].school = e.target.value;
                  setEmpData({...empData, employee_educational_background: updatePayloadEd});
                }} /></td>
                <td><input value={ed.years_attended} type="text" placeholder="Type here" className="input-md input w-full " 
                onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_educational_background];
                  updatePayloadEd[i].years_attended = e.target.value;
                  setEmpData({...empData, employee_educational_background: updatePayloadEd});
                }}
                /></td>
                <td><input value={ed.degree} type="text" placeholder="Type here" className="input-md input w-full " 
                onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_educational_background];
                  updatePayloadEd[i].degree = e.target.value;
                  setEmpData({...empData, employee_educational_background: updatePayloadEd});
                }}
                /></td>
              </tr>
              )
            })}
        
          </tbody>
        </table>
        </div>

        <h2 className="card-title mt-7">III. EMPLOYMENT HISTORY</h2>
        <p className=' opacity-65 text-sm mt-2'>(A. Previous Employment)</p>
        <div className="overflow-x-auto mt-2">
        <table className="table">

          <thead>
            <tr>
              <th>Company/Location</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Length of Service</th>
              <th>Reason for Leaving</th>
              <th>
                <div onClick={()=> addMoreData("Educational_history")} className='border w-12 flex justify-center items-center p-1 rounded-md bg-[#00b894] text-white transition-all opacity-70 hover:opacity-100 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"  />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {empData && empData.employee_history.map((eh, i)=>{
              return (
                <tr key={i}>
                
                  <td><input type="text" value={eh.company} placeholder="Type here" className="input-md input w-full "  onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_history];
                  updatePayloadEd[i].company = e.target.value;
                  setEmpData({...empData, employee_history: updatePayloadEd});
                }} /></td>
                  <td><input type="text" value={eh.position} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_history];
                  updatePayloadEd[i].position = e.target.value;
                  setEmpData({...empData, employee_history: updatePayloadEd});
                }}/></td>
                  <td><input type="text" value={eh.salary} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_history];
                  updatePayloadEd[i].salary = e.target.value;
                  setEmpData({...empData, employee_history: updatePayloadEd});
                }}/></td>
                  <td><input type="text" value={eh.length_of_service} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_history];
                  updatePayloadEd[i].length_of_service = e.target.value;
                  setEmpData({...empData, employee_history: updatePayloadEd});
                }} /></td>
                  <td><input type="text" value={eh.reason_for_leaving} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                  const updatePayloadEd = [...empData.employee_history];
                  updatePayloadEd[i].reason_for_leaving = e.target.value;
                  setEmpData({...empData, employee_history: updatePayloadEd});
                }}/></td>
                  <td>
                    <div onClick={()=> removeData("Educational_history", i)} className={`border flex justify-center w-12 items-center p-1 rounded-md bg-red-700 text-white transition-all opacity-70 ${ empData.employee_history.length > 1 ? "cursor-pointer hover:opacity-100" : "cursor-not-allowed "}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </td>
              </tr>  
              )
            })}
          </tbody>
        </table>
        </div>

        <h2 className="card-title mt-7">IV. CHARACTER REFERENCE</h2>
        <p className=' opacity-65 text-sm mt-2'>(Not Related To You)</p>
        <div className="overflow-x-auto mt-2">
        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Occupation</th>
              <th>Address</th>
              <th>Contact #</th>
              <th>
                <div onClick={()=> addMoreData("Reference")} className=' w-12 border flex justify-center items-center p-1 rounded-md bg-[#00b894] text-white transition-all opacity-70 hover:opacity-100 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"  />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {empData.employee_reference && 
              empData.employee_reference.map((er, i)=>{
                return (
                  <tr key={i}>
                    <td><input type="text" value={er.name} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                      const updatePayloadEd = [...empData.employee_reference];
                      updatePayloadEd[i].name = e.target.value;
                      setEmpData({...empData, employee_reference: updatePayloadEd});
                    }} /></td>
                    <td><input type="text" value={er.occupation} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                      const updatePayloadEd = [...empData.employee_reference];
                      updatePayloadEd[i].occupation = e.target.value;
                      setEmpData({...empData, employee_reference: updatePayloadEd});
                    }}/></td>
                    <td><input type="text" value={er.address} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                      const updatePayloadEd = [...empData.employee_reference];
                      updatePayloadEd[i].address = e.target.value;
                      setEmpData({...empData, employee_reference: updatePayloadEd});
                    }} /></td>
                    <td><input type="number" value={er.contact} placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                      const updatePayloadEd = [...empData.employee_reference];
                      updatePayloadEd[i].contact = e.target.value;
                      setEmpData({...empData, employee_reference: updatePayloadEd});
                    }} /></td>
                    <td>
                      <div onClick={()=> removeData("Reference", i)} className={`w-12 border flex justify-center items-center p-1 rounded-md bg-red-700 text-white transition-all opacity-70 ${empData.employee_reference.length > 1 ? "cursor-pointer hover:opacity-100": "cursor-not-allowed"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                )
              }
            )}
            
          
          </tbody>
        </table>
        </div>

        <h2 className="card-title mt-7">V. PERSON TO NOTIFY IN CASE OF EMERGENCY</h2>
        <div className="overflow-x-auto mt-2">
        <table className="table">

          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>

            </tr>
          </thead>
          <tbody>
  
            <tr>
              <td className="w-[10%]">Name:</td>
              <td><input value={empData.employee_case_emergency.name} type="text" placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                setEmpData({
                  ...empData, 
                  employee_case_emergency: {
                    ...empData.employee_case_emergency,
                    name: e.target.value
                  }
                })
              }} /></td>
              <td className="w-[10%]">Relationship:</td>
              <td><input type="text"  value={empData.employee_case_emergency.relationship} placeholder="Type here" className="input-md input w-full " onChange={(e)=> {
                setEmpData({
                  ...empData,
                  employee_case_emergency:{
                    ...empData.employee_case_emergency,
                     relationship: e.target.value
                  }
                })
              }}/></td>
            </tr>

            <tr>
              <td className="w-[10%]">Address:</td>
              <td><input value={empData.employee_case_emergency.address} type="text" placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                setEmpData({
                  ...empData, 
                  employee_case_emergency: {
                    ...empData.employee_case_emergency,
                    address: e.target.value
                  }
                })
              }}/></td>
              <td className="w-[10%]">Contact Number:</td>
              <td><input value={empData.employee_case_emergency.contact} type="text" placeholder="Type here" className="input-md input w-full " onChange={(e)=>{
                setEmpData({
                  ...empData, 
                  employee_case_emergency: {
                    ...empData.employee_case_emergency,
                     contact: e.target.value
                  }
                })
              }} /></td>
            </tr>
          </tbody>
        </table>
        <p className=' opacity-65 text-sm mt-2 '>
          I authorize investigation of any statement made on this application and understand that misrepresentation of any information can
          terminate any employment contract signed. I am willing to abide by the company rules and regulations and other memoranda that
          may issue.
        </p>
            <div className="card-actions justify-end mt-5">
          <button className="btn btn-active btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
        </svg>
            PRINT
            </button>
          <button className="btn btn-success text-white" onClick={handleSubmitData}>SAVE INFORMATION</button>
        </div>
        </div>
      </div>
    </div> 

    
    </>
  )
}

export default ShowUser