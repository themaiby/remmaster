<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\OrderStatusHistory;

class OrderObserver
{
    /**
     * Handle the order "created" event.
     *
     * @param  \App\Models\Order $order
     * @return void
     */
    public function created(Order $order)
    {
        //
    }

    /**
     * Handle the order "updated" event.
     *
     * @param  \App\Models\Order $order
     * @return void
     */
    public function updated(Order $order)
    {
        $oldStatusId = $order->getOriginal('status_id');
        $newStatusId = $order->status_id;

        if ($oldStatusId !== $newStatusId) {
            OrderStatusHistory::create([
                'status_id_old' => $oldStatusId,
                'status_id_new' => $newStatusId,
                'user_id' => auth()->user()->id,
            ]);
        }
    }

    /**
     * Handle the order "deleted" event.
     *
     * @param  \App\Models\Order $order
     * @return void
     */
    public function deleted(Order $order)
    {
        //
    }

    /**
     * Handle the order "restored" event.
     *
     * @param  \App\Models\Order $order
     * @return void
     */
    public function restored(Order $order)
    {
        //
    }

    /**
     * Handle the order "force deleted" event.
     *
     * @param  \App\Models\Order $order
     * @return void
     */
    public function forceDeleted(Order $order)
    {
        //
    }
}
