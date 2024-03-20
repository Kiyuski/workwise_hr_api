<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Employee $employee)
    {
        return $emp_id = IdGenerator::generate(['table' => 'employees', 'length' => 12, 'prefix' =>'ONSOURCE-']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $empArray = $request->_employeeData;
        foreach ($empArray as $data) {

            return $data['employee_email'];
            Employee::create([
                'id' => IdGenerator::generate(['table' => 'employees', 'length' => 12, 'prefix' =>'ONSOURCE-']),
                'employee_name' => $data['employee_name'],
                'employee_email' => $data['employee_email'],
                'employee_phone' => $data['employee_phone'],
                'employee_address' => $data['employee_address'],
                'employee_gender' => $data['employee_gender'],
                'employee_role' => $data['employee_role'],
                'employee_status' => $data['employee_status'],
                'department_id' => $data['department_id'],
                'position_id' => $data['position_id'],
            ]);
        }

        return response()->json([
            "message" => "Product request is successfully send!"
        ], 200);
        // $base64Image = $data['employee_image'];
        // $image = $base64Image;
        // if (strpos($base64Image, 'data:image/') === 0) {
        //     $imageInfo = explode(";base64,", $base64Image);
        //     $imgExt = str_replace('data:image/', '', $imageInfo[0]);
        //     $image = $imageInfo[1]; // Use $imageInfo[1] to get the base64 image data
        //     $name = \Str::random(40) . '.' . $imgExt; 
          
        //     $dir = 'image/';
        //     $absolutePath = public_path($dir);
        //     $relativePath = $dir . $name;
        //     if(!\File::exists($absolutePath)){
        //         \File::makeDirectory($absolutePath, 0755, true); 
        //     }

        //     \file_put_contents($relativePath, base64_decode($image));

        //     Employee::create([
        //         'id' => IdGenerator::generate(['table' => 'employees', 'length' => 12, 'prefix' =>'ONSOURCE-']),
        //         'employee_name' => $data['employee_name'],
        //         'employee_email' => $data['employee_email'],
        //         'employee_phone' => $data['employee_phone'],
        //         'employee_address' => $data['employee_address'],
        //         'employee_gender' => $data['employee_gender'],
        //         'employee_role' => $data['employee_role'],
        //         'employee_image' => $relativePath,
        //         'employee_status' => $data['employee_status'],
        //         'department_id' => $data['department_id'],
        //         'position_id' => $data['position_id'],
        //     ]);

        //     return response()->json([
        //     'message' => 'Employee is created successfully',
        //         'error' => $data
        //     ], 200);

        //     return "Employee is created successfully"; 

            // File::delete(public_path("/"));
        // } else {
        //     return null;
        // }


    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
