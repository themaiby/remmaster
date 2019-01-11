<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /* @var $user \App\Models\User */
        $user = Auth::user()->load('permissions');

        return [
            // home
            [
                'text' => 'menu.home',
                'icon' => 'mdi-home',
                'routeName' => 'dashboard'
            ],

            // orders
            $this->when($user->can('orders.show'),
                [
                    'text' => 'menu.orders',
                    'icon' => 'mdi-monitor-cellphone',
                    'routeName' => 'orders.index'
                ]),

            // components
            $this->when($user->can('components.show'),
                [
                    'text' => 'menu.components',
                    'icon' => 'mdi-cart',
                    'routeName' => 'components.index'
                ]),

            // vendors
            $this->when($user->can('vendors.show'),
                [
                    'text' => 'menu.vendors',
                    'icon' => 'mdi-truck-fast',
                    'routeName' => 'vendors.index'
                ]),

            // settings todo
            $this->when($user->can('settings.edit'),
                [
                    'text' => 'menu.settings',
                    'icon' => 'mdi-settings',
                    'icon-alt' => 'mdi-chevron-down',
                    'routeName' => 'settings.index'
/*                    'children' => [
                        [
                            'text' => 'menu.test',
                            'icon' => 'mdi-warning',
                            'routeName' => 'settings.index'
                        ]
                    ]*/
                ]),

        ];
    }
}
