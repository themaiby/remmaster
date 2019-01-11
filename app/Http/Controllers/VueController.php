<?php

namespace App\Http\Controllers;

class VueController extends Controller
{
    /**
     * Get simple html page with Vue instance
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getSite()
    {
        return view('app');
    }
}
