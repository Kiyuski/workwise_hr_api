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
        Schema::create('employee_personal_informations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->nullable();
            $table->string("name")->nullable();
            $table->string("sss_id")->nullable();
            $table->string("philhealth_id")->nullable();
            $table->string("tin_id")->nullable();
            $table->string("provincial_address")->nullable();
            $table->string("birthdate")->nullable();
            $table->string("birthplace")->nullable();
            $table->string("civil_status")->nullable();
            $table->string("spouse_employed")->nullable();
            $table->string("name_spouse")->nullable();
            $table->string("date_of_birth")->nullable();
            $table->string("company")->nullable();
            $table->string("fathers_name")->nullable();
            $table->string("mothers_name")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_personal_informations');
    }
};
