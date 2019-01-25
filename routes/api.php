<?php

/* tmp */
Route::get('/test', function () {
    return \App\Models\ComponentCategory::with('childs')->find(1);
});

/* Auth routes */
Route::post('/login', 'Auth\AuthController@login')
    ->name('auth.login');

Route::post('/logout', 'Auth\AuthController@logout')
    ->name('auth.logout')
    ->middleware('jwt');

/* END auth */

Route::group(['middleware' => 'jwt'], function () {

    Route::get('/me', 'Auth\AuthController@me')
        ->name('auth.me');

    // Menu
    Route::get('/menu', 'MenuController@get')->name('menu');

    /* VENDORS */
    Route::group(
        ['prefix' => 'vendors'],
        function () {
            Route::get('/', 'VendorController@index')
                ->middleware('permission:vendors.show')
                ->name('vendors.index');
            Route::post('/', 'VendorController@store')
                ->middleware('permission:vendors.store')
                ->name('vendors.store');
            Route::get('/{vendor}', 'VendorController@show')
                ->middleware('permission:vendors.show')
                ->name('vendors.show')
                ->where(['vendor' => '[0-9]+']);
            Route::put('/{vendor}', 'VendorController@update')
                ->middleware('permission:vendors.update')
                ->name('vendors.update')
                ->where(['vendor' => '[0-9]+']);
            Route::delete('/{vendor}', 'VendorController@destroy')
                ->middleware('permission:vendors.destroy')
                ->name('vendors.destroy')
                ->where(['vendor' => '[0-9]+']);

            /* VENDOR CONTACTS */
            Route::group(
                ['prefix' => '{vendor}/contact'],
                function () {
                    Route::post('/', 'VendorController@storeContact')
                        ->middleware('permission:vendors.update')
                        ->name('vendors.contacts.store')
                        ->where(['vendor' => '[0-9]+']);

                    Route::delete('/{vendorContact}', 'VendorController@destroyContact')
                        ->middleware('permission:vendors.update')
                        ->name('vendors.contacts.destroy')
                        ->where(['vendor' => '[0-9]+', 'vendorContact' => '[0-9]+']);
                });
        });

    /* COMPONENTS */
    Route::group(['prefix' => 'components'], function () {
        Route::get('/', 'ComponentController@index')
            ->middleware('permission:components.show')
            ->name('components.index');

        Route::get('/availableVendors', 'ComponentController@getAvailableVendors')
            ->middleware('permission:components.show')
            ->name('components.vendors');

        Route::get('/availableCategories', 'ComponentController@getAvailableCategories')
            ->middleware('permission:components.show')
            ->name('components.categories');

        Route::get('/{component}', 'ComponentController@show')
            ->middleware('permission:components.show')
            ->name('components.show')
            ->where(['component' => '[0-9]+']);

        Route::post('/', 'ComponentController@store')
            ->middleware('permission:components.store')
            ->name('components.store');

        Route::put('/{component}', 'ComponentController@update')
            ->middleware('permission:components.update')
            ->name('components.update')
            ->where(['component' => '[0-9]+']);

        Route::delete('/{component}', 'ComponentController@destroy')
            ->middleware('permission:components.delete')
            ->name('components.delete')
            ->where(['component' => '[0-9]+']);
    });
});
