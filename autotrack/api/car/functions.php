<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-06-01
 * Time: 10:35
 */
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