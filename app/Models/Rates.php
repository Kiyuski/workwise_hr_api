<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rates extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'rates_account_num',
        'rates_acount_name',
        'rates_night_diff',
        'rates_allowance',
        'rates_basic_salary',
        'rates_thirteenth_pay',
        'rates_review_adjustments',
    ];
}
