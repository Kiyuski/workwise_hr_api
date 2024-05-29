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

        if($this->has('type')){
            $rules = [
                'employee_id' => 'required',
                'employee_name' => 'max:255|required',
                'employee_email' => 'max:255|email|unique:employees,employee_email',
                'employee_role' => 'required|max:255',
                'employee_status' => 'required',
                'employee_image' => 'nullable',
                'employee_start_date' => 'nullable|required',
            ];
        }elseif($this->has("_employeeData")){
            $rules =  ['_employeeData' => 'array|required'];
        }else{
            $rules = [
                'employee_id' => 'required',
                'employee_name' => 'max:255',
                'employee_email' => 'max:255|email|unique:employees,employee_email',
                'employee_phone' => 'numeric|nullable',
                'employee_address' => 'max:255|required',
                'employee_gender' => 'max:255|required',
                'employee_role' => 'required|max:255|string',
                'employee_image' => 'string|nullable',
                'employee_status' => 'string|required',
                'department_id' => 'required',
                'position_id' => 'required',
                'employee_start_date' => 'string|nullable|required',
                'employee_end_date' => 'string|nullable',
            ];
           
        };


        
        return $rules;

        
    }
}
