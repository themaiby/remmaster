<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status' => $this->whenLoaded('status', $this->status),
            'type' => $this->whenLoaded('type', $this->type),
            'urgent' => $this->urgent,
            'client_name' => $this->client_name,
            'client_number' => $this->client_number,
            'device_name' => $this->device_name,
            'device_imei' => $this->device_imei,
            'created_at' => ['date' => $this->created_at->toATOMstring()],
        ];
    }

    public function filter($data)
    {
        return [
            'id' => $this->id,
            'status' => $this->whenLoaded('status', $this->status),
            'type' => $this->whenLoaded('type', $this->type),
            'user' => $this->whenLoaded('user', $this->user),
            'components' => $this->whenLoaded('components', $this->components),
            'urgent' => $this->urgent,
            'breakage' => $this->breakage,
            'complete_date' => $this->complete_date,
            'client_name' => $this->client_name,
            'client_number' => $this->client_number,
            'device_name' => $this->device_name,
            'device_imei' => $this->device_imei,
            'created_at' => ['date' => $this->created_at->toATOMstring()],
        ];
    }
}
