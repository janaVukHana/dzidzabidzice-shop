<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use App\Http\Resources\OfferResource;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return OfferResource::collection(Offer::orderBy('id', 'desc')->get());
    }

     /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: before storing image in database and folder gallery i want to
        // validate that image is unique

        // MOZE I StoreProductRequest $request CLASS DA SE NAPRAVI kao CodeHolic
        $formData = $request->validate([
            // TODO: check later is one of this going to work!!!
            // 'image' => ['required','mimes:jpg,jpeg,png'],
            // 'image' => ['required', 'mimes:jpg,jpeg,png', 'mimetypes:image/jpeg,image/png'],
            'image' => 'required',
            'title' => ['required', 'max:10'],
            'description' => ['required', 'min:10', 'max:30'],
            // TODO:  validate price is number and positive
            'price' => ['required'],
            'category' => ['required'],
        ]);
        $image = request()->file('image');

        $image_name = time().'.'.$image->getClientOriginalExtension();
        $image->move('images/products/',$image_name);
        $formData['image'] = $image_name; 

        $newOffer = Offer::create($formData);

        return response(new OfferResource($newOffer), 201);
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
    public function destroy(Offer $offer)
    {
        // Delete the old image only if it exists
        if ($offer->image) {
            unlink('images/products/' . $offer->image);
        }        
        $offer->delete();
        return response('', 204);
    }
}
