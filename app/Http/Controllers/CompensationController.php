<?php

namespace App\Http\Controllers;

use App\Models\Compensation;
use App\Http\Requests\StoreCompensationRequest;
use App\Http\Requests\UpdateCompensationRequest;
use App\Http\Resources\ComensationResource;

class CompensationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $results = Compensation::select("compensation.*", "p.position", "de.department", "em.*", "compensation.id as compe_id", "em.id as emp_id")
        ->leftJoin('employees as em', 'compensation.employee_id', '=', 'em.id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->orderBy("compensation.created_at", 'desc')
        ->get();

        foreach ($results as $dt) {
            $dt->employee_image = $dt->employee_image ? \URL::to($dt->employee_image) : null;
        };
    
         return response()->json($results, 200);

       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompensationRequest $request)
    {
        //
        $datas = $request->validated();
        Compensation::create($datas);
        return response()->json([
        'message' => 'Payroll for employee is created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $result = Compensation::select("compensation.*", "p.position", "de.department", "em.*", "compensation.id as compe_id", "em.id as emp_id")
        ->leftJoin('employees as em', 'compensation.employee_id', '=', 'em.id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->where("compensation.id", $id)
        ->first();
    
        if ($result) {
            return response()->json([
                'data' => $result,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Compensation record not found.',
            ], 404);
        }
    

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompensationRequest $request, Compensation $compensation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Compensation $compensation)
    {
        //
    }
}
