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
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';

include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/service/functions.php';


// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(isset($data->id)) {

    // create the car
    try {
//        $services = read_services_by_service_type_id($entityManager, $data->id);
//        foreach ($services as $service) {
//            echo $service;
//            delete_service($entityManager, $service);
//        }
        delete_service_type($entityManager, $data->id);

        // set response code - 201 deleted
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Service was deleted."));

    } catch (Exception $e) {

        // if unable to deleted the servicetype, tell the user

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to delete service. ". $e));
    }
} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to delete service. Data is incomplete."));

}
?>