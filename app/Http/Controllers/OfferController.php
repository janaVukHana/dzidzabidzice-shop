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
        // MOZE I StoreProductRequest $request CLASS DA SE NAPRAVI kao CodeHolic
        $formData = $request->validate([
            'image' => ['nullable', 'sometimes', 'image', 'mimes:jpeg,jpg,png,webp'],
            'title' => ['required', 'min:6','max:20'],
            'description' => ['required', 'min:20', 'max:100'],
            'price' => ['required','numeric','gt:0'],
            'category' => ['required'],
        ]);
        
        if($request->hasFile('image')) {
            $image = request()->file('image');
            $image_name = time().'.'.$image->getClientOriginalExtension();
            $image->move('images/products/',$image_name);
            $formData['image'] = $image_name; 
        }

        $newOffer = Offer::create($formData);

        return response(new OfferResource($newOffer), 201);
        // 201 == the request has succeeded and has led to the creation of a resource.
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Offer::find($id);

        if (!$product) {
            return response()->json(['product' => 'Product not found'], 404);
        }

        return new OfferResource($product);
    }

    public function update(Request $request, string $id)
    {
        $product = Offer::find($id);

        if (!$product) {
            return response()->json(['product' => 'Product not found'], 404);
        }

        $formData = $request->validate([
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp'],
            'title' => ['required', 'min:6','max:20'],
            'description' => ['required', 'min:20', 'max:100'],
            'price' => ['required','numeric','gt:0'],
            'category' => ['required'],
        ]);

        if ($request->hasFile('image')) {
            // New image provided, handle the upload and update logic
            $image = $request->file('image');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move('images/products/', $image_name);
            $formData['image'] = $image_name;

            // Delete the old image only if it exists
            if ($product->image) {
                unlink('images/products/' . $product->image);
            }
        } else {
            // No new image provided, keep the existing image
            // $formData['image'] = $product->image;
            // No new image provided, keep the existing image
            unset($formData['image']); // Remove the 'image' field from the $formData array
        }

        $product->update($formData);

        return new OfferResource($product);
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
