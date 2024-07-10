<?php

namespace App\Http\Controllers;

use App\Models\Rates;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRatesRequest;
use App\Http\Requests\UpdateRatesRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class RatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $dates_begin = $request['dates_begin'];
        $dates_end = $request['dates_end'];
 
       if(!empty($dates_begin) && !empty($dates_end)){

        $results = Rates::select(
            'rates.*',
            'p.position',
            'de.department',
            'rates.id AS compe_id',
            'em.id AS emp_id',
            'em.employee_name',
            'em.employee_image',
            'em.employee_email',
            'em.employee_role',
            'pr.id AS payroll_id',
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
            'pr.comp_ar',
            'pr.comp_other_deduction',
            'pr.comp_loans_deduction',
            'pr.comp_retro',
            'pr.comp_others_additional',
            'pr.comp_allowance',
            'pr.comp_pay_roll_dates',
            'ps.id AS payslip_id',
            'ps.pay_period_begin',
            'ps.pay_period_end',
            'pr.comp_pay_roll_dates_begin',
            'pr.comp_pay_roll_dates_end'
        )
        ->leftJoin('employees as em', 'rates.employee_id', '=', 'em.id')
        ->leftJoin('payrolls as pr', 'em.id', '=', 'pr.employee_id')
        ->leftJoin('payslips as ps', 'pr.id', '=', 'ps.payroll_id')
        ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
        ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
        ->where('pr.comp_pay_roll_dates_begin', '=', $dates_begin)
        ->where('pr.comp_pay_roll_dates_end', '=', $dates_end)
        ->get();

            return response()->json($results, 200);
       }

     
    $query = DB::table('rates')
    ->select(
        'rates.*',
        'p.position',
        'de.department',
        'rates.id as compe_id',
        'em.id as emp_id',
        'em.employee_name',
        'em.employee_image',
        'em.employee_email',
        'em.employee_role',
        'pr.id as payroll_id',
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
        'pr.comp_ar',
        'pr.comp_other_deduction',
        'pr.comp_loans_deduction',
        'pr.comp_retro',
        'pr.comp_others_additional',
        'pr.comp_allowance',
        'pr.comp_pay_roll_dates',
        'ps.id as payslip_id',
        'ps.pay_period_begin',
        'ps.pay_period_end',
        'pr.comp_pay_roll_dates_begin',
        'pr.comp_pay_roll_dates_end'
    )
    ->leftJoin('employees as em', 'rates.employee_id', '=', 'em.id')
    ->leftJoin('payrolls as pr', 'em.id', '=', 'pr.employee_id')
    ->leftJoin('payslips as ps', 'pr.id', '=', 'ps.payroll_id')
    ->leftJoin('positions as p', 'em.position_id', '=', 'p.id')
    ->leftJoin('departments as de', 'em.department_id', '=', 'de.id');

// Define the subquery with ROW_NUMBER() using DB::raw()
        $subQuery = DB::table(DB::raw("
        (SELECT 
            rates.*, 
            p.position, 
            de.department, 
            rates.id AS compe_id, 
            em.id AS emp_id,
            em.employee_name,
            em.employee_image,
            em.employee_email,
            em.employee_role,
            pr.id AS payroll_id,
            pr.comp_bi_monthly,
            pr.comp_per_hour_day,
            pr.comp_night_diff,
            pr.comp_holiday_or_ot,
            pr.comp_comission,
            pr.comp_number_of_mins,
            pr.comp_number_of_days,
            pr.comp_mins,
            pr.comp_days,
            pr.comp_sss,
            pr.comp_phic,
            pr.comp_hdmf,
            pr.comp_withholding,
            pr.comp_sss_loan,
            pr.comp_hdmf_loan,
            pr.comp_hdmf_mp,
            pr.comp_ar,
            pr.comp_other_deduction,
            pr.comp_loans_deduction,
            pr.comp_retro,
            pr.comp_others_additional,
            pr.comp_allowance,
            pr.comp_pay_roll_dates,
            ps.id AS payslip_id,
            ps.pay_period_begin,
            ps.pay_period_end,
            pr.comp_pay_roll_dates_begin,
            pr.comp_pay_roll_dates_end,
            ROW_NUMBER() OVER(PARTITION BY em.employee_id ORDER BY pr.comp_pay_roll_dates_begin DESC) AS RowNum
        FROM 
            rates
        LEFT JOIN 
            employees AS em ON rates.employee_id = em.id
        LEFT JOIN 
            payrolls AS pr ON em.id = pr.employee_id
        LEFT JOIN 
            payslips AS ps ON pr.id = ps.payroll_id
        LEFT JOIN 
            positions AS p ON em.position_id = p.id
        LEFT JOIN 
            departments AS de ON em.department_id = de.id
        ) AS AllData
        "));

        // Use the subquery in the main query
        $results = DB::table(DB::raw("({$subQuery->toSql()}) as RankedData"))
        ->mergeBindings($subQuery) // Ensure bindings are passed
        ->where('RowNum', 1) // Filter to get rows where RowNum = 1
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
