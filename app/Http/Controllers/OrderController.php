<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Resources\OrderResource;
// Mail
use App\Mail\OrderPlaced;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return OrderResource::collection(Order::orderBy('id', 'desc')->get());
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

        // https://www.codersvibe.com/how-to-send-email-with-gmail-smtp-in-laravel
        Mail::to('ilija009@gmail.com')->send(new OrderPlaced());

        return response(new OrderResource($newOrder), 201);
        // 201 == the request has succeeded and has led to the creation of a resource.
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['order' => 'Order not found'], 404);
        }

        return new OrderResource($order);
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
    public function destroy(Order $order)
    {
        $order->delete();

        return response('', 204);
        // 204 === NO CONTENT, indicates that a request has succeeded, 
        // but that the client doesn't need to navigate away from its current page
    }
}
