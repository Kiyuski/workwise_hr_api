<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
            //
            'employee_name' => 'string|max:255|required',
            'employee_email' => 'string|max:255|required|email|unique:users,email',
            'employee_phone' => 'numeric|required',
            'employee_address' => 'string|max:255',
            'employee_gender' => 'string|max:255',
            'employee_role' => 'required|max:255|string',
            // 'employee_image' => 'string',
            'employee_status' => 'string|required',
            'department_id' => 'numeric|required',
            'position_id' => 'numeric|required',
        ];
    }
}
