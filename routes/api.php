<?php


/* Auth routes */
Route::post('/login', 'Auth\AuthController@login')
    ->name('auth.login');

Route::post('/logout', 'Auth\AuthController@logout')
    ->name('auth.logout')
    ->middleware('auth:api');

Route::post('/refresh', 'Auth\AuthController@refresh')
    ->name('auth.refresh');

Route::get('/me', 'Auth\AuthController@me')
    ->name('auth.me')
    ->middleware('auth:api');
/* END auth */

Route::group(['middleware' => 'auth:api'], function () {

    // Menu
    Route::get('/menu', 'MenuController@getMenu')->name('menu');

    /* VENDORS */
    Route::group(['prefix' => 'vendors'], function () {
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

        /* Available values for providers filter */
        Route::get('/filter', 'VendorController@getFilterValues')
            ->name('vendors.filter');

        /* VENDOR CONTACTS */
        Route::group(['prefix' => '{vendor}/contact'], function () {
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
        Route::post('/', 'ComponentController@store')
            ->middleware('permission:components.store')
            ->name('components.store');
    });
});
