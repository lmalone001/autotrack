<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(isset($data->name) &&
    isset($data->frequency) &&
    isset($data->id)){

    // create the car
    try {
        $servicetype = read_by_id($entityManager, $data->id);

        $originalFreq = $servicetype->getFrequency();
        $freqDiff = $data->frequency - $originalFreq;

        $origNextDue = $servicetype->getNextServiceDueMileage();
        $newNextDue = $origNextDue + $freqDiff;

        $servicetype->setFrequency($data->frequency);
        $servicetype->setName($data->name);
        $servicetype->setNextServiceDueMileage($newNextDue);

        update_service_type($entityManager, $servicetype);

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Service was updated."));

    } catch (Exception $e) {

        // if unable to create the car, tell the user

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to update service. ". $e));
    }
} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to update service. Data is incomplete."));

}
?>
