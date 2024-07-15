<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePayrollRequest extends FormRequest
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
            'comp_account_num' => 'nullable|string',
            'comp_acount_name' => 'nullable|string',
            'comp_bi_monthly' => 'nullable',
            'comp_per_hour_day' => 'nullable',
            'comp_night_diff' => 'nullable',
            'comp_holiday_or_ot' => 'nullable',
            'comp_comission' => 'nullable',
            'comp_number_of_mins' => 'nullable',
            'comp_number_of_days' => 'nullable',
            'comp_mins' => 'nullable',
            'comp_days' => 'nullable',
            'comp_sss' => 'nullable',
            'comp_phic' => 'nullable',
            'comp_hdmf' => 'nullable',
            'comp_withholding' => 'nullable',
            'comp_sss_loan' => 'nullable',
            'comp_hdmf_loan' => 'nullable|numeric',
            'comp_hmo_loan' => 'nullable|numeric',

       
            'comp_ar_others' => 'nullable|numeric',
            'comp_retro_others' => 'nullable|numeric',
            
            'comp_allowance' => 'nullable',
            'comp_pay_roll_dates' => 'date',
            'comp_pay_roll_dates_begin' => 'date',
            'comp_pay_roll_dates_end' => 'date|after:comp_pay_roll_dates_begin',
            'rates_id' => 'nullable',
            'action' => 'string'
        ];

    }
}
