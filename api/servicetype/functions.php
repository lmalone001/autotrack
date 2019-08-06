<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-06-11
 * Time: 19:53
 */
include_once $_SERVER['DOCUMENT_ROOT']. '/api/service/functions.php';

function create_servicetype($entityManager, $servicetype) {

    $entityManager->persist($servicetype);
    $entityManager->flush();
}

function read_servicetypes_by_car($entityManager, $car) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('s')
        ->from('ServiceType', 's')
        ->where('s.car = ?1')
        ->setParameter(1, $car);

    $query = $qb->getQuery();

    $serviceTypes = $query->getArrayResult();
    return $serviceTypes;
}

function read_servicetype_by_id($entityManager, $id) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('s')
        ->from('ServiceType', 's')
        ->where('s.id = ?1')
        ->setParameter(1, $id);

    $query = $qb->getQuery();

    $serviceType = $query->getSingleResult();
    return $serviceType;
}

function delete_service_type($entityManager, $id) {
    $serviceType = $entityManager->getRepository('ServiceType')->find($id);
    $entityManager->remove($serviceType);
    $entityManager->flush();

}

function update_service_type($entityManager, $serviceType) {
    $entityManager->merge($serviceType);
    $entityManager->flush();
}

function read_by_id($entityManager, $id) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('s')
        ->from('ServiceType', 's')
        ->where('s.id = ?1')
        ->setParameter(1, $id);

    $query = $qb->getQuery();

    $serviceType = $query->getSingleResult();
    return $serviceType;
}
