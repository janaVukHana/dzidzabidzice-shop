<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $order = json_decode($this->order, true);

        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'message' => $this->message,
            'date' => Carbon::parse($this->date)->format('d-m-Y'),
            'order' => is_array($order) ? $order : [],
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
