<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        "employee_name",
        "employee_email",
        "employee_phone",
        "employee_address",
        "employee_gender",
        "employee_role",
        "employee_image",
        "employee_status",
        "department_id",
        "position_id"
    ];

   
}
