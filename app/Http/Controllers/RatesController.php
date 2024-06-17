<?php

namespace App\Http\Controllers;

use App\Models\Rates;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRatesRequest;
use App\Http\Requests\UpdateRatesRequest;

class RatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $results = Rates::select("rates.*", "p.position", "de.department", "em.*", "rates.id as compe_id", "em.id as emp_id")
        ->leftJoin('employees as em', 'rates.employee_id', '=', 'em.id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->get();

        return response()->json($results, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRatesRequest $request)
    {
        //
        $datas = $request->validated();
        Rates::create($datas);
        return response()->json([
        'message' => 'Employee rate data is created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        //
        $result = Rates::select("rates.*", "p.position", "de.department", "em.*", "rates.id as compe_id", "em.id as emp_id")
        ->leftJoin('employees as em', 'rates.employee_id', '=', 'em.id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->where("rates.id", $id)
        ->first();
    
        if ($result) {
            return response()->json([
                'data' => $result,
            ], 200);
        } else {
            return response()->json([
                'message' => 'rates record not found.',
            ], 404);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRatesRequest $request, String $id)
    {
        //
        $data = $request->validated();
        $rates = Rates::find($id);


        if (!$rates) {
            return response()->json([
                'message' => 'rates not found',
            ], 404);
        }

        $rates->update($data);
        
        return response()->json([
            'message' => 'Employee rate is updated successfully',
            'rates' => $rates,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rates $rates)
    {
        //
    }
}
