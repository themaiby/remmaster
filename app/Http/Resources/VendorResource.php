<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VendorResource extends JsonResource
{
    /**
     * Collection fields filtering
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $componentsPriceSummary = 0;
        foreach ($this->components as $component) {
            $componentsPriceSummary += $component->summary_cost;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'components_count' => $this->components_count,
            'components_cost' => round($componentsPriceSummary, 2),
            'created_at' => ['date' => $this->created_at->toATOMstring()],
        ];
    }

    /**
     * Single model fields filtering
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
            'components' => $this->whenLoaded('components', ComponentResource::collection($this->components)),
            'created_at' => ['date' => $this->created_at->toATOMstring()],
            'updated_at' => ['date' => $this->updated_at->toATOMstring()],
        ];
    }
}
