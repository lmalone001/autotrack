<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-06-01
 * Time: 10:35
 *
 *
 */

include_once $_SERVER['DOCUMENT_ROOT']. '/api/servicetype/functions.php';

function create_car($entityManager, $car) {

    $entityManager->persist($car);
    $entityManager->flush();
}

function read_cars_by_userid($entityManager, $user) {

    $qb = $entityManager->createQueryBuilder();
    $qb->select('c')
        ->from('Car', 'c')
        ->where('c.user = ?1')
        ->setParameter(1, $user);
    $query = $qb->getQuery();
    $array = $query->getArrayResult();
    return $array;
}

function read_car_by_id($entityManager, $id) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('c')
        ->from('Car', 'c')
        ->where('c.id = ?1')
        ->setParameter(1, $id);

    $query = $qb->getQuery();
    $car = $query->getSingleResult();
    return $car;
}

function update_car($entityManager, $car) {
    $entityManager->merge($car);
    $entityManager->flush();

}

function delete_car($entityManager, $id) {
    $car = $entityManager->getRepository('Car')->find($id);

    $entityManager->remove($car);
    $entityManager->flush();

}



