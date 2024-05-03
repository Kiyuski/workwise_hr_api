<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Http\Resources\AttendanceResource;
use Illuminate\Http\Request;


class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  
    public function index(Request $request)
    {
        //
        
        return AttendanceResource::collection(Attendance::orderBy('id')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        //
         
        $data = $request->validated();
        Attendance::create($data);
        return response()->json([
           'message' => 'Attendance is created successfully',
            'error' => $data
        ], 200);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, string $id)
    {
        //
        $data = $request->validated(); 
     
        $attendance = Attendance::find($id);
       

        if (!$attendance) {
            return response()->json([
                'message' => 'Attendance not found',
            ], 404);
        }

       
        if($request->has('type')){
            $attendance->update($data);

            return response()->json([
                'message' => 'Your attendance is updated successfully',
                'attendance' => $attendance,
            ], 200);
        }
 

        $attendance->update([
            'attendance_remarks' => $data['attendance_remarks'],
            'attendance_time_out' => implode("+", explode(' ', $data['attendance_time_out'])), 
        ]);


        return response()->json([
            'message' => 'Attendance updated successfully',
            'attendance' => $attendance,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    public function allEmployeeAttendance(string $id)
    {
       
        $attendance = Attendance::select(
            'employees.employee_name as employee_name',
            'attendances.attendance_time_in as attendance_time_in',
            'attendances.attendance_time_out as attendance_time_out',
            'attendances.attendance_field as attendance_field',
            'attendances.attendance_date as attendance_date',
            'attendances.attendance_remarks as attendance_remarks'
        )
        ->join('employees', 'attendances.employee_id', '=', 'employees.id')
        ->where('attendances.employee_id', '<>' , $id)
        ->get();
    

       return $attendance;
    }


}
