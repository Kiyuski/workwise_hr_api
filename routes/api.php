<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\GithubAuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\NotificationController;


Route::middleware('auth:sanctum')->group(function () {
 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('position', PositionController::class);
    Route::apiResource('department', DepartmentController::class);
    Route::apiResource('employee', EmployeeController::class);
    Route::apiResource('holiday', HolidayController::class);
    Route::apiResource('leave_type', LeaveTypeController::class);
    Route::apiResource('notification', NotificationController::class);


    Route::get('/leave/employee/{id}', [LeaveController::class, 'allEmployeeLeave']);
    
    Route::apiResource('leave', LeaveController::class)->names([
        'index' => 'leave.index',
        'store' => 'leave.store',
        'show' => 'leave.show',
        'update' => 'leave.update',
        'destroy' => 'leave.destroy',
    ]);
    


    Route::get('/attendance/employee/{id}', [AttendanceController::class, 'allEmployeeAttendance']);


    Route::apiResource('attendance', AttendanceController::class)->names([
        'index' => 'attendance.index',
        'store' => 'attendance.store',
        'show' => 'attendance.show',
        'update' => 'attendance.update',
        'destroy' => 'attendance.destroy',
    ]);
    
    
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
