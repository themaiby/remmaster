<?php

namespace App\Services;

use App\Http\Requests\VendorRequest;
use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use Illuminate\Support\Facades\DB;

class VendorService
{

    /**
     * Store vendor and contacts if present
     *
     * @param VendorRequest $request
     * @return VendorResource
     * @throws \Exception
     */
    public function handleStore(VendorRequest $request): VendorResource
    {
        $vendor = new Vendor();
        try {
            DB::transaction(function () use ($request, &$vendor) {
                $vendor = Vendor::create($request->all());
                $vendor->contacts()->createMany($request->contacts);
            });
        } catch (\Throwable $e) {
            DB::rollBack();
        }
        return new VendorResource($vendor->load(['contacts']));
    }

    /**
     * @param VendorRequest $request
     * @param Vendor $vendor
     * @return VendorResource
     * @throws \Exception
     */
    public function handleUpdate(VendorRequest $request, Vendor $vendor): VendorResource
    {
        try {
            DB::transaction(function () use ($request, &$vendor) {
                $vendor->update($request->all());
                $vendor->contacts()->delete();
                $vendor->contacts()->createMany($request->contacts);
            });
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return new VendorResource($vendor->load(['contacts', 'components']));
    }
}
