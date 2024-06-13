<?php

namespace App\Http\Controllers;

use App\Payslip;
use App\Http\Requests\StorePayslipRequest;
use App\Http\Requests\UpdatePayslipRequest;
use Illuminate\Http\Request;
class PayslipController extends Controller
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
    public function store(StorePayslipRequest $request)
    {
        //
        $datas = $request->validated();
        Payslip::create($datas);
        return response()->json([
        'message' => 'Payslip for employee is created successfully!',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payslip $payslip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayslipRequest $request, Payslip $payslip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payslip $payslip)
    {
        //
    }
}
