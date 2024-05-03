<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(){
        $this->merge([
            "user_id" => $this->user()->id
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|string|exists:employees,id',
            'attendance_date' => 'required|string|date',
            'attendance_field' => 'required|string',
            'attendance_time_in' => 'required|date|date_format:Y-m-d H:i:s',
            'attendance_remarks' => 'nullable|string',
            'attendance_time_out' => 'required|date|date_format:Y-m-d H:i:s|after:attendance_time_in'
        ];
        
    }
}
