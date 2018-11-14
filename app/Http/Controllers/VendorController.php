<?php

namespace App\Http\Controllers;

use App\Http\Requests\Vendor\CreateVendorRequest;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    private const PER_PAGE = 25; /* todo: dynamic change */

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $vendors = Vendor::paginate(self::PER_PAGE, ['id', 'name', 'created_at']);
        return VendorResource::collection($vendors);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateVendorRequest $request)
    {
        return $request;
        // $vendor = Vendor::create()
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vendor $vendor
     * @return VendorResource
     */
    public function show(Vendor $vendor)
    {
        return new VendorResource($vendor->load('contacts'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        //
    }
}
