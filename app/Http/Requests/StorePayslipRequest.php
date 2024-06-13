<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePayslipRequest extends FormRequest
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
        return [
            'earnings_per_month' => 'nullable|numeric',
            'earnings_allowance' => 'nullable|numeric',
            'earnings_night_diff' => 'nullable|numeric',
            'earnings_holiday' => 'nullable|numeric',
            'earnings_retro' => 'nullable|numeric',
            'earnings_commission' => 'nullable|numeric',
            'deductions_lwop' => 'nullable|numeric',
            'deductions_holding_tax' => 'nullable|numeric',
            'deductions_sss_contribution' => 'nullable|numeric',
            'deductions_phic_contribution' => 'nullable|numeric',
            'deductions_hmo' => 'nullable|numeric',
            'deductions_sss_loan' => 'nullable|numeric',
            'deductions_hmo_loan' => 'nullable|numeric',
            'deductions_employee_loan' => 'nullable|numeric',
            'deductions_others' => 'nullable|numeric',
            'deductions_hdmf_contribution' => 'nullable|numeric',
            'earnings_total' => 'nullable|numeric',
            'deductions_total' => 'nullable|numeric',
            'payslip_netPay' => 'nullable|numeric',
            'pay_period_begin' => 'required|date',
            'pay_period_end' => 'required|date|after:pay_period_begin',
            'employee_id' => 'required'
        ];
    }
}
