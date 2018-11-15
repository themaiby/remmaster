<?php

namespace App\Services;

use App\Http\Requests\Vendor\CreateVendorRequest;
use App\Models\Vendor;
use Illuminate\Support\Facades\DB;

class VendorService
{

    /**
     * Store vendor and contacts if present
     *
     * @param CreateVendorRequest $request
     * @return mixed
     * @throws \Exception
     */
    public function handleStore(CreateVendorRequest $request)
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
        return $vendor->load('contacts');
    }
}