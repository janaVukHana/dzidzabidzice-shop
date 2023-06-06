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
        // TODO: before storing image in database and folder gallery i want to
        // validate that image is unique

        // MOZE I StoreProductRequest $request CLASS DA SE NAPRAVI kao CodeHolic
        $formData = $request->validate([
            'title' => ['required', 'max:10'],
            // TODO: check later is one of this going to work!!!
            // 'image' => ['required','mimes:jpg,jpeg,png'],
            // 'image' => ['required', 'mimes:jpg,jpeg,png', 'mimetypes:image/jpeg,image/png'],
            'image' => 'required',
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
