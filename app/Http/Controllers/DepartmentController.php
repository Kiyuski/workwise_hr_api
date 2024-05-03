<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {  
      
        $id = $request->input('data');

        $forFilterButton = DB::table(DB::raw('(SELECT
            de.id as id,
            de.department as department,
            RANK() OVER(PARTITION BY de.department ORDER BY emp.employee_set_head DESC) AS rowss
            FROM departments AS de
            LEFT JOIN employees AS emp ON de.id = emp.department_id
            LEFT JOIN positions as p on emp.position_id = p.id
            ) AS e'))
            ->where('e.rowss', '<', 2)
            ->groupBy('e.department')
            ->orderBy('e.id', 'desc')
            ->get();
       

        $queryData = DB::table(function ($query) use ($id) {

            $joins = $query->from('departments as de')
            ->leftJoin('employees as em', 'de.id', '=', 'em.department_id')
            ->leftJoin('positions as p', 'em.position_id', '=', 'p.id');

            if ($id === "ALL") {
                $query->select(
                    'de.id as id',
                    'de.department as department',
                    DB::raw('CASE WHEN em.employee_set_head = 1 THEN em.id ELSE "NO ID" END AS employee_id'),
                    DB::raw('CASE WHEN em.employee_set_head = 1 THEN CONCAT(p.position, " - ", em.employee_name) 
                        WHEN em.employee_set_head = 0 THEN "CHOOSE DEPARTMENT HEAD" 
                        ELSE "NO EMPLOYEE\'S" END AS employees'),
                    DB::raw('CASE WHEN em.employee_set_head = 1 THEN "DEPARTMENT HEAD" 
                        WHEN em.employee_set_head = 0 THEN "HAS EMPLOYEE" 
                        ELSE "NO EMPLOYEE\'S" END AS remarks'),
                    DB::raw('RANK() OVER(PARTITION BY de.department ORDER BY em.employee_set_head DESC) AS rowss')
                )
                ->mergeBindings($joins);
            } else{
                $query->select(
                    'de.id as id',
                    'de.department as department',
                    DB::raw('CASE WHEN em.id is not null THEN em.id 
                        WHEN em.id is null THEN "NO EMPLOYEE\'S"
                        ELSE "HAS EMPLOYEE" END AS employee_id'),
                    DB::raw('CASE WHEN em.employee_name is not null THEN CONCAT(p.position, " - ", em.employee_name) 
                        ELSE "NO EMPLOYEE\'S" END AS employees'),
                    DB::raw('CASE WHEN em.employee_set_head = 1 THEN "DEPARTMENT HEAD" 
                        WHEN em.employee_set_head = 0 THEN "EMPLOYEE"
                        ELSE "NO EMPLOYEE\'S" END AS remarks'),
                    DB::raw('RANK() OVER(PARTITION BY de.department ORDER BY em.employee_set_head DESC) AS rowss')
                )
                ->mergeBindings($joins)
                ->where('de.id', '=', $id);
            }
        }, 'e')
        ->where(function ($query) use ($id) {
            if ($id === 'ALL') {
                $query->whereRaw('e.rowss < 2');
            }
        })
        ->when($id === "ALL", function ($query) {
            $query->groupBy('e.department');
        })
        ->orderBy("id", "desc");
        
   
        return response()->json([
            'data' =>  $queryData->get(),
            'for_filter_button' => $forFilterButton
        ], 200);
        
     
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        //
        
        $data = $request->validated();
        Department::create($data);

        return response()->json([
            'message' => 'Department is created successfully',
            'error' => $data
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        //
        $result;

        $listOfDepartmentUser = Department::query()
        ->select(
        'de.id as id', 
        'de.department as department', 
        'de.created_at',
        'emp.employee_role', 
         DB::raw(
            'CASE 
            WHEN emp.employee_set_head = 1 THEN CONCAT("DEPARTMENT HEAD" , " - ", emp.employee_name) 
            ELSE CONCAT(de.department , " - ", emp.employee_name) 
            END AS employee_name'
         ),
        'emp.id as user_id'
        )
        ->from('departments as de')
        ->leftJoin('employees as emp', 'de.id', '=', 'emp.department_id')
        ->where('de.id', $id)
        ->get();


        if($request->input('type') == "get_hr_and_admin"){
            $result = Employee::query()->select(
                'em.id as head_id',
                'em.employee_role as emp_role',
                DB::raw('CONCAT(de.department, "-", em.employee_name, " (", em.employee_role, ")") AS employee_full_name')
            )->from('employees as em')
            ->leftJoin('departments as de', 'em.department_id', '=', 'de.id')
            ->whereRaw('em.employee_role IN ("HR", "ADMIN")')
            ->get();

        }else{
            $result = DB::table(DB::raw('(SELECT
            de.id as id,
            de.department as department,
            de.created_at,
            emp.employee_role,
            CASE 
                WHEN emp.employee_set_head = 1 THEN CONCAT(de.department, " - ", emp.employee_name) ELSE "DON\'T HAVE DEPARTMENT HEAD" END AS department_status,
            CASE 
                WHEN emp.employee_set_head = 1 THEN emp.id
            else null
            END AS employee_id,
            RANK() OVER(PARTITION BY de.department ORDER BY emp.employee_set_head DESC) AS rowss
            FROM departments AS de
            LEFT JOIN employees AS emp ON de.id = emp.department_id) AS e'))
            ->where('e.rowss', '<', 2)
            ->where('e.id', '=', $id)
            ->get();
    
        }
        
        

        
       
        return response()->json([
            'data' => $request->input('type') == "get_hr_and_admin" ?  $result : $result[0],
            'list_of_user_in_department' => $listOfDepartmentUser,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, string $id)
    {
        //
   
        $data = $request->validated();

        $department = Department::find($id);
        
        if (!$department) {
            return response()->json([
                'message' => 'Department not found',
            ], 404);
        }
     


        DB::statement("
            UPDATE employees AS emp
            JOIN departments AS de ON emp.department_id = de.id
            SET emp.employee_set_head = 0
            WHERE de.id = ".$department->id." AND emp.employee_set_head = 1");
        
        DB::table('employees')
            ->where('id', $data['employee_id'])
            ->update(['employee_set_head' => 1]);

       


        return response()->json([
            'message' => 'Department updated successfully',
            'department' => $department,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $department = Department::find($id);

        if(!$department){
            return response()->json([
                "message" => "Department not found",
            ], 401);
        }

        $count = Department::query()
        ->select(
            DB::raw('count(*) as exist')
        )
        ->from('departments as de')
        ->rightJoin('employees as em', 'de.id', '=' , 'em.department_id')
        ->where('de.id', $department->id)
        ->first();
        
        if($count->exist > 0){
            return response()->json([
                "message" => "Department is has already an employees you can't deleted it",
            ], 422);
        }

        $department->delete();

        return response()->json([
            'message' => 'Department deleted successfully'
        ], 200);
    }
}
