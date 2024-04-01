<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use App\Http\Resources\EmployeeResource;



class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EmployeeResource::collection(Employee::orderBy('id', 'desc')->get());
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        //
   
        $datas = $request->validated();
        return $this->storeEmployee($request, $datas);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new EmployeeResource(Employee::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, string $id)
    {
        //
       
     
        $data = $request->validated();
    
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'message' => 'Employee not found',
            ], 404);
        }

        switch ($request->action) {
            case 'Employee':
                return $this->updateEmployee($data, $employee);
            break;
            case 'Employee_update_data':
                return $this->update_Employee_info($request, $employee);
            break;
            
            default:
                return null;
            break;
        }

        
 
    }

    
    
    private function updateEmployee($data, $employee){
        $base64Image = $data['employee_image'] ?? null;
        $image = $base64Image;
        
       if (strpos($base64Image, 'data:image/') === 0) {
       
           if (isset($employee['employee_image']) && is_string($employee['employee_image']) && \File::exists(public_path($employee['employee_image']))) {
               \File::delete(public_path($employee['employee_image']));
           }
           
          
           $imageInfo = explode(";base64,", $base64Image);
           $imgExt = str_replace('data:image/', '', $imageInfo[0]);
           $image = $imageInfo[1]; 
           $name = \Str::random(40) . '.' . $imgExt; 
         
           $dir = 'image/';
           $absolutePath = public_path($dir);
           $relativePath = $dir . $name;
           if(!\File::exists($absolutePath)){
               \File::makeDirectory($absolutePath, 0755, true); 
           }

           \file_put_contents($relativePath, base64_decode($image));

           $data["employee_image"] = $relativePath;
          
           $employee->update($data);

           return response()->json([
           'message' => 'Employee is updated successfully',
           ], 200);

         
          
       } else {

         
           $emp = $employee->update($data);

           return response()->json([
               'message' => 'Employee updated successfully',
               'employee' => $emp,
           ], 200);
       }


    }

    private function storeEmployee($request, $datas) {

      
        if($request->has('_employeeData')){

            foreach ($datas["_employeeData"] as $data) {
                
                Employee::create([
                    'id' => IdGenerator::generate(['table' => 'employees', 'length' => 12, 'prefix' =>'ONSOURCE-']),
                    "employee_id" => $data["employee_id"],
                    'employee_name' => $data['employee_name'],
                    'employee_email' => $data['employee_email'],
                    'employee_phone' => $data['employee_contact'],
                    'employee_address' => $data['employee_address'],
                    'employee_gender' => $data['employee_gender'],
                    'employee_role' => $data['employee_role'],
                    'employee_status' => $data['employee_status'],
                    'department_id' => $data['department_id'],
                    'position_id' => $data['position_id'],
                    'employee_start_date' => $data['employee_start_date'],
                    'employee_end_date' => $data['employee_end_date']
                ]);
            }

            return response()->json([
                "message" => "Product request is successfully send!"
            ], 200);
        }

 
        $base64Image = $datas['employee_image'];
        $image = $base64Image;
        if (strpos($base64Image, 'data:image/') === 0) {
            $imageInfo = explode(";base64,", $base64Image);
            $imgExt = str_replace('data:image/', '', $imageInfo[0]);
            $image = $imageInfo[1]; // Use $imageInfo[1] to get the base64 image data
            $name = \Str::random(40) . '.' . $imgExt; 
          
            $dir = 'image/';
            $absolutePath = public_path($dir);
            $relativePath = $dir . $name;

     
            if(!\File::exists($absolutePath)){
                \File::makeDirectory($absolutePath, 0755, true); 
            }

            \file_put_contents($relativePath, base64_decode($image));

            Employee::create([
                'id' => IdGenerator::generate(['table' => 'employees', 'length' => 12, 'prefix' =>'ONSOURCE-']),
                'employee_id' => $datas['employee_id'],
                'employee_name' => $datas['employee_name'],
                'employee_email' => $datas['employee_email'],
                'employee_phone' => $datas['employee_phone'],
                'employee_address' => $datas['employee_address'],
                'employee_gender' => $datas['employee_gender'],
                'employee_role' => $datas['employee_role'],
                'employee_image' => $relativePath,
                'employee_status' => $datas['employee_status'],
                'department_id' => $datas['department_id'],
                'position_id' => $datas['position_id'],
                'employee_start_date' => $datas['employee_start_date'],
                'employee_end_date' => $datas['employee_end_date']
            ]);

            return response()->json([
            'message' => 'Employee is created successfully',
            ], 200);

     
        } else {
            return null;
        }
    }

    private function update_Employee_info($request, $employee){
       
        $base64Image = $request->employee_image ?? null;
        $image = $base64Image;

        if (strpos($base64Image, 'data:image/') === 0) {
       
            if (isset($employee['employee_image']) && is_string($employee['employee_image']) && \File::exists(public_path($employee['employee_image']))) {
                \File::delete(public_path($employee['employee_image']));
            }
            
           
            $imageInfo = explode(";base64,", $base64Image);
            $imgExt = str_replace('data:image/', '', $imageInfo[0]);
            $image = $imageInfo[1]; 
            $name = \Str::random(40) . '.' . $imgExt; 
          
            $dir = 'image/';
            $absolutePath = public_path($dir);
            $relativePath = $dir . $name;
            if(!\File::exists($absolutePath)){
                \File::makeDirectory($absolutePath, 0755, true); 
            }
         
      
            \file_put_contents($relativePath, base64_decode($image));
        
            $request['employee_image'] = $relativePath;

            $employee->update($request->except('action', 'data', 'employee_case_emergency', 'employee_dependent', 'employee_history', 'employee_reference'));

            return response()->json([
               'message' => 'Employee updated successfully',
                'employee' => $employee,
            ], 200);
 
          
           
        } else {
           
            $emp = $employee->update($request->except(
                'action', 
                'data', 
                'employee_case_emergency', 
                'employee_dependent', 
                'employee_history', 
                'employee_reference',
                'employee_image'
            ));
 
            return response()->json([
                'message' => 'Employee updated successfully',
                'employee' => $emp,
            ], 200);
        }
 

      
    

    }

   

  

  

    
}
