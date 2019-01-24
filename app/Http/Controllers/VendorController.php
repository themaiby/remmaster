<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorRequest;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use App\Services\VendorService;
use Illuminate\Http\Request;


class VendorController extends Controller
{
    public const PER_PAGE_LIMIT = 100;
    protected $service;

    public function __construct(VendorService $service)
    {
        $this->service = $service;
    }

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
            ->paginate($perPage, ['id', 'name', 'created_at']);

        return VendorResource::collection($vendors);
    }

    /**
     * Store vendor
     *
     * @param VendorRequest $request
     * @return VendorResource
     * @throws \Exception
     */
    public function store(VendorRequest $request): VendorResource
    {
        return $this->service->handleStore($request);
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
     * @throws \Exception
     */
    public function update(VendorRequest $request, Vendor $vendor): VendorResource
    {
        $this->service->handleUpdate($request, $vendor);
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
}
