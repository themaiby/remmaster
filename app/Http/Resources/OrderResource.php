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

    /**
     * Single entry
     * @param array $data
     * @return array
     */
    public function filter($data)
    {
        return [
            'id' => $this->id,
            'status' => $this->whenLoaded('status', $this->status),
            'type' => $this->whenLoaded('type', $this->type),
            'user' => $this->whenLoaded('user', $this->user),
            'components' => $this->whenLoaded('components', $this->components),
            'works' => $this->whenLoaded('works', $this->works),
            'status_history' => $this->whenLoaded('statusHistory', StatusHistoryResource::collection($this->statusHistory)),
            'urgent' => $this->urgent,
            'breakage' => $this->breakage,
            'client_name' => $this->client_name,
            'client_number' => $this->client_number,
            'client_email' => $this->client_email,
            'device_name' => $this->device_name,
            'device_imei' => $this->device_imei,
            'complete_date' => ['date' => $this->complete_date->toATOMstring()],
            'created_at' => ['date' => $this->created_at->toATOMstring()],
            'updated_at' => ['date' => $this->created_at->toATOMstring()],
        ];
    }
}
