<?php

namespace App\Listeners;

use App\Events\ComponentUpdatingEvent;

class ComponentUpdatingListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param ComponentUpdatingEvent $event
     * @return void
     */
    public function handle(ComponentUpdatingEvent $event)
    {
        $component = $event->component;
        // preventing loop fire
        if ($component->count * $component->cost === $component->summary_cost) return;
        $component->update(['summary_cost' => $component->cost * $component->count]);
    }
}
