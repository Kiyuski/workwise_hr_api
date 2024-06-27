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
        $results = Rates::select(
        "rates.*", 
        "p.position", 
        "de.department", 
        "rates.id as compe_id", 
        "em.id as emp_id",
        'em.employee_name',
        'em.employee_id',
        'em.employee_image',
        'em.employee_email',
        'em.employee_role',
        "pr.id as payroll_id",
        'pr.comp_bi_monthly',
        'pr.comp_per_hour_day',
        'pr.comp_night_diff',
        'pr.comp_holiday_or_ot',
        'pr.comp_comission',
        'pr.comp_number_of_mins',
        'pr.comp_number_of_days',
        'pr.comp_mins',
        'pr.comp_days',
        'pr.comp_sss',
        'pr.comp_phic',
        'pr.comp_hdmf',
        'pr.comp_withholding',
        'pr.comp_sss_loan',
        'pr.comp_hdmf_loan',
        'pr.comp_hdmf_mp',
        'comp_ar',
        'comp_other_deduction',
        'comp_loans_deduction',
        'comp_retro',
        'comp_others_additional',
        'pr.comp_allowance',
        'pr.comp_pay_roll_dates',

        "ps.id as payslip_id",
        "ps.pay_period_begin",
        "ps.pay_period_end",
        
        'pr.comp_pay_roll_dates_begin',
        'pr.comp_pay_roll_dates_end'
        )
        ->leftJoin('employees as em', 'rates.employee_id', '=', 'em.id')
        ->leftJoin('payrolls as pr', 'em.id' ,'=', 'pr.employee_id')
        ->leftJoin('payslips as ps', 'pr.id', '=', 'ps.payroll_id')
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
