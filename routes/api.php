<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/* VENDORS */
Route::group(['prefix' => 'vendors'], function () {
    Route::get('/', 'VendorController@index')->name('vendors.index');
    Route::post('/', 'VendorController@create')->name('vendors.create');
    Route::get('/{vendor}', 'VendorController@show')->name('vendors.show')
        ->where(['vendor' => '[0-9]+']);
    Route::put('/{vendor}', 'VendorController@update')->name('vendors.update')
        ->where(['vendor' => '[0-9]+']);
    Route::delete('/{vendor}', 'VendorController@destroy')->name('vendors.delete')
        ->where(['vendor' => '[0-9]+']);
});
