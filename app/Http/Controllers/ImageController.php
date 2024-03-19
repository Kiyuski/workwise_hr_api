<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {

    
        $base64Image = $request->input('image');
        $image = $base64Image;
      
        if (strpos($base64Image, 'data:image/') === 0) {
            $imageInfo = explode(";base64,", $base64Image);
            $imgExt = str_replace('data:image/', '', $imageInfo[0]);
            $image = $imageInfo[1]; // Use $imageInfo[1] to get the base64 image data
            $name = \Str::random(40) . '.' . $imgExt;

            $filePath = "image" . '/' . $name;
            Storage::put($filePath, base64_decode($image));
            $url = url($filePath);;
            return $url; // Return the URL instead of the file path
        } else {
            return null;
        }
                


    }


    
    
}
