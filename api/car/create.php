<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Car.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/user/functions.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/car/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(isset($data->name) &&
    isset($data->mileage) &&
    isset($data->userid)){

    // create the car
    try {
        $car = new Car();
        $car->setMileage($data->mileage);
        $car->setName($data->name);
        $user = read_user_by_id($entityManager, $data->userid);
        $car->setUser($user);
        create_car($entityManager, $car);

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Car was created."));

    } catch (Exception $e) {

        // if unable to create the car, tell the user

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create car. ". $e));
    }
} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create car. Data is incomplete."));

}
?>
