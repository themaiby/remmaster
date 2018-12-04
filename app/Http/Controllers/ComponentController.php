<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComponentRequest;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Models\Vendor;
use Illuminate\Http\Request;

class ComponentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $components = Component::with('vendor')
            ->sortable(['created_at' => 'desc'])
            ->filter($request->all())
            ->paginate((int)$request->perPage, [
                'id', 'title', 'article', 'count', 'cost', 'vendor_id', 'created_at', 'updated_at', 'deleted_at'
            ]);

        return ComponentResource::collection($components);
    }

    /**
     * Values for component vendor picker
     * @return Vendor[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAvailableVendors()
    {
        return Vendor::select(['id', 'name'])->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function store(ComponentRequest $request)
    {
        return [
            'data' => Vendor::findOrFail($request->vendor_id)
                ->components()
                ->create($request->all())
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Component $component
     * @return \Illuminate\Http\Response
     */
    public function show(Component $component)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Component $component
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Component $component)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Component $component
     * @return \Illuminate\Http\Response
     */
    public function destroy(Component $component)
    {
        //
    }
}
