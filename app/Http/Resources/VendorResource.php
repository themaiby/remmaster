<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VendorResource extends JsonResource
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
            'name' => $this->name,
            'created_at' => $this->created_at
        ];
    }

    /**
     * For single model
     *
     * @param array $data
     * @return array
     */
    protected function filter($data)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'note' => $this->note,
            'contacts' => $this->whenLoaded('contacts'),
            'created_at' => $this->created_at
        ];
    }
}
