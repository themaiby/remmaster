<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComponentRequest;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComponentController extends Controller
{
    public const PER_PAGE_LIMIT = 100;
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $perPage = (int)$request->perPage > 100 ? self::PER_PAGE_LIMIT : $request->perPage;
        $components = Component::with('vendor:id,name')
            ->sortable(['created_at' => 'desc'])
            ->filter($request->all())
            ->paginate($perPage, [
                'id',
                'title',
                'article',
                'count',
                'cost',
                'vendor_id',
                'created_at',
                'updated_at',
                'deleted_at'
            ]);
        return ComponentResource::collection($components);
    }

    /**
     * Values for component vendor picker
     * @return array
     */
    public function getAvailableVendors(): array
    {
        return ['data' => Vendor::select(['id', 'name'])->get()];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ComponentRequest $request
     * @return array
     */
    public function store(ComponentRequest $request): array
    {
        return response()->json([
            'data' => Vendor::findOrFail($request->vendor_id)
                ->components()
                ->create($request->all())
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Component $component
     * @return ComponentResource
     */
    public function show(Component $component): ComponentResource
    {
        return new ComponentResource($component->load('vendor'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ComponentRequest $request
     * @param  \App\Models\Component $component
     * @return \Illuminate\Http\Response
     */
    public function update(ComponentRequest $request, Component $component): \Illuminate\Http\Response
    {
        $component->update($request->all());
        return response()->json(['message' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Component $component
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Component $component): \Illuminate\Http\Response
    {
        $component->delete();
        return response()->json(['message' => 'success']);
    }
}
