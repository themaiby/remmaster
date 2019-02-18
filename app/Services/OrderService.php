<?php

namespace App\Services;


use App\Http\Requests\OrderRequest;
use App\Models\Order;
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
}
