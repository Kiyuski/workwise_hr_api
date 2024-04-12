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
        $rules = [];

       
        if($this->has('employee_image')){
            $rules = [
                'employee_id' => 'string|required',
                'employee_name' => 'string|max:255|required',
                'employee_email' => 'string|max:255|required|email|unique:employees,employee_email',
                'employee_phone' => 'numeric|required',
                'employee_address' => 'string|max:255|required',
                'employee_gender' => 'string|max:255|required',
                'employee_role' => 'required|max:255|string',
                'employee_image' => 'string|nullable',
                'employee_status' => 'string|required',
                'department_id' => 'numeric|required',
                'position_id' => 'numeric|required',
                'employee_start_date' => 'string|nullable|required',
                'employee_end_date' => 'string|nullable',
            ];

        }elseif($this->has('type')){

            $rules = [
                'employee_id' => 'string|required',
                'employee_name' => 'string|max:255|required',
                'employee_email' => 'string|max:255|required|email|unique:employees,employee_email',
                'employee_role' => 'required|max:255|string',
                'employee_status' => 'string|required',
                'employee_start_date' => 'string|nullable|required',
            ];
        }else{

            $rules =  ['_employeeData' => 'array|required'];
        };


        
        return $rules;

        
    }
}
