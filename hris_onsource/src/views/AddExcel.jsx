import React, { useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx/xlsx.mjs';
import axiosClient from '../axiosClient';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
function AddExcel() {
  const xlRef = useRef(null);
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [_UIemployeeData, _setUIemployeeData] = useState([]);
  const [_employeeData, _setemployeeData] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["xls", "xlsx"];
    const extension = selectedFile.name.split(".").pop().toLowerCase();
  
    if (allowedExtensions.indexOf(extension) === -1) {
      setFile(null);
      xlRef.current.value = "";
      alert("Only Excel files (xls, xlsx) are allowed.");
   
      return;
    }

    setFile(selectedFile);
  };
  

  const handleUploadToDatabase = () => {
  
   axiosClient.post('/employee', {
      _employeeData,
      action: "Employee"
  }).then(()=>{
      _setUIemployeeData("");
      _setemployeeData("");
      alert("File is added to Database succesfully!");
      Navigate("/employees")
  })
   
  };

  const parseExcelFile = () => {

    if(!file){
      alert("Please add excel file.");
      return;
    }
    var Data = [];
    var empData = [];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const [headers, ...rows] = excelData;
      const parsedData = rows.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index]])));
      
      const calcDate = (inputDate) => {
         const excelStartDate = new Date('1899-12-30');
         const daysSinceExcelStart = parseInt(inputDate, 10);
         return moment(new Date(excelStartDate.getTime() + (daysSinceExcelStart * 24 * 60 * 60 * 1000))).format('MM/DD/YYYY') || null;
      }
      

   
      parsedData.map(data => {
       
         Data.push({
            employee_name: data.Employee,
            employee_address: data.Address,
            employee_contact: data.Contact,
            employee_email: data.Email,
            employee_role: data.Role,
            employee_gender: data.Gender,
            department_id: department.find(d => d.department.toLowerCase() === data.Department.toLowerCase()).id || null,
            position_id: position.find(d => d.position.toLowerCase() === data.Position.toLowerCase()).position_id || null,
            employee_status: calcDate(data.End_date) === "Invalid date" ? "Active" : "Inactive",
            employee_id: data.Employee_id,
            employee_start_date: calcDate(data.Start_date) === "Invalid date" ? null : calcDate(data.Start_date),
            employee_end_date: calcDate(data.End_date) === "Invalid date" ? null : calcDate(data.End_date)
         })

          

         empData.push({
          employee: data.Employee,
          email: data.Email,
          address: data.Address,
          contact: data.Contact,
          role: data.Role,
          gender: data.Gender,
          startDate: calcDate(data.Start_date) === "Invalid date" ? null : calcDate(data.Start_date),
          endDate:calcDate(data.End_date) === "Invalid date" ? null : calcDate(data.End_date),
          department: data.Department,
          position: data.Position,
          status: data.End_date ? "Inactive" : "Active",
       })

     });

     _setUIemployeeData(empData);
     _setemployeeData(Data);
     xlRef.current.value = "";
    };
    reader.readAsArrayBuffer(file);
  }; 


    useEffect(()=>{
      Promise.all([getDataList('position'), getDataList('department')])
        .then((data) => {
            setPosition(data[0].data);
            setDepartment(data[1].data);
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
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-5">
       
                     <div className="mb-4 flex items-center justify-between">
                        <div className="flex-shrink-0 flex justify-center items-center gap-3" >
                        <input ref={xlRef}  type="file" onChange={handleFileChange} className=" opacity-85 file-input file-input-md w-full max-w-xs file-input-success file:text-white text-gray-400" />
                        <button type='button' onClick={parseExcelFile} className="btn btn-success text-white opacity-85">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                          </svg>
                        </button>
                        </div>

                        <button type='button' onClick={handleUploadToDatabase} className="btn btn-success text-white opacity-85">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                          </svg>
                        </button>
                      
                     </div>
             
                     <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                           <div className="align-middle inline-block min-w-full">
                              <div className="shadow overflow-hidden sm:rounded-lg">
                                 <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                       <tr>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMPLOYEE NAME
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             EMAIL
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             ADDRESS
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             CONTACT #
                                          </th>
                                           <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             GENDER
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             DEPARTMENT
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             POSITION
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             START-DATE
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             END-DATE
                                          </th>
                                          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Remarks
                                          </th>
                                       </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {!_UIemployeeData?.length && (
                                        <tr>
                                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900" colSpan="4">
                                            No data available.
                                          </td>
                                        </tr>
                                    )}
                                    {_UIemployeeData?.map((emp, i)=>{
                                          return (
                                            <tr key={i.toString()}>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 capitalize">
                                               {emp.employee}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                               {emp.email}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                               {emp.address}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                               {emp.contact}
                                            </td>
                                             <td className="p-4 whitespace-nowrap text-sm  text-gray-500 ">
                                               {emp.gender === "M" ? "Male" : "Female"}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm  text-gray-500 font-bold">
                                               {emp.department}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                               {emp.position}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                               {emp.startDate}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                               {emp.endDate}
                                            </td>
                                            <td className={`p-4 whitespace-nowrap text-sm ${emp.status === "Inactive" ? "text-red-700" : "text-blue-700"}  font-bold`}>
                                             {emp.status}
                                            </td>
                                           
                                         </tr>
                                          );
                                         })}
                                      
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
        </div>

    
      </div> 
  )
}

export default AddExcel