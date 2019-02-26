<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\OrderComponent;
use App\Observers\OrderComponentObserver;
use App\Observers\OrderObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        OrderComponent::observe(OrderComponentObserver::class);
        Order::observe(OrderObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
