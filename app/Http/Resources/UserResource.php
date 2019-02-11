<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'permissions' => PermissionResource::collection($this->whenLoaded('permissions')),
            'roles' => RoleResource::collection($this->whenLoaded('roles')),
            'timezone' => $this->timezone,
            'created_at' => ['date' => $this->created_at->toATOMstring()],
            'updated_at' => ['date' => $this->updated_at->toATOMstring()],
        ];
    }
}
