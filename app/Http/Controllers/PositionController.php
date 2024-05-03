<?php

namespace App\Http\Controllers;
use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Http\Resources\PositionResource;


class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        return PositionResource::collection(Position::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePositionRequest $request)
    {
        //

        $data = $request->validated();
        $position = Position::create($data);

        return response()->json([
            'message' => 'Position is created successfully',
            'error' => $data
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return new PositionResource(Position::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePositionRequest $request, string $id)
    {
        $data = $request->validated();
        
        $position = Position::find($id);

        if (!$position) {
            return response()->json([
                'message' => 'Position not found',
            ], 404);
        }

        $position->update([
            'position' => $data['position'], 
        ]);


        return response()->json([
            'message' => 'Position updated successfully',
            'position' => $position,
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $position = Position::find($id);

        if(!$position){
            return response()->json([
                "message" => "Position not found",
            ], 401);
        }

        $position->delete();
        return response()->json([
            'message' => 'Position deleted successfully'
        ], 200);
    }
}
