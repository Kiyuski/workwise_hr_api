<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePayrollRequest;
use App\Http\Requests\UpdatePayrollRequest;


class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        
        $results = Payroll::select(
        "payrolls.*", 
        "p.position", 
        "de.department", 
        "em.employee_name",
        "em.employee_id", 
        "em.employee_image",
        "em.employee_email",
        "em.employee_role",
        "payrolls.id as compe_id", 
        "em.id as emp_id",
        "ps.id as payslip_id", 
        "rs.rates_account_num", 
        "rs.rates_acount_name")
        ->leftJoin('employees as em', 'payrolls.employee_id', '=', 'em.id')
        ->leftJoin('rates as rs', 'em.id', '=', 'rs.employee_id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->leftJoin('payslips as ps', 'payrolls.id', '=', 'ps.payroll_id')
        ->orderBy("payrolls.created_at", 'desc')
        ->get();

        foreach ($results as $dt) {
            $dt->employee_image = $dt->employee_image ? \URL::to($dt->employee_image) : null;
        };

        
    
        return response()->json($results, 200);



    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayrollRequest $request)
    {
        //
        $datas = $request->validated();
        Payroll::create($datas);
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

        $result = Payroll::select(
        "payrolls.*", 
        "p.position", 
        "de.department", 
        "em.employee_name",
        "em.employee_id", 
        "em.employee_email",
        "em.employee_role",
        "payrolls.id as compe_id", 
        "em.id as emp_id",
        "ps.id as payslip_id", 
        "rs.rates_account_num", 
        "rs.rates_acount_name")
        ->leftJoin('employees as em', 'payrolls.employee_id', '=', 'em.id')
        ->leftJoin('rates as rs', 'em.id', '=', 'rs.employee_id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->leftJoin('payslips as ps', 'payrolls.id', '=', 'ps.payroll_id')
        ->where("payrolls.id", $id)
        ->first();
    
        if ($result) {
            return response()->json([
                'data' => $result,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Payrolls record not found.',
            ], 404);
        }



    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayrollRequest $request, String $id)
    {
        //
        $data = $request->validated();
        $payroll = Payroll::find($id);
        

        if (!$payroll) {
            return response()->json([
                'message' => 'Payroll not found',
            ], 404);
        }

        $payroll->update($data);
        

        return response()->json([
            'message' => 'Payroll is updated successfully',
            'payroll' => $payroll,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        //
    }
}
