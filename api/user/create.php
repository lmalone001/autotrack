<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';

// instantiate product object
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/User.php';

include_once $_SERVER['DOCUMENT_ROOT']. '/api/user/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(!empty($data->username) &&
    !empty($data->password)){

    try {
        // create the user
        $user = new User();
        $user->setUsername($data->username);
        $user->setPassword($data->password);
        createUser($entityManager, $user);

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "user was created."));

    } catch (Exception $e) {

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create user. ". $e));
    }

} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>
