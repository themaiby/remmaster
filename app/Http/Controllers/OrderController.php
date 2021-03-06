<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\OrderType;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public const PER_PAGE_LIMIT = 100;
    protected $service;

    public function __construct(OrderService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $perPage = (int)$request->perPage > 100 ? self::PER_PAGE_LIMIT : $request->perPage;
        $orders = Order::with(
            'type:id,title',
            'status:id,title,color,opener,finisher',
            'components'
        )
            ->sortable(['created_at' => 'desc'])
            ->filter($request->all())
            ->paginate($perPage, [
                'id',
                'status_id',
                'order_type_id',
                'urgent',
                'client_name',
                'client_number',
                'device_name',
                'device_imei',
                'created_at'
            ]);

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage. todo: return resource
     *
     * @param OrderRequest $request
     * @return OrderResource
     * @throws \Exception
     * @throws \Throwable
     */
    public function store(OrderRequest $request): OrderResource
    {
        $order = $this->service->handleStore($request);
        return $this->show($order);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order $order
     * @return OrderResource
     */
    public function show(Order $order): OrderResource
    {
        return new OrderResource(
            $order->load(
                'user', 'type', 'status', 'components', 'works',
                'statusHistory', 'statusHistory.statusOld', 'statusHistory.statusNew', 'statusHistory.user'
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param OrderRequest $request
     * @param  \App\Models\Order $order
     * @return OrderResource
     * @throws \Throwable
     */
    public function update(OrderRequest $request, Order $order): OrderResource
    {
        $order = $this->service->handleUpdate($request, $order);
        return $this->show($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order $order
     * @return void
     */
    public function destroy(Order $order): void
    {
        //
    }

    /**
     * @return array
     */
    public function getStatuses(): array
    {
        return ['data' => OrderStatus::all()];
    }

    /**
     * @return array
     */
    public function getTypes(): array
    {
        return ['data' => OrderType::all()];
    }
}
