<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ComponentResource extends JsonResource
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
            'article' => $this->article,
            'title' => $this->title,
            'count' => $this->count,
            'cost' => $this->cost,
            'vendor' => $this->whenLoaded('vendor', $this->vendor->name),
            'created_at' => $this->created_at
        ];
    }
}
