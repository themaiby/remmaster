<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComponentRequest;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Models\ComponentCategory;
use App\Models\Vendor;
use Illuminate\Http\Request;

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
        $components = Component::with('vendor:id,name', 'category:id,title')
            ->sortable(['created_at' => 'desc'])
            ->filter($request->all())
            ->paginate($perPage, [
                'id',
                'title',
                'article',
                'count',
                'cost',
                'summary_cost',
                'category_id',
                'vendor_id',
                'created_at',
            ]);
        return ComponentResource::collection($components);
    }

    /**
     * Values for category picker
     * @return array
     */
    public function getAvailableCategories(): array
    {
        return ['data' => [ComponentCategory::with('child')->find(1)]];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ComponentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ComponentRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = array_merge($request->all(), ['summary_cost' => $request->count * $request->cost]);
        return response()->json(
            [
                'data' => Vendor::findOrFail($request->vendor_id)
                    ->components()
                    ->create($data)
            ]
        );
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
     * @return ComponentResource
     */
    public function update(ComponentRequest $request, Component $component): ComponentResource
    {
        $component->update($request->all());
        return new ComponentResource($component->load('vendor'));
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
