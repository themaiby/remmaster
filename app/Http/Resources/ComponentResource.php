<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ComponentResource extends JsonResource
{
    /**
     * Highlights item if < const
     * todo: move to DB config
     */
    public const COUNT_TO_HIGHLIGHT = 2;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'article' => $this->article,
            'title' => $this->title,
            'count' => $this->count,
            'cost' => round($this->cost, 2),
            'summary_cost' => round($this->summary_cost, 2),
            'category' => $this->whenLoaded('category', [
                'id' => $this->category->id,
                'title' => $this->category->title,
            ]),
            'vendor' => $this->whenLoaded('vendor', [
                'id' => $this->vendor->id,
                'name' => $this->vendor->name,
            ]),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
