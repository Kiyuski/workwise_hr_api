<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "position_id" => $this->id,
            "position" => $this->position,
            "created_at" => $this->created_at,
            "total_employee" => $this->Total_employee_with_this_position
        ];
    }
}
