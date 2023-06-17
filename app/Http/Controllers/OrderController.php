<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formData = $request->validate([
            'full_name' => ['required'],
            'email' => ['required'],
            'phone' => ['required'],
            'address' => ['required'],
            'message' => ['required'],
            'date' => ['required'],
            'order' => ['required']
        ]);

        // Convert the date to the desired format, accounting for the timezone
        $date = Carbon::parse($formData['date'], 'Europe/Belgrade')->addHours(2)->setTimezone('UTC');
        $formData['date'] = $date->format('Y-m-d H:i:s');

        $newOrder = Order::create($formData);

        return response(new OrderResource($newOrder), 201);
        // 201 == the request has succeeded and has led to the creation of a resource.
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
