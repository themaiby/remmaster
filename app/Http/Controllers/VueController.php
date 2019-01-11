<?php

namespace App\Http\Controllers;

class VueController extends Controller
{
    public function getSite()
    {
        return view('app');
    }
}
