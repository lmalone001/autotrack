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
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Service.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';


include_once $_SERVER['DOCUMENT_ROOT']. '/api/service/functions.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(isset($data->serviceTypeId)){

    // create the car
    try {
        $service = new Service();
        $serviceType = read_servicetype_by_id($entityManager, $data->serviceTypeId);
        $service->setServiceType($serviceType);
        $service->setMileage($serviceType->getCar()->getMileage());
        $service->setDate(new DateTime());
        create_service($entityManager, $service);

        // now update the service type's next scheduled service.
        $nextSchedMileage = $service->getMileage() + $serviceType->getFrequency();
        $serviceType->setNextServiceDueMileage($nextSchedMileage);
        update_service_type($entityManager, $serviceType);


        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Way to take care of your car!"));

    } catch (Exception $e) {

        // if unable to create the car, tell the user

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to record service. ". $e));
    }
} else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to record service. Data is incomplete."));

}
?>
