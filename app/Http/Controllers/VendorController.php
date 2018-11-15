<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorContactRequest;
use App\Http\Requests\VendorRequest;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use App\Models\VendorContact;
use App\Services\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VendorController extends Controller
{
    private const PER_PAGE = 25; /* todo: dynamic change */

    /**
     * Vendors list
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $vendors = Vendor::paginate(self::PER_PAGE, [
            'id', 'name', 'created_at'
        ]);

        return VendorResource::collection($vendors);
    }

    /**
     * Store vendor
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function store(VendorRequest $request, VendorService $service)
    {
        return $service->handleStore($request);
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
     * @return VendorResource
     */
    public function update(Request $request, Vendor $vendor)
    {
        $vendor->update($request->all());
        return new VendorResource($vendor->load('contacts'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();
        return response()->json(['message' => 'Success']);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @return VendorResource
     */
    public function storeContact(VendorContactRequest $request, Vendor $vendor)
    {
        $vendor->contacts()->create($request->all());
        return new VendorResource($vendor->load('contacts'));
    }

    /**
     * @param  \App\Models\VendorContact $vendorContact
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroyContact(VendorContact $vendorContact)
    {
        $vendorContact->delete();
        return response()->json(['message' => 'Success']);
    }
}
