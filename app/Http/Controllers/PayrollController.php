<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePayrollRequest;
use App\Http\Requests\UpdatePayrollRequest;
use Illuminate\Support\Facades\DB;


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

        switch ($data['action']) {
            case 'update_existing_payroll':
                try {
                DB::table('rates as rt')
                ->join('employees as em', 'rt.employee_id', '=', 'em.id')
                ->join('payrolls as pr', 'pr.employee_id', '=', 'em.id')
                ->where('rt.id', $data['rates_id'])
                ->where('pr.id', $id)
                ->update([
                    'pr.comp_per_hour_day' => $data['comp_per_hour_day'],
                    'pr.comp_bi_monthly' => $data['comp_bi_monthly'],
                    'pr.comp_allowance' => $data['comp_allowance'],
                    'pr.comp_night_diff' => $data['comp_night_diff'],
                    'pr.comp_holiday_or_ot' => $data['comp_holiday_or_ot'],

                    'pr.comp_ar' => $data['comp_ar'],
                    'pr.comp_other_deduction' => $data['comp_other_deduction'],
                    'pr.comp_loans_deduction' => $data['comp_loans_deduction'],
                    'pr.comp_retro' => $data['comp_retro'],
                    'pr.comp_others_additional' => $data['comp_others_additional'],

                    'pr.comp_comission' => $data['comp_comission'],
                    'pr.comp_withholding' => $data['comp_withholding'],
                    'pr.comp_sss' => $data['comp_sss'],
                    'pr.comp_phic' => $data['comp_phic'],
                    'pr.comp_sss_loan' => $data['comp_sss_loan'],
                    'pr.comp_hdmf_loan' => $data['comp_hdmf_loan'],
                    'pr.comp_hdmf_mp' => $data['comp_hdmf_mp'],
                    'rt.rates_night_diff' => $data['comp_night_diff'] * 2,
                    'rt.rates_allowance' => $data['comp_allowance'] * 2,
                    'rt.rates_basic_salary' => $data['comp_bi_monthly'] * 2,
                ]);

                    return response()->json([
                        'message' => 'Payroll is updated successfully',
                    ], 200);

                } catch (\Throwable $e) {
                    return response()->json([
                        'error' => 'Failed to update payroll: ' . $e->getMessage(),
                    ], 500);
                }

            break;
            default:
                return null;
            break;
        }

   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        //
    }
}
