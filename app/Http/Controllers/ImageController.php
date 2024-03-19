<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function upload(Request $request)
    {

       
        $base64Image = $request->input('image');
        $image = $base64Image;
        if (preg_match('/base64/', $base64Image)) {
            $imageInfo = explode(";base64,", $image);
            $imgExt = str_replace('data:image/', '', $imageInfo[0]);

            $image = substr($image, strpos($image, ",") + 1);
            $name = \Str::random(40) . '.' . $imgExt;

           
            $filePath = "upload/image" . '/' . $name;
        
            // \Storage::put($filePath, base64_decode($image));
            return $image;
        } else {
            return null;
        }
        


    }
}
