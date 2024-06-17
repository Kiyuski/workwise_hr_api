<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRatesRequest extends FormRequest
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
            'employee_id' => 'required|exists:employees,id',
            'rates_account_num' => 'nullable|string|max:255',
            'rates_acount_name' => 'nullable|string|max:255',
            'rates_night_diff' => 'nullable|numeric|between:0,9999999.99',
            'rates_allowance' => 'nullable|numeric|between:0,9999999.99',
            'rates_basic_salary' => 'nullable|numeric|between:0,9999999.99',
            'rates_thirteenth_pay' => 'nullable|numeric|between:0,9999999.99',
            'rates_review_adjustments' => 'required|date',
        ];
    }
}
