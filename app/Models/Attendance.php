<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'employee_id',
        'attendance_date',
        'attendance_field',
        'attendance_time_in',
        'attendance_time_out',
    ];
}
