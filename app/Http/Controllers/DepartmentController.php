<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DepartmentResource::collection(Department::orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        //
        
        $data = $request->validated();
        Department::create($data);

        return response()->json([
            'message' => 'Department is created successfully',
            'error' => $data
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return new DepartmentResource(Department::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, string $id)
    {
        //
        $data = $request->validated();
        
        $department = Department::find($id);


        if (!$department) {
            return response()->json([
                'message' => 'Position not found',
            ], 404);
        }

        $department->update([
            'department' => $data['department'], 
        ]);


        return response()->json([
            'message' => 'Department updated successfully',
            'department' => $department,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $department = Department::find($id);

        if(!$department){
            return response()->json([
                "message" => "Position not found",
            ], 401);
        }

        $department->delete();
        return response()->json([
            'message' => 'Department deleted successfully'
        ], 200);
    }
}
