<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePayslipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
     
            //

            return [
         
                'earnings_per_day_hour' => 'nullable',
                'earnings_per_month' => 'nullable',
                'earnings_allowance' => 'nullable',
                'earnings_night_diff' => 'nullable',
                'earnings_holiday' => 'nullable',
                'earnings_retro' => 'nullable',
                'earnings_commission' => 'nullable',
                'deductions_lwop' => 'nullable',
                'deductions_holding_tax' => 'nullable',
                'deductions_sss_contribution' => 'nullable',
                'deductions_phic_contribution' => 'nullable',
                'deductions_hmo' => 'nullable',
                'deductions_sss_loan' => 'nullable',
                'deductions_hmo_loan' => 'nullable',
                'deductions_employee_loan' => 'nullable',
                'deductions_others' => 'nullable',
                'deductions_hdmf_contribution' => 'nullable',
                'earnings_total' => 'nullable',
                'deductions_total' => 'nullable',
                'payslip_netPay' => 'nullable',
                'pay_period_begin' => 'date',
                'pay_period_end' => 'date|after:pay_period_begin',
                
            ];
          
        
    }
}
