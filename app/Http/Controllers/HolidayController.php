<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use App\Http\Requests\StoreHolidayRequest;
use App\Http\Requests\UpdateHolidayRequest;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Holiday::query()->orderBy('created_at', 'desc')->get();
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHolidayRequest $request)
    {
        //
       
        Holiday::create($request->validated());

        return response()->json([
            'message' => 'Holiday is created successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return response()->json([
            'data' => Holiday::find($id)
        ] , 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHolidayRequest $request, string $id)
    {
        //
     
        $data = $request->validated();
        
        $holiday = Holiday::find($id);

        if (!$holiday) {
            return response()->json([
                'message' => 'Holiday not found',
            ], 404);
        }

    
        $holiday->update($data);

        return response()->json([
            'message' => 'Holiday is updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $holiday = Holiday::find($id);

        if(!$holiday){
            return response()->json([
                "message" => "Holiday not found",
            ], 401);
        }

        $holiday->delete();
        return response()->json([
            'message' => 'Holiday deleted successfully'
        ], 200);
    }
}
