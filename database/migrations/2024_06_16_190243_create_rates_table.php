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
        Schema::create('rates', function (Blueprint $table) {
            $table->id();
            
            $table->string('employee_id');
            $table->foreign('employee_id')->references('id')->on('employees');

            $table->string('rates_account_num')->nullable();
            $table->string('rates_acount_name')->nullable();
            $table->float('rates_night_diff', 10, 2)->nullable();
            $table->float('rates_allowance', 10, 2)->nullable();
            $table->float('rates_basic_salary', 10, 2)->nullable();
            $table->float('rates_thirteenth_pay', 10, 2)->nullable();
            $table->date('rates_review_adjustments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rates');
    }
};
