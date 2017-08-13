<?php
/*
if($_FILES['file']['name']){
    $filename = uniqid() . '.jpg';
    echo $filename;
    move_uploaded_file($_FILES['file']['tmp_name'],"../images/user/".$filename);
}
*/
$meta = $_POST;
$name = $meta["name"];
if(isset($_FILES['file'])){
    //The error validation could be done on the javascript client side.
    $errors= array();
    $file_name = date("Y_m_d_H_i_s").$name.$_FILES['file']['name'];
    $file_size =$_FILES['file']['size'];
    $file_tmp =$_FILES['file']['tmp_name'];
    $file_type=$_FILES['file']['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg","jpg","png");

    if(in_array($file_ext,$extensions) === false){
        $errors[]="image extension not allowed, please choose a JPEG or PNG file.";
    }
    if($file_size > 10485760){
        $errors[]='File size cannot exceed 10 MB';
    }

    if(empty($errors)==true){
        move_uploaded_file($file_tmp,"../images/search/".$file_name);



        $image_url = "../images/search/".$file_name;

// Get cURL resource
        $curl = curl_init();
// Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'http://api.walmartlabs.com/v1/search?query='.$keyword.'&format=json&apiKey=3u6ydbbsx8kz4ncfsgrdjqkx',
            CURLOPT_USERAGENT => 'Codular Sample cURL Request'
        ));
// Send the request & save response to $resp
        $resp = curl_exec($curl);

        echo $resp;

        // echo 'orange';
        // echo $file_name;
    }else{
        echo 'apple-fruit';
    }
}