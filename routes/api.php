<?php


Route::group(['middleware' => 'auth'], function () {

    /* VENDORS */
    Route::group(['prefix' => 'vendors'], function () {
        Route::get('/', 'VendorController@index')
            /*->middleware('permission:vendors.show')*/ /* todo: uncomment after login implement */
            ->name('vendors.index');
        Route::post('/', 'VendorController@store')
            /*->middleware('permission:vendors.store')*/
            ->name('vendors.store');
        Route::get('/{vendor}', 'VendorController@show')
            /*->middleware('permission:vendors.show')*/
            ->name('vendors.show')
            ->where(['vendor' => '[0-9]+']);
        Route::put('/{vendor}', 'VendorController@update')
            /*->middleware('permission:vendors.update')*/
            ->name('vendors.update')
            ->where(['vendor' => '[0-9]+']);
        Route::delete('/{vendor}', 'VendorController@destroy')
            /*->middleware('permission:vendors.destroy')*/
            ->name('vendors.destroy')
            ->where(['vendor' => '[0-9]+']);

        /* VENDOR CONTACTS */
        Route::group(['prefix' => '{vendor}/contact'], function () {
            Route::post('/', 'VendorController@storeContact')
                // ->middleware('permission:vendors.update')
                ->name('vendors.contacts.store')
                ->where(['vendor' => '[0-9]+']);

            Route::delete('/{vendorContact}', 'VendorController@destroyContact')
                // ->middleware('permission:vendors.update')
                ->name('vendors.contacts.destroy')
                ->where(['vendor' => '[0-9]+', 'vendorContact' => '[0-9]+']);
        });
    });
});
