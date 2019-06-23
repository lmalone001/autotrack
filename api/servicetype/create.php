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
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Car.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';


include_once $_SERVER['DOCUMENT_ROOT']. '/api/car/functions.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty

if(isset($data->name) &&
    isset($data->frequency) &&
    isset($data->carid)){

    // create the car
    try {
        $serviceType = new ServiceType();
        $serviceType->setName($data->name);
        $serviceType->setFrequency($data->frequency);
        $car = read_car_by_id($entityManager, $data->carid);
        $serviceType->setCar($car);
        $serviceType->setNextServiceDueMileage(0);
        create_servicetype($entityManager, $serviceType);

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Service was added to the schedule."));

    } catch (Exception $e) {

        // if unable to create the servicetype, tell the user

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to add the service. ". $e));
    }
} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create servicetype. Data is incomplete."));

}
?>
