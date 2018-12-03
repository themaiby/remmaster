<?php

namespace App\Http\Controllers;

use App\Filters\VendorFilter;
use App\Http\Requests\VendorContactRequest;
use App\Http\Requests\VendorRequest;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use App\Models\VendorContact;
use App\Services\VendorService;
use Illuminate\Http\Request;


class VendorController extends Controller
{
    /**
     * Vendors list
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request, VendorFilter $filter)
    {
        $vendors = Vendor::withTrashed()
            ->sortable(['created_at' => 'desc'])
            ->filter($filter)
            ->paginate((int)$request->perPage, [
                'id', 'name', 'created_at', 'deleted_at'
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

    /**
     * Get available values for vendor filter
     * @return array
     */
    public function getFilterValues()
    {
        $minCreatedAt = Vendor::min('created_at');
        $maxCreatedAt = Vendor::max('created_at');

        $minComponentsCount = 4;
        $maxComponentsCount = 27;

        return ['data' =>
            [
                'components' =>
                    [
                        'min' => $minComponentsCount,
                        'max' => $maxComponentsCount,
                    ],
                'date' =>
                    [
                        'min' => $minCreatedAt,
                        'max' => $maxCreatedAt,
                    ],
            ]
        ];
    }
}
