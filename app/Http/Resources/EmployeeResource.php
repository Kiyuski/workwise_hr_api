<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
                'id' => $this->id,
                'employee_id' => $this->employee_id,
                'employee_name' => $this->employee_name,
                'employee_email' =>  $this->employee_email,
                'employee_phone' => $this->employee_phone,
                'employee_address' => $this->employee_address,
                'employee_gender' => $this->employee_gender,
                'employee_role' => $this->employee_role,
                'employee_image' =>  $this->employee_image ? \URL::to($this->employee_image) : null,
                'employee_status' => $this->employee_status,
                'department_id' => $this->department_id,
                'position_id' => $this->position_id,
                'employee_start_date' => $this->employee_start_date,
                'employee_end_date' => $this->employee_end_date,
                'created_at' => $this->created_at,
        ];
    }
}
