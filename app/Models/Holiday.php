<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        "holiday",
        "holiday_start_date",
        "holiday_end_date",
        "holiday_year"
    ];
}
