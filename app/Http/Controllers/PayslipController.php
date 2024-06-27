<?php

namespace App\Http\Controllers;

use App\Models\Payslip;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePayslipRequest;
use App\Http\Requests\UpdatePayslipRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PayslipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $results = Payslip::select(
        "payslips.*", 
        "p.position", 
        "de.department", 
        "em.employee_name",
        "em.employee_id", 
        "em.employee_image",
        "em.employee_email",
        "em.employee_role",
        "em.id as emp_id",
        'pr.id as compe_id',
        "rs.rates_account_num", 
        "rs.rates_acount_name"
        )
        ->leftJoin('payrolls as pr', 'pr.id', '=', 'payslips.payroll_id')
        ->leftJoin('employees as em', 'pr.employee_id', '=', 'em.id')
        ->leftJoin('rates as rs', 'em.id', '=', 'rs.employee_id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->orderBy("payslips.created_at", 'desc')
        ->get();

        foreach ($results as $dt) {
            $dt->employee_image = $dt->employee_image ? \URL::to($dt->employee_image) : null;
        };

        
    
        return response()->json($results, 200);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayslipRequest $request)
    {
        //

      

                // // Validation rules
                // $rules = [
                //     'payslipData.*.payroll_id' => 'unique:employees,employee_id',
                // ];
            
                // // Validation messages
                // $messages = [
                //     '_employeeData.*.employee_id.unique' => 'employee id has already been taken',
                //     '_employeeData.*.employee_id.required' => 'employee id is required',
                //     '_employeeData.*.department_id.required' => 'department field is required',
                //     '_employeeData.*.position_id.required' => 'position field is required',
                // ];
            
                // // Validate the request data
                // $validator = Validator::make($datas, $rules, $messages);
            
                // // Check if validation fails
                // if ($validator->fails()) {
                //     return response()->json(['errors' => $validator->errors()], 422);
                // }
    
            
            foreach ($request->payslipData as $data) {
                Payslip::create([
                    "payroll_id" => $data["payroll_id"],
                    'earnings_per_month' => $data['earnings_per_month'],
                    'earnings_allowance' => $data['earnings_allowance'],
                    'earnings_night_diff' => $data['earnings_night_diff'],
                    'earnings_holiday' => $data['earnings_holiday'],
                    'earnings_retro' => $data['earnings_retro'],
                    'earnings_commission' => $data['earnings_commission'],
                    'deductions_lwop' => $data['deductions_lwop'],
                    'deductions_holding_tax' => $data['deductions_holding_tax'],
                    'deductions_sss_contribution' => $data['deductions_sss_contribution'],
                    'deductions_phic_contribution' => $data['deductions_phic_contribution'],
                    "deductions_hdmf_contribution" => $data["deductions_hdmf_contribution"],
                    'deductions_hmo' => $data['deductions_hmo'],
                    'deductions_sss_loan' => $data['deductions_sss_loan'],
                    'deductions_hmo_loan' => $data['deductions_hmo_loan'],
                    'deductions_employee_loan' => $data['deductions_employee_loan'],
                    'deductions_others' => $data['deductions_others'],
                    'earnings_total' => $data['earnings_total'],
                    'deductions_total' => $data['deductions_total'],
                    'payslip_netPay' => $data['payslip_netPay'],
                    'pay_period_begin' => $data['pay_period_begin'],
                    'pay_period_end' => $data['pay_period_end']
                ]);
    
    
            }

      

    
 
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
      
        DB::table('payslips as ps')
        ->join('payrolls as pr', 'pr.id', '=', 'ps.payroll_id')
        ->where('ps.id', $id)
        ->update([
            'pr.comp_per_hour_day' => $data['earnings_per_day_hour'],
            'pr.comp_bi_monthly' => $data['earnings_per_month'],
            'pr.comp_allowance' => $data['earnings_allowance'],
            'pr.comp_night_diff' => $data['earnings_night_diff'],
            'pr.comp_holiday_or_ot' => $data['earnings_holiday'],
            'pr.comp_retro' => $data['earnings_retro'],
            'pr.comp_comission' => $data['earnings_commission'],
            'pr.comp_withholding' => $data['deductions_holding_tax'],
            'pr.comp_sss' => $data['deductions_sss_contribution'],
            'pr.comp_phic' => $data['deductions_phic_contribution'],
            'pr.comp_sss_loan' => $data['deductions_sss_loan'],
            'pr.comp_hdmf' => $data['deductions_hdmf_contribution'],
            'ps.earnings_per_month' => $data['earnings_per_month'],
            'ps.earnings_allowance' => $data['earnings_allowance'],
            'ps.earnings_night_diff' => $data['earnings_night_diff'],
            'ps.earnings_holiday' => $data['earnings_holiday'],
            'ps.earnings_retro' => $data['earnings_retro'],
            'ps.earnings_commission' => $data['earnings_commission'],
            'ps.deductions_hmo' => $data['deductions_hmo'],
            'ps.deductions_hmo_loan' => $data['deductions_hmo_loan'],
            'ps.deductions_others' => $data['deductions_others'],
            'ps.deductions_employee_loan' => $data['deductions_employee_loan'],
            'ps.deductions_holding_tax' => $data['deductions_holding_tax'],
            'ps.deductions_sss_contribution' => $data['deductions_sss_contribution'],
            'ps.deductions_phic_contribution' =>$data['deductions_phic_contribution'],
            'ps.deductions_sss_loan' => $data['deductions_sss_loan'],
            'ps.deductions_lwop' => $data['deductions_lwop'],
            'ps.pay_period_begin' => $data['pay_period_begin'],
            'pay_period_end' => $data['pay_period_end'],
            'ps.deductions_hdmf_contribution' => $data['deductions_hdmf_contribution']
        ]);

   
        return response()->json([
            'message' => 'Payslip updated successfully',
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
