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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();

            $table->string('employee_id');
            $table->foreign('employee_id')->references('id')->on('employees');
           
            $table->float('comp_bi_monthly', 10, 2)->nullable();
            $table->float('comp_per_hour_day', 10, 2)->nullable();
            $table->float('comp_night_diff', 10, 2)->nullable();
            $table->float('comp_holiday_or_ot', 10, 2)->nullable();
            $table->float('comp_comission', 10, 2)->nullable();
            $table->float('comp_number_of_mins', 10, 2)->nullable();
            $table->float('comp_number_of_days', 10, 2)->nullable();
            $table->float('comp_mins', 10, 2)->nullable();
            $table->float('comp_days', 10, 2)->nullable();
            $table->float('comp_sss', 10, 2)->nullable();
            $table->float('comp_phic', 10, 2)->nullable();
            $table->float('comp_hdmf', 10, 2)->nullable();
            $table->float('comp_withholding', 10, 2)->nullable();
            $table->float('comp_sss_loan', 10, 2)->nullable();
            $table->float('comp_hdmf_loan', 10, 2)->nullable();
            $table->float('comp_hdmf_mp', 10, 2)->nullable();

            $table->float('comp_ar', 10, 2)->nullable();
            $table->float('comp_other_deduction', 10, 2)->nullable();
            $table->float('comp_loans_deduction', 10, 2)->nullable();
            $table->float('comp_retro', 10, 2)->nullable();
            $table->float('comp_others_additional', 10, 2)->nullable();

            $table->float('comp_allowance', 10, 2)->nullable();
            $table->date('comp_pay_roll_dates')->nullable();
            $table->date('comp_pay_roll_dates_begin')->nullable();
            $table->date('comp_pay_roll_dates_end')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
