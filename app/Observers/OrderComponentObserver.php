<?php

namespace App\Observers;

use App\Models\Component;
use App\Models\OrderComponent;

class OrderComponentObserver
{
    /**
     * subtract count from components in storage
     *
     * @param  \App\Models\OrderComponent $orderComponent
     * @return void
     */
    public function created(OrderComponent $orderComponent): void
    {
        $storageComponent = Component::find($orderComponent->component_id);
        $storageComponent->update([
            'count' => $storageComponent->count - $orderComponent->count
        ]);
    }

    /**
     *
     * @param  \App\Models\OrderComponent $orderComponent
     * @return void
     */
    public function updated(OrderComponent $orderComponent)
    {
    }

    /**
     * Handle the order component "deleted" event.
     *
     * @param  \App\Models\OrderComponent $orderComponent
     * @return void
     */
    public function deleted(OrderComponent $orderComponent): void
    {
        $storageComponent = Component::find($orderComponent->component_id);
        $storageComponent->update([
            'count' => $storageComponent->count + $orderComponent->count
        ]);
    }

    /**
     * Handle the order component "restored" event.
     *
     * @param  \App\Models\OrderComponent $orderComponent
     * @return void
     */
    public function restored(OrderComponent $orderComponent)
    {
        //
    }

    /**
     * Handle the order component "force deleted" event.
     *
     * @param  \App\Models\OrderComponent $orderComponent
     * @return void
     */
    public function forceDeleted(OrderComponent $orderComponent)
    {
        //
    }
}
