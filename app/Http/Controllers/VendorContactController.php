<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\VendorContact;
use Illuminate\Http\Request;

class VendorContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VendorContact  $vendorContact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor, VendorContact $vendorContact)
    {
        //
    }
}
