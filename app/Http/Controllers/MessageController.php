<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Resources\MessageResource;
use App\Http\Requests\StoreMessageRequest;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return MessageResource::collection(Message::orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request) {
        $messageInfo = $request->validated();

        // TODO: send email notification
        // Mail::to('ilija009@gmail.com')->send(new ContactMail($messageInfo));
                
        $message = Message::create($messageInfo);

        return response(new MessageResource($message), 201);
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
    public function destroy(Message $message)
    {
        $message->delete();

        return response('', 204);
        // 204 === NO CONTENT, indicates that a request has succeeded, 
        // but that the client doesn't need to navigate away from its current page
    }
}
