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
     * @return mixed
     * @throws \Exception
     */
    public function handleStore(VendorRequest $request)
    {
        try {
            DB::transaction(function () use ($request, &$vendor) {

                $vendor = Vendor::create($request->all());

                if ($request->contacts) {
                    $vendor->contacts()->createMany($request->contacts);
                }

            });
        } catch (\Throwable $e) {
            DB::rollBack();
        }
        /* @var $vendor Vendor */
        return new VendorResource($vendor->load('contacts'));
    }
}
