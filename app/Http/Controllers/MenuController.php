<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuResource;

class MenuController extends Controller
{
    /**
     * Return conditionally (permissions) application menu from resource
     * Menu generates in resource
     * @return MenuResource
     */
    public function getMenu()
    {
        return new MenuResource([]);
    }
}
