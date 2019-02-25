<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StatusHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status_old' => $this->whenLoaded('statusOld', $this->statusOld),
            'status_new' => $this->whenLoaded('statusNew', $this->statusNew),
            'user' => $this->whenLoaded('user', $this->user),
            'created_at' => ['date' => $this->created_at->toATOMstring()]
        ];
    }
}
