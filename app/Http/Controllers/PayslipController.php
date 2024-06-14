<?php

namespace App\Http\Controllers;

use App\Models\Payslip;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePayslipRequest;
use App\Http\Requests\UpdatePayslipRequest;

class PayslipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayslipRequest $request)
    {
        //
        
        $datas = $request->validated();
        Payslip::create($datas);
        return response()->json([
        'message' => 'Payslip for employee is created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        //
     
        $result = Payslip::select("payslips.*", "p.position", "de.department", "em.*", "payslips.id as pay_id", "em.id as emp_id", "pr.comp_per_hour_day")
        ->leftJoin('payrolls as pr', 'payslips.payroll_id', '=', 'pr.id')
        ->leftJoin('employees as em', 'pr.employee_id', '=', 'em.id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->where("payslips.payroll_id", $id)
        ->first();

        return response()->json($result, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayslipRequest $request, string $id)
    {
        //
        $data = $request->validated();

   
        
        $payslip = Payslip::find($id);
        

        if (!$payslip) {
            return response()->json([
                'message' => 'Payslip not found',
            ], 404);
        }

        $payslip->update($data);

        return response()->json([
            'message' => 'Payslip updated successfully',
            'position' => $payslip,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payslip $payslip)
    {
        //
    }
}
