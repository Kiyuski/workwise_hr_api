<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Leave;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use Illuminate\Support\Facades\DB;
use App\Events\NotificationUpdateLeave;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $notificationsQuery = null; 
        $searchKeyword = request()->input('search');

        $selectClause = "
        (SELECT CONCAT(de.department, ' - ', m.employee_name, ' (', m.employee_role, ') ') 
        FROM employees AS m 
        LEFT JOIN departments AS de ON m.department_id = de.id 
        WHERE m.id = l.employee_approval_id) AS from_user,
        em.employee_name AS to_user,
        em.employee_role,
        p.position,
        n.notification_message AS sender_message,
        lt.leave_type AS sender_leave_request,
        l.leave_status AS sender_leave_status,
        n.created_at,
        l.employee_approval_id,
        n.leave_has_seen,
        em.id as employee_id,
        n.leave_id,
        m.employee_image,
        de.department,
        n.id
    ";
    
    if ($request->has('id')) {
    
        $notificationsQuery = DB::table(DB::raw("(SELECT 
                {$selectClause},
                ROW_NUMBER() OVER(PARTITION BY lt.id) AS rw
                FROM notifications AS n
                LEFT JOIN leaves AS l ON n.leave_id = l.id
                JOIN employees AS em ON l.employee_id = em.id
                JOIN leave_types AS lt ON l.leave_type_id = lt.id
                JOIN positions AS p ON em.position_id = p.id
                JOIN departments AS de ON em.department_id = de.id
                JOIN employees As m ON l.employee_approval_id = m.id
                WHERE l.employee_id = '{$request->input("id")}') AS sub"))
                ->where('sub.rw', '>', 1)
                ->when($searchKeyword, function ($query) use ($searchKeyword) {
                    return $query->where('sub.to_user', 'like', '%' . $searchKeyword . '%')
                                ->orWhere('sub.sender_leave_request', 'like', '%' . $searchKeyword . '%');
                })
                ->latest('sub.created_at');
    }else{
            $notificationsQuery = DB::table('notifications as n')
            ->selectRaw($selectClause)
            ->leftJoin('leaves AS l', 'n.leave_id', '=', 'l.id')
            ->join('employees AS em', 'l.employee_id', '=', 'em.id')
            ->join('leave_types AS lt', 'l.leave_type_id', '=', 'lt.id')
            ->join('positions AS p', 'em.position_id', '=', 'p.id')
            ->join('departments AS de', 'em.department_id', '=', 'de.id')
            ->join('employees AS m', 'm.id', '=', 'l.employee_approval_id')
            ->when($searchKeyword, function ($query) use ($searchKeyword) {
                return $query->where('em.employee_name', 'like', '%' . $searchKeyword . '%')
                            ->orWhere('l.leave_status', 'like', '%' . $searchKeyword . '%')
                            ->orWhere('em.employee_role', 'like', '%' . $searchKeyword . '%')
                            ->orWhere('de.department', 'like', '%' . $searchKeyword . '%')
                            ->orWhere('lt.leave_type', 'like', '%' . $searchKeyword . '%')
                            ->orWhere('p.position', 'like', '%' . $searchKeyword . '%');
            })
            ->latest('n.created_at');

        }
    
        $notifications = $request->has('for_admin_hr') || $request->has('for_employee_only') ? 
        $request->has('all') ? $notificationsQuery->get() : $notificationsQuery->paginate(10)->appends(['search' => $searchKeyword])
        : $notificationsQuery->limit(5)->get();
        
        foreach ($notifications as $notification) {
        
            $notification->employee_image = $notification->employee_image ? \URL::to($notification->employee_image) : null;
        };
 
        return response()->json([
            "data" => $notifications
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotificationRequest $request)
    {
        //
        // $notification->owner = $res->employee_id;
        
        $notification = Notification::create($request->validated());

        event(new NotificationUpdateLeave($notification));

        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationRequest $request, string $id)
    {
        //
        $data = $request->validated();
        $notification = Notification::find($id)->update($data);
        return response()->json([
            "message" => "Updated successfully"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $data = $request->all();
     
        $deleted = Notification::destroy($data);
        
        if ($deleted === 0) {
            return response()->json([
                'message' => 'No notification found to delete'
            ], 404);
        }
        
        // Return a response after positions are deleted
        return response()->json([
            'message' => 'Notification deleted successfully'
        ], 200);
        
    }
}
