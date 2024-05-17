<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave_type extends Model
{
    use HasFactory;

    protected $fillable = [
        'leave_type',
        'leave_number_of_days',
        'leave_status',
    ];

    public function leaves()
    {
        return $this->hasMany(Leave::class, 'leave_type_id');
    }
}
