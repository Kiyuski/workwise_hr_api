<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayrollApproved extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'payroll_start_date',
        'payroll_end_date',
        'payroll_pay_date',
        'payroll_status'
    ];
}
