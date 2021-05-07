<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/html; charset=UTF-8');

    $id = $_GET['id'];
    $name = $_GET['name'];
    
    // Create the size of image or blank image 
    $image = imagecreate(300, 300); 
    $qr = imageCreateFromPng("https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=".$id."&chld=M|1&choe=UTF-8");
    imageAlphaBlending($qr, true);
    imageSaveAlpha($qr, true);
    // Set the background color of image 
    $background_color = imagecolorallocate($image, 255, 255, 255); 

    // Set the text color of image 
    $text_color = imagecolorallocate($image, 0, 0, 0);
    $font_file = "./Mitr-Regular.ttf";

    // Function to create image which contains string. 
    $font_size = 10;
    // imagettftext($image, $font_size, 0, 20, 320, $text_color, $font_file, $name);

    header("Content-Type: image/png"); 
    imagecopymerge($image, $qr, 0, 0, 0, 0, 300, 300,100);
    imagepng($image); 
    imagedestroy($image); 
?>