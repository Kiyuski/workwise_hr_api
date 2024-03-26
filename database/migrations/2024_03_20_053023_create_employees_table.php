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
        Schema::create('employees', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('department_id')->references('id')->on('departments');
            $table->foreignId('position_id')->references('id')->on('positions');
            $table->string("employee_id");
            $table->string("employee_name");
            $table->string("employee_email");
            $table->string("employee_phone");
            $table->string("employee_address");
            $table->string("employee_gender");
            $table->string("employee_role");
            $table->string("employee_status");
            $table->string("employee_image")->nullable();
            $table->string("employee_sss")->nullable();
            $table->string("employee_philhealth")->nullable();
            $table->string("employee_tin")->nullable();
            $table->string("employee_provincial_address")->nullable();
            $table->string("employee_birthdate")->nullable();
            $table->string("employee_date_birth")->nullable();
            $table->string("employee_birth_place")->nullable();
            $table->string("employee_civil_status")->nullable();
            $table->string("employee_spouse")->nullable();
            $table->string("employee_name_of_spouse")->nullable();
            $table->string("employee_company")->nullable();
            $table->string("employee_father")->nullable();
            $table->string("employee_mother")->nullable();
            $table->json('employee_dependents')->nullable();
            $table->json('employee_educational_background')->nullable();
            $table->json('employee_employment_history')->nullable();
            $table->json('employee_character_reference')->nullable();
            $table->json('employee_person_to_notify')->nullable();
            $table->string("employee_reason_for_leaving")->nullable();
            $table->string("employee_start_date")->nullable();
            $table->string("employee_end_date")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
