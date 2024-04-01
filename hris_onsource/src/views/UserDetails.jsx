import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint, ReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';
import moment from 'moment';

function UserDetails() {

    const {id} = useParams();
    const [empData, setEmpData] = useState({
        employee_id: id,
        employee_position: [],
        position_id:'',
        employee_start_date: "",
        employee_email: "",
        employee_end_date: "",
        employee_sss: "",
        employee_philhealth: "",
        employee_pag_ibig: "",
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


    useEffect(()=>{
     
         Promise.all([getDataList('position'), getDataList('department')])
           .then((dt) => {
             axiosClient.get(`/employee/${id}`)
             .then(({data : {data}})=>{
         
               setEmpData({...empData,
                employee_provincial_address: data.employee_provincial_address ,
                employee_birthdate: data.employee_birthdate,
                employee_date_birth: data.employee_date_birth,
                employee_birth_place: data.employee_birth_place,
                employee_civil_status: data.employee_civil_status,
                employee_spouse: data.employee_spouse  ,
                employee_name_of_spouse:  data.employee_name_of_spouse,
                employee_company: data.employee_company ,
                employee_father: data.employee_father ,
                employee_mother: data.employee_mother ,
                 employee_pag_ibig: data.employee_pag_ibig,
                 employee_sss: data.employee_sss,
                 employee_philhealth: data.employee_philhealth,
                 employee_tin: data.employee_tin,
                 employee_name: data?.employee_name,
                 employee_start_date: data?.employee_start_date,
                 employee_email: data?.employee_email,
                 employee_address: data?.employee_address, 
                 employee_position: dt[0]?.data.find(p => parseInt(p.position_id) === parseInt(data.position_id)).position,  
                 employee_dependent: !data.employee_dependents.length ? empData.employee_dependent : data.employee_dependents,
                 employee_educational_background: data?.employee_educational_background,
                 employee_history: data?.employee_employment_history ,
                 employee_reference: data?.employee_character_reference,
                 employee_phone: data.employee_phone,
                 employee_image: data?.employee_image, 
                 position_id:data?.position_id,   
               })
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


  return (
    <>

    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className=" shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
                     <div className="mb-4 flex items-center justify-between">
                        <div className="flex-shrink-0 flex justify-center items-center gap-3" >
                        <div className='shadow-md p-1 bg-[#00b894] rounded-md text-white cursor-pointer transition-all ease-in opacity-75 hover:opacity-100' onClick={() => {
                handlePrint(null, () => contentToPrint.current);
                }}>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                            </svg>

                        </div>
                          <span className='font-bold opacity-70'>PRINT</span>
                        </div>
                     </div>
                     <div className="flex flex-col mt-8 mx-8 mb-48" ref={contentToPrint}>
                        <div>
                            <h2 className="card-title">EMPLOYEE INFORMATION SHEET</h2>
                        </div>
                        <div className='flex my-6'>
                            <div className="flex-1">
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>Position:</h2>
                                    <p>{empData.employee_position}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>Date Hired:</h2>
                                    <p>{empData.employee_start_date}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>Mobile No:</h2>
                                    <p>0{empData.employee_phone}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>Email Address:</h2>
                                    <p>{empData.employee_email}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>SSS No:</h2>
                                    <p>{empData.employee_sss &&  empData.employee_sss.match(/.{1,3}/g).join("-")}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>Pag-ibig No:</h2>
                                    <p>{empData.employee_pag_ibig && empData.employee_pag_ibig.match(/.{1,3}/g).join("-")}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>Philhealth No:</h2>
                                    <p>{empData.employee_philhealth && empData.employee_philhealth.match(/.{1,3}/g).join("-")}</p>
                                </div>
                                <div className='flex gap-1 mt-1'>
                                    <h2 className=' font-bold'>TIN:</h2>
                                    <p>{empData.employee_tin && empData.employee_tin.match(/.{1,3}/g).join("-")}</p>
                                </div>
                            </div>
                            <div className="flex-1 flex max-md:justify-end justify-center overflow-hidden">
                                <div className="avatar">
                                    <div className=" w-48 rounded">
                                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="card-title mb-2">I. PERSONAL INFORMATION</h2>
                        </div>

                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Name:</h2>
                            <p>{empData.employee_name}</p>
                        </div>
                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Current Address:</h2>
                            <p>{empData.employee_address}</p>
                        </div>
                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Provincial Address:</h2>
                            <p>{empData.employee_provincial_address || "_________________________________________"}</p>
                        </div>
                        <div className='flex  gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Birth Date:</h2>
                              <p>{moment(empData.employee_birthdate).format('L')}</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Birth Place:</h2>
                              <p>{empData.employee_birth_place}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Age:</h2>
                              <p>20</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Sex:</h2>
                              <p>Female</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Weight:</h2>
                              <p>25.5g</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Height:</h2>
                              <p>100g</p>
                          </div>
                        </div>
                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Civil Status:</h2>
                              <p></p>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Single</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Married</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Separated</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Window(er)</h2>
                          </div>
                         
                        </div>
                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Name of Spouse:</h2>
                              <p>{empData.employee_name_of_spouse}</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Date of Birth:</h2>
                              <p>{moment(empData.employee_date_birth).format('L')}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Spouse Employed?</h2>
                              <div className='flex gap-1'>
                                <p>____</p>
                                <h2 className=' font-bold'>Yes</h2>
                              </div>
                              <div className='flex gap-1'>
                                <p>___</p>
                                <h2 className=' font-bold'>No</h2>
                              </div>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Name of Company:</h2>
                              <p>{empData.employee_company}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Father's Name:</h2>
                              <p>__</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Mother's Name:</h2>
                              <p>___</p>
                          </div>
                        </div>
                        <ReactToPrint
                        
                        documentTitle="AwesomeFileName"
                      
                        />
                        <div className='mt-5'>
                            <h2 className="card-title">Dependents:</h2>
                            <p className=' opacity-70 text-sm'>(For Single; Please write down your parents name)</p>
                        </div>

                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Name:</h2>
                            <p>{empData.employee_name}</p>
                        </div>
                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Current Address:</h2>
                            <p>{empData.employee_address}</p>
                        </div>
                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Provincial Address:</h2>
                            <p>{empData.employee_provincial_address || "_________________________________________"}</p>
                        </div>
                        <div className='flex  gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Birth Date:</h2>
                              <p>{moment(empData.employee_birthdate).format('L')}</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Birth Place:</h2>
                              <p>{empData.employee_birth_place}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Age:</h2>
                              <p>20</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Sex:</h2>
                              <p>Female</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Weight:</h2>
                              <p>25.5g</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Height:</h2>
                              <p>100g</p>
                          </div>
                        </div>
                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Civil Status:</h2>
                              <p></p>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Single</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Married</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Separated</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Window(er)</h2>
                          </div>
                         
                        </div>
                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Name of Spouse:</h2>
                              <p>{empData.employee_name_of_spouse}</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Date of Birth:</h2>
                              <p>{moment(empData.employee_date_birth).format('L')}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Spouse Employed?</h2>
                              <div className='flex gap-1'>
                                <p>____</p>
                                <h2 className=' font-bold'>Yes</h2>
                              </div>
                              <div className='flex gap-1'>
                                <p>___</p>
                                <h2 className=' font-bold'>No</h2>
                              </div>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Name of Company:</h2>
                              <p>{empData.employee_company}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Father's Name:</h2>
                              <p>__</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Mother's Name:</h2>
                              <p>___</p>
                          </div>
                        </div>


                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Name:</h2>
                            <p>{empData.employee_name}</p>
                        </div>
                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Current Address:</h2>
                            <p>{empData.employee_address}</p>
                        </div>
                        <div className='flex gap-1 mt-1'>
                            <h2 className=' font-bold'>Provincial Address:</h2>
                            <p>{empData.employee_provincial_address || "_________________________________________"}</p>
                        </div>
                        <div className='flex  gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Birth Date:</h2>
                              <p>{moment(empData.employee_birthdate).format('L')}</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Birth Place:</h2>
                              <p>{empData.employee_birth_place}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Age:</h2>
                              <p>20</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Sex:</h2>
                              <p>Female</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Weight:</h2>
                              <p>25.5g</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Height:</h2>
                              <p>100g</p>
                          </div>
                        </div>
                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Civil Status:</h2>
                              <p></p>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Single</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Married</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Separated</h2>
                          </div>
                          <div className='flex gap-1'>
                              <p>__</p>
                              <h2 className=' font-bold'>Window(er)</h2>
                          </div>
                         
                        </div>
                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Name of Spouse:</h2>
                              <p>{empData.employee_name_of_spouse}</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Date of Birth:</h2>
                              <p>{moment(empData.employee_date_birth).format('L')}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Spouse Employed?</h2>
                              <div className='flex gap-1'>
                                <p>____</p>
                                <h2 className=' font-bold'>Yes</h2>
                              </div>
                              <div className='flex gap-1'>
                                <p>___</p>
                                <h2 className=' font-bold'>No</h2>
                              </div>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Name of Company:</h2>
                              <p>{empData.employee_company}</p>
                          </div>
                        </div>

                        <div className='flex gap-10 mt-1'>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Father's Name:</h2>
                              <p>__</p>
                          </div>
                          <div className='flex gap-1'>
                              <h2 className=' font-bold'>Mother's Name:</h2>
                              <p>___</p>
                          </div>
                        </div>


                       
                     </div>
            </div>
     
    </div> 
    </>
    
  )
}

export default UserDetails