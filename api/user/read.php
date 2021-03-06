<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/User.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/user/functions.php';

//query products
$array = readAllUsers($entityManager);
$num = count($array);

// check if more than 0 record found
if($num>0) {

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($array);
} else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "No users found.")
    );
}