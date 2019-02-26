<?php

namespace App\Services;


use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\OrderComponent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * @param OrderRequest $request
     * @return mixed
     * @throws \Exception
     * @throws \Throwable
     */
    public function handleStore(OrderRequest $request)
    {
        $order = new Order();

        try {
            DB::transaction(function () use ($request, &$order) {

                /* Saving order */
                $order = Order::create(
                    array_merge($request->all(), ['user_id' => auth()->user()->id])
                );

                /* Attach works to order */
                $order->works()->createMany($request->works);

                /* attach components to order */
                $order->componentsAttached()->createMany($request->components);
            });
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $order;
    }

    /**
     * @param OrderRequest $request
     * @param Order $order
     * @return Order
     * @throws \Throwable
     */
    public function handleUpdate(OrderRequest $request, Order $order): Order
    {
        DB::transaction(function () use ($request, $order) {

            $order->update($request->all());

            /* get IDs of attached to order components */
            $componentIDs = $order->componentsAttached->pluck('id');

            /* hand deleting to trigger deleted event */
            OrderComponent::whereIn('id', $componentIDs)->get()->each(function (OrderComponent $orderComponent) {
                $orderComponent->delete();
            });

            /* again attach components to order */
            $order->componentsAttached()->createMany($request->components);

            /* Attach works to order */
            $order->works()->delete();
            $order->works()->createMany($request->works);
        });

        return $order;
    }
}
