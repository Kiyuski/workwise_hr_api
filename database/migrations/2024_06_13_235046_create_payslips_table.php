<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payslips', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payroll_id')->nullable();
            $table->foreign('payroll_id')->references('id')->on('payrolls');

            $table->float('earnings_per_month', 10, 2)->nullable();
            $table->float('earnings_allowance', 10, 2)->nullable();
            $table->float('earnings_night_diff', 10, 2)->nullable();
            $table->float('earnings_holiday', 10, 2)->nullable();
            $table->float('earnings_retro', 10, 2)->nullable();
            $table->float('earnings_commission', 10, 2)->nullable();

            $table->float('deductions_lwop', 10, 2)->nullable();
            $table->float('deductions_holding_tax', 10, 2)->nullable();
            $table->float('deductions_sss_contribution', 10, 2)->nullable();
            $table->float('deductions_phic_contribution', 10, 2)->nullable();
            $table->float('deductions_hdmf_contribution', 10, 2)->nullable();
            $table->float('deductions_hmo_loan', 10, 2)->nullable();
            $table->float('deductions_sss_loan', 10, 2)->nullable();
            $table->float('deductions_hdmf_loan', 10, 2)->nullable();
 
            $table->float('deductions_ar_others', 10, 2)->nullable();
     
            $table->float('earnings_total', 10, 2)->nullable();
            $table->float('deductions_total', 10, 2)->nullable();
            $table->float('payslip_netPay', 10, 2)->nullable();

            $table->date('pay_period_begin')->nullable();
            $table->date('pay_period_end')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payslips');
    }
};
