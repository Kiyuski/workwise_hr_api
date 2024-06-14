<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payslip extends Model
{
    use HasFactory;

    protected $fillable = [
        'payroll_id', 
        'earnings_per_month',
        'earnings_allowance',
        'earnings_night_diff',
        'earnings_holiday',
        'earnings_retro',
        'earnings_commission',
        'deductions_lwop',
        'deductions_holding_tax',
        'deductions_sss_contribution',
        'deductions_phic_contribution',
        'deductions_hmo',
        'deductions_sss_loan',
        'deductions_hmo_loan',
        'deductions_employee_loan',
        'deductions_others',
        'deductions_hdmf_contribution',
        'earnings_total',
        'deductions_total',
        'payslip_netPay',
        'pay_period_begin',
        'pay_period_end',
    
    ];
}
