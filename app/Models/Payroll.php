<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'comp_bi_monthly',
        'comp_per_hour_day',
        'comp_night_diff',
        'comp_holiday_or_ot',
        'comp_comission',
        'comp_number_of_mins',
        'comp_number_of_days',
        'comp_mins',
        'comp_days',
        'comp_sss',
        'comp_phic',
        'comp_hdmf',
        'comp_withholding',
        'comp_sss_loan',
        'comp_hdmf_loan',
        'comp_hdmf_mp',

        'comp_ar',
        'comp_other_deduction',
        'comp_loans_deduction',
        'comp_retro',
        'comp_others_additional',

        'comp_allowance',
        'comp_account_num',
        'comp_acount_name',
        'comp_pay_roll_dates',
        'comp_pay_roll_dates_begin',
        'comp_pay_roll_dates_end',
    ];
}
