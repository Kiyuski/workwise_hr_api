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
     
        return AttendanceResource::collection(Attendance::orderBy('created_at')->get());
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
 
        $attendance->update([
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

    public function allEmployeeAttendance()
    {
        // Get all employees with their attendance
       return 'hello';
    }

}
