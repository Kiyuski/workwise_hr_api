<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePayrollApprovedRequest;
use App\Http\Requests\UpdatePayrollApprovedRequest;
use App\Models\PayrollApproved;

class PayrollApprovedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayrollApprovedRequest $request)
    {
        //
    
        $datas = $request->validated();
        PayrollApproved::create($datas);
        return response()->json([
        'message' => 'Payroll Approved successfully',
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(PayrollApproved $payrollApproved)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayrollApprovedRequest $request, PayrollApproved $payrollApproved)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PayrollApproved $payrollApproved)
    {
        //
    }
}
