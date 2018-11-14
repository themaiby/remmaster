<?php

namespace App\Http\Controllers;

use App\Http\Resources\VendorCollection;
use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    private const PER_PAGE = 25; /* todo: dynamic change */

    /**
     * Display a listing of the resource.
     *
     * @return VendorCollection
     */
    public function index()
    {
        $vendors = Vendor::paginate(self::PER_PAGE, ['id', 'name', 'note']);
        return new VendorCollection($vendors);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \App\Http\Resources\Vendor
     */
    public function show(Vendor $vendor)
    {
        return new \App\Http\Resources\Vendor($vendor->load('contacts'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        //
    }
}
