<?php
// required headers
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(empty($data->serviceTypeId)) {

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Data is incomplete."));

} else {

    $serviceType = read_by_id($entityManager, $data->serviceTypeId);
    if (!$serviceType) {

        http_response_code(404);

        // tell the user no car found
        echo json_encode(
            array("message" => "ServiceType not found.")
        );
    }  else  {

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode(
            $serviceType
        );
    }
}




