<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorContactRequest;
use App\Http\Requests\VendorRequest;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use App\Models\VendorContact;
use App\Services\VendorService;
use Illuminate\Http\Request;


class VendorController extends Controller
{
    public const PER_PAGE_LIMIT = 100;

    /**
     * Vendors list
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $perPage = (int)$request->perPage > 100 ? self::PER_PAGE_LIMIT : $request->perPage;

        $vendors = Vendor::sortable(['created_at' => 'desc'])
            ->filter($request->all())
            ->paginate($perPage, [
                'id', 'name', 'created_at'
            ]);

        return VendorResource::collection($vendors);
    }

    /**
     * Store vendor
     *
     * @param VendorRequest $request
     * @param VendorService $service
     * @return VendorResource
     * @throws \Exception
     */
    public function store(VendorRequest $request, VendorService $service): VendorResource
    {
        return $service->handleStore($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vendor $vendor
     * @return VendorResource
     */
    public function show(Vendor $vendor): VendorResource
    {
        return new VendorResource($vendor->load('contacts', 'components'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param VendorRequest $request
     * @param  \App\Models\Vendor $vendor
     * @return VendorResource
     */
    public function update(VendorRequest $request, Vendor $vendor): VendorResource
    {
        $vendor->update($request->all());
        return new VendorResource($vendor->load('contacts'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Vendor $vendor): \Illuminate\Http\JsonResponse
    {
        $vendor->delete();
        return response()->json(['message' => 'Success']);
    }

    /**
     * @param VendorContactRequest $request
     * @param Vendor $vendor
     * @return array
     */
    public function storeContact(VendorContactRequest $request, Vendor $vendor): array
    {
        return ['data' => $vendor->contacts()->create($request->all())];
    }

    /**
     * @param Vendor $vendor ignored
     * @param  \App\Models\VendorContact $vendorContact
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyContact(Vendor $vendor, VendorContact $vendorContact): \Illuminate\Http\JsonResponse
    {
        $vendorContact->delete();
        return response()->json(['message' => 'Success']);
    }
}
