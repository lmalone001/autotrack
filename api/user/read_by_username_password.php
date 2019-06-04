<?php
// required headers
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// get database connection
include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';

// instantiate product object
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/User.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/user/functions.php';


// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(empty($data->username) ||
    empty($data->password)) {

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Data is incomplete."));

}

$user = read_user_by_username($entityManager, $data->username);
if (!$user) {


    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "Username not found. Please register.")
    );
} else {
    if ($user->getPassword() == $data->password) {

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode(
            array("user" => $user)
        );
    } else {

        // set response code - 404 Not found
        http_response_code(404);

        // tell the user no products found
        echo json_encode(
            array("message" => "Authentication failed. Please try again.")
        );
    }
}




