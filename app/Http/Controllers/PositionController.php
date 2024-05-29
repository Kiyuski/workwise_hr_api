<?php

namespace App\Http\Controllers;
use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Http\Resources\PositionResource;
use Illuminate\Support\Facades\DB;


class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $searchKeyword = request()->input('search');

        $results = DB::table(DB::raw("
            (
                SELECT
                    p.id,
                    p.position,
                    p.created_at,
                    COUNT(m.employee_name) OVER(PARTITION BY p.id) AS Total_employee_with_this_position,
                    ROW_NUMBER() OVER(PARTITION BY p.id ORDER BY p.created_at DESC) AS rw
                FROM positions AS p
                LEFT JOIN employees AS m ON p.id = m.position_id
            ) AS sb
        "))
        ->select('sb.id', 'sb.position', 'sb.Total_employee_with_this_position', 'sb.created_at')
        ->where('sb.rw', 1)
        ->when($searchKeyword, function ($query) use ($searchKeyword) {
            return $query->where('sb.position', 'like', '%' . $searchKeyword . '%');
        })
        ->orderByDesc('sb.created_at');

        if(request()->has('all')){
            return PositionResource::collection($results->get());
        }

   
        $results = $results->paginate(10)->appends(['search' => $searchKeyword]);

        return PositionResource::collection($results);

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
            'message' => 'Company position is created successfully',
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
    public function destroy(Request $request)
    {
        $data = $request->all();
   

        $count = Position::query()
        ->select(
            DB::raw('count(*) as exist')
        )
        ->from('positions as p')
        ->rightJoin('employees as em', 'p.id', '=' , 'em.position_id')
        ->whereIn('p.id', $data)
        ->first();

        
        if($count->exist > 0){
            return response()->json([
                "message" => "For some positions you choose already have employees you can't delete it."
            ], 422);
        }

        $deleted = Position::destroy($data);

        if ($deleted === 0) {
            return response()->json([
                'message' => 'No positions found to delete'
            ], 404);
        }
        
        // Return a response after positions are deleted
        return response()->json([
            'message' => 'Positions deleted successfully'
        ], 200);
        

    }
}
