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
        //
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->nullable();
            $table->foreign('employee_id')->references('id')->on('employees');
            $table->string('employee_approval_role')->nullable();
            $table->string('employee_approval_id')->nullable();
            $table->foreign('employee_approval_id')->references('id')->on('employees');
            $table->foreignId('leave_type_id')->references('id')->on('leave_types');
            $table->foreignId('department_id')->references('id')->on('departments');
            $table->string("leave_apply_date");
            $table->string("leave_start_date");
            $table->string("leave_end_date");
            $table->longText("leave_reason");
            $table->datetime("leave_status_date_time")->nullable();
            $table->string("leave_status");
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('leaves');
    }
};
