<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Http\Resources\ImageResource;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageResource::collection(Image::orderBy('id', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // MOZE I StoreProductRequest $request CLASS DA SE NAPRAVI kao CodeHolic
        $formData = $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp'],
            'title' => ['required', 'max:10'],
            'rows' => ['min:1', 'max:2'],
            'cols' => ['min:1', 'max:2'],
        ]);
        $image = request()->file('image');

        $image_name = time().'.'.$image->getClientOriginalExtension();
        $image->move('images/gallery/',$image_name);
        $formData['image'] = $image_name; 

        $gallery_img = Image::create($formData);

        return response(new ImageResource($gallery_img), 201);
        // 201 == the request has succeeded and has led to the creation of a resource.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // Delete the old image only if it exists
        if ($image->image) {
            unlink('images/gallery/' . $image->image);
        }        
        $image->delete();
        return response('', 204);
    }

}