<?php

namespace App\Http\Controllers;

use App\Models\Leave_type;
use App\Http\Requests\StoreLeave_typeRequest;
use App\Http\Requests\UpdateLeave_typeRequest;
use Illuminate\Support\Facades\DB;

class LeaveTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Leave_type::query()->orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeave_typeRequest $request)
    {
        //
        
        Leave_type::create($request->validated());

        return response()->json([
            'message' => 'Leave type is created successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return response()->json([
            'data' => Leave_type::find($id)
        ] , 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeave_typeRequest $request, string $id)
    {
        
        $data = $request->validated();
        
        $leave_type = Leave_type::find($id);

        if (!$leave_type) {
            return response()->json([
                'message' => 'Leave type not found',
            ], 404);
        }

    
        $leave_type->update($data);

        return response()->json([
            'message' => 'Leave type is updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $leave_type = Leave_type::find($id);

       $count = Leave_type::query()
        ->select(
            DB::raw('count(*) as exist')
        )
        ->from('leave_types as s')
        ->rightJoin('leaves as l', 'l.leave_type_id', '=' , 's.id')
        ->where('s.id', $leave_type->id)
        ->first();

        if($count->exist > 0){
            return response()->json([
                "message" => "Leave type is already use you can't deleted it",
            ], 422);
        }
        
        if(!$leave_type){
            return response()->json([
                "message" => "Leave type not found",
            ], 422);
        }

        $leave_type->delete();
        return response()->json([
            'message' => 'Leave type item deleted successfully'
        ], 200);
    }
}
