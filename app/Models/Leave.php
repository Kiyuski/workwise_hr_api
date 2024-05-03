<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        "department_id",
        "employee_id",
        "leave_type_id",
        "leave_start_date",
        "leave_end_date",
        "leave_status",
        "leave_apply_date",
        "leave_reason",
        "leave_signature_image",
        "leave_status",
        "leave_status_date_time",
        "employee_approval_role",
        "employee_approval_id"
    ];
}
