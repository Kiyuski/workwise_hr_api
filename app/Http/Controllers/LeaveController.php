<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Leave;
use App\Models\User;
use App\Http\Requests\StoreLeaveRequest;
use App\Http\Requests\UpdateLeaveRequest;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $department_head = $request->employee_id;
     
        switch ($request->input('type')) {
            case 'leave_history':
                $data = DB::select("
                WITH DepartmentHeads AS (
                    SELECT
                        MAX(m.employee_set_head) AS employee_set_head,
                        m.department_id,
                        MAX(m.employee_name) AS department_head_name
                    FROM
                        employees m
                    WHERE
                        m.employee_set_head = 1
                    GROUP BY
                        m.department_id
                )

                SELECT
                    em.employee_id,
                    em.employee_name,
                    de.department,
                    p.position,
                    lt.leave_type,
                    l.leave_status_date_time,
                    CONCAT(p1.position, '-', dh.department_head_name) AS department_head,
                    l.leave_status
                FROM
                    leaves l
                LEFT JOIN
                    employees em ON l.employee_id = em.id
                LEFT JOIN
                    leave_types lt ON l.leave_type_id = lt.id
                LEFT JOIN
                    departments de ON l.department_id = de.id
                LEFT JOIN
                    positions p ON em.position_id = p.id
                LEFT JOIN
                    DepartmentHeads dh ON dh.department_id = de.id
                LEFT JOIN
                    positions p1 ON em.position_id = p1.id
                ORDER BY em.id desc
            ");

            break;
            case 'department_request':
                $data = Leave::query()->select(
                    'departments.id AS department_id',
                    'employees.employee_id as employee_id',
                    'leaves.id AS leave_id',
                    'departments.department',
                    'employees.employee_name AS employee_name',
                    'leave_types.leave_type AS leave_type',
                    'leaves.leave_apply_date',
                    'leaves.leave_start_date',
                    'leaves.leave_end_date',
                    'leaves.leave_status',
                    'leaves.created_at',
                    'jn.id as employee_head_id',
                )
                ->leftJoin('leave_types', 'leaves.leave_type_id', '=', 'leave_types.id')
                ->join('employees', 'leaves.employee_id', '=', 'employees.id')
                ->join('departments', 'employees.department_id', '=', 'departments.id')
                ->join('employees as jn', function($join) use($department_head) {
                    $join->on('jn.department_id', '=', 'departments.id')
                        ->where('jn.id', '=', $department_head);
                })->get();
            break;
            case 'single':
                $data = Leave::query()->select(
                    'l.id as leave_id',
                    'lt.leave_type as leave_type',
                    'l.leave_apply_date',
                    'l.leave_start_date',
                    'l.updated_at',
                    'l.leave_end_date',
                    'l.leave_status',
                    'l.created_at'
                )
                ->from('leaves as l')
                ->leftJoin('leave_types as lt', 'l.leave_type_id', '=' , 'lt.id')
                ->where("l.employee_id", "=", $request->employee_id)
                ->get();
            break;
            case 'all':
                $data = Leave::query()->select(
                    'emp.employee_id as employee_id',
                    'emp.employee_name as employee_name',
                    'l.id as leave_id',
                    'lt.leave_type as leave_type',
                    'l.leave_apply_date',
                    'l.leave_start_date',
                    'l.leave_end_date',
                    'l.leave_status',
                    'l.created_at'
                )
                ->from('leaves as l')
                ->leftJoin('leave_types as lt', 'l.leave_type_id', '=' , 'lt.id')
                ->join('employees as emp', 'l.employee_id', '=' , 'emp.id')
                ->where("emp.id", "<>", $request->employee_id)
                ->get();
            break;
            
            default:
            break;
        }
   


         return response()->json([
            'data' => $data,
        ], 200);
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveRequest $request)
    {
        //
  
            $datas = $request->validated();
            
            $leave = Leave::where(function($query) use ($datas){
                $query->where('leave_type_id', $datas['leave_type_id'])
                ->where('employee_id', $datas['employee_id'])
                ->where('leave_apply_date', $datas['leave_apply_date'])
                ->where('leave_start_date', $datas['leave_start_date'])
                ->where('leave_end_date', $datas['leave_end_date']);
            })->first();

            if($leave) {
                return response()->json([
                    'message' => 'Leave is already created please create it again',
                    ], 422);
            }
            Leave::create($datas);

            return response()->json([
            'message' => 'Leave is created successfully',
            ], 200);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
      
        
        $leaves = DB::table('leaves as l')
        ->select(
        'em.employee_image',
        'em.employee_name',
        'l.id',
        'l.employee_id',
        'l.leave_type_id',        
        DB::raw('(SELECT CONCAT(de.department, " - ", em.employee_name) 
                  FROM departments de 
                  LEFT JOIN employees em ON em.department_id = de.id 
                  WHERE de.id = '.$request->input("data").' AND em.employee_set_head = 1) AS department_head'),
        DB::raw('(SELECT de.id 
        FROM departments de 
        LEFT JOIN employees em ON em.department_id = de.id 
        WHERE de.id = '.$request->input("data").' AND em.employee_set_head = 1) AS department_id'),         
        'l.leave_apply_date',
        'l.leave_start_date',
        'l.leave_end_date',
        'l.leave_reason',
        'l.leave_status'
        )
        ->leftJoin('leave_types as ty', 'l.leave_type_id', '=', 'ty.id')
        ->leftJoin('employees as em', 'l.employee_id', '=', 'em.id')
        ->where("l.id", "=", $id)
        ->first();


        if (!$leaves) {
            return response()->json([
               'message' => 'Leave is not found',
            ], 404);
        };

        $leaves->employee_image = $leaves->employee_image ?  \URL::to($leaves->employee_image) : null;

        return response()->json([
            'data' => $leaves
        ], 200);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaveRequest $request, string $id)
    {
        //
        $data = $request->validated();

        
        $leave = Leave::find($id);

  
        if (!$leave) {
            return response()->json([
                'message' => 'Leave is not found',
            ], 404);
        }

       
        $leave->update($data);


        return response()->json([
            'message' => 'Leave is updated successfully',
            'leave' => $leave,
            'now' => now()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $leave = Leave::find($id);

         if(!$leave){
             return response()->json([
                 "message" => "Leave type not found",
             ], 422);
         }
 
         $leave->delete();
         return response()->json([
             'message' => 'Leave item deleted successfully'
         ], 200);
    }


   
}
