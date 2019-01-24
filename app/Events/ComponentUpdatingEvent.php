<?php

namespace App\Events;

use App\Models\Component;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ComponentUpdatingEvent
{
    use Dispatchable, SerializesModels;

    public $component;

    /**
     * Create a new event instance.
     *
     * @param Component $component
     */
    public function __construct(Component $component)
    {
        $this->component = $component;
    }
}
