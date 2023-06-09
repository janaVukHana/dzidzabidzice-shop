<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OfferController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function(Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/message', [MessageController::class, 'index']);
    Route::delete('/message/{message}', [MessageController::class, 'destroy']);

    Route::post('/images', [ImageController::class, 'store']);
    Route::delete('/images/{image}', [ImageController::class, 'destroy']);

    Route::post('/products', [OfferController::class, 'store']);
    Route::delete('/products/{offer}', [OfferController::class, 'destroy']);

});

Route::get('/images', [ImageController::class, 'index']);
Route::post('/message', [MessageController::class, 'store'])->name('message.store');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [OfferController::class, 'index']);

