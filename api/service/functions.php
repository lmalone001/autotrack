<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-06-11
 * Time: 20:02
 */

function create_service($entityManager, $service) {

    $entityManager->persist($service);
    $entityManager->flush();
}

function delete_service($entityManager, $service) {

    $entityManager->remove($service);
    $entityManager->flush();
}

function read_services_by_service_type($entityManager, $serviceType) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('s')
        ->from('Service', 's')
        ->where('s.serviceType = ?1')
        ->setParameter(1, $serviceType);

    $query = $qb->getQuery();

    $services = $query->getArrayResult();
    return $services;
}