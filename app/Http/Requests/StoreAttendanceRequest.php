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
            'user_id' => 'numeric|exists:users,id',
            'attendance_date' => 'required|date|string|unique:attendances,attendance_date',
            'attendance_field' => 'required|string',
            'attendance_time_in' => 'required|string',
            'attendance_time_out' => 'required|string|after:attendance_time_in'
        ];
    }
}
