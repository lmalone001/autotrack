<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-06-22
 * Time: 16:59
 */
// get database connection
include_once $_SERVER['DOCUMENT_ROOT']. '/api/config/bootstrap.php';

// instantiate product object
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Car.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';


include_once $_SERVER['DOCUMENT_ROOT']. '/api/car/functions.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';


//$servicetype = $entityManager->getRepository('ServiceType')->find(1);
$qb = $entityManager->createQueryBuilder();

$qb->select('c')
    ->from('ServiceType', 'c')
    ->where('c.id = ?1')
    ->setParameter(1, 1);

$query = $qb->getQuery();

$servicetype = $query->getSingleResult();
//echo var_dump($servicetype);
//
$services = $servicetype->getName();
var_dump($services);
//foreach ($services as $service) {
//    echo $service->getId();
//}
//return $car;

//for ($servicetype->getServices() as $service) {
//    echo $service->getId();
//}
//echo var_dump($services);
//$services = $servicetype->getServices();
//var_dump($services);
//foreach ($services as $service) {
//    echo $service->getId();
//}
//echo sizeof($services);
//var_dump($services);
//foreach ($services as $service) {
//    echo $service->getId();
//}
$entityManager->remove($servicetype);
//$entityManager->flush();

//$car = read_car_by_id($entityManager, 1);
//$serviceTypes = read_servicetypes_by_car($entityManager, $car);
//var_dump($serviceTypes);
//foreach ($serviceTypes as $serviceType ) {
//    var_dump($serviceTypes);
//    $services = $serviceType->getServices();
//    foreach ($serviceTy as $service) {
//        echo var_dump($service);
//        echo $service->getId();
//    }
//}
