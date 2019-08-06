<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Car.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/car/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(isset($data->id)) {

    // create the car
    try {

        delete_car($entityManager, $data->id);

        // set response code - 201 deleted
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Car was deleted."));


    } catch (Exception $e) {

        // if unable to deleted the car, tell the user
        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to delete car. ". $e));
    }
} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to delete car. Data is incomplete."));

}
?>
