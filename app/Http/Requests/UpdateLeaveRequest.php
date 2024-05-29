<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaveRequest extends FormRequest
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
            "department_id" => 'numeric',
            "employee_id" => 'string',
            "leave_type_id" => 'unique:leaves,leave_type_id,NULL,id,employee_id,' . request('employee_id') . ',leave_start_date,' . request('leave_start_date'),
            "leave_start_date" => 'string|after:leave_apply_date|unique:leaves,leave_start_date,NULL,id,employee_id,' . request('employee_id') . ',leave_end_date,' . request('leave_end_date'),
            "leave_end_date" => 'after:leave_start_date',
            "leave_status" => 'string',
            "leave_apply_date" => 'required',
            "leave_reason" => 'string',
            "leave_status" => 'string',
            "leave_status_date_time" => 'date|date_format:Y-m-d H:i:s'
        ];
    }
}
