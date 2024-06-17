<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRatesRequest extends FormRequest
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
            'rates_account_num' => 'nullable|string|max:255',
            'rates_acount_name' => 'nullable|string|max:255',
            'rates_night_diff' => 'nullable|between:0,9999999.99',
            'rates_allowance' => 'nullable|between:0,9999999.99',
            'rates_basic_salary' => 'nullable|between:0,9999999.99',
            'rates_thirteenth_pay' => 'nullable|between:0,9999999.99',
            'rates_review_adjustments' => 'nullable',
        ];
    }
}
