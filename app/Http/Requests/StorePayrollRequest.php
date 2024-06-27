<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePayrollRequest extends FormRequest
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
            'employee_id' => 'required|string',
            'comp_bi_monthly' => 'nullable|numeric',
            'comp_per_hour_day' => 'nullable|numeric',
            'comp_night_diff' => 'nullable|numeric',
            'comp_holiday_or_ot' => 'nullable|numeric',
            'comp_comission' => 'nullable|numeric',
            'comp_number_of_mins' => 'nullable|numeric',
            'comp_number_of_days' => 'nullable|numeric',
            'comp_mins' => 'nullable|numeric',
            'comp_days' => 'nullable|numeric',
            'comp_sss' => 'nullable|numeric',
            'comp_phic' => 'nullable|numeric',
            'comp_hdmf' => 'nullable|numeric',
            'comp_withholding' => 'nullable|numeric',
            'comp_sss_loan' => 'nullable|numeric',
            'comp_hdmf_loan' => 'nullable|numeric',
            'comp_hdmf_mp' => 'nullable|numeric',

            'comp_ar' => 'nullable|numeric',
            'comp_other_deduction' => 'nullable|numeric',
            'comp_loans_deduction' => 'nullable|numeric',
            'comp_retro' => 'nullable|numeric',
            'comp_others_additional' => 'nullable|numeric',
            
            'comp_allowance' => 'nullable|numeric',
            'comp_account_num' => 'nullable|string',
            'comp_acount_name' => 'nullable|string',
            'comp_pay_roll_dates' => 'date|required',
            'comp_pay_roll_dates_begin' => 'date|required',
            'comp_pay_roll_dates_end' => 'date|required|after:comp_pay_roll_dates_begin'
        ];

    }
}
