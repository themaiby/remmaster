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
    public function toArray($request)
    {
        /* @var $user \App\Models\User */
        $user = Auth::user()->load('permissions');

        return [
            // home
            [
                'text' => 'menu.home',
                'icon' => 'home',
                'routeName' => 'home'
            ],

            // orders
            $this->when($user->can('orders.show'),
                [
                    'text' => 'menu.orders',
                    'icon' => 'list',
                    'routeName' => 'orders.index'
                ]),

            // components
            $this->when($user->can('components.show'),
                [
                    'text' => 'menu.components',
                    'icon' => 'phonelink_setup',
                    'routeName' => 'components.index'
                ]),

            // vendors
            $this->when($user->can('vendors.show'),
                [
                    'text' => 'menu.vendors',
                    'icon' => 'work',
                    'routeName' => 'vendors.index'
                ]),

            // settings todo
            $this->when($user->can('settings.edit'),
                [
                    'text' => 'menu.settings',
                    'icon' => 'keyboard_arrow_down',
                    'icon-alt' => 'settings',
                    'routeName' => 'settings.index',
                    'children' => [
                        [
                            'text' => 'menu.test',
                            'icon' => 'warning',
                            'routeName' => 'child.test'
                        ]
                    ]
                ]),

        ];
    }
}
