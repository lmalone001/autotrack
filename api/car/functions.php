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
//    $qb = $entityManager->createQueryBuilder();
//    $qb->update('c')
//        ->from('Car', 'c')
//        ->set('c.name', '?1')
//        ->set('c.mileage', '?2')
//        ->where('c.id = ?3')
//        ->setParameter(1, $car->getName())
//    ->setParameter(1, $car->getMileage())
//
//    ->setParameter(3, $car->getId());
//
//
//    $query = $qb->getQuery();
//    $query->execute();
    $entityManager->merge($car);
    $entityManager->flush();

//    $car = $query->getSingleResult();
//    return $car;
//    $car = $entityManager->getRepository('Car')->find($car->getId());
//    $entityManager->update($car);
//    $entityManager->flush();
}

function delete_car($entityManager, $id) {
    $car = $entityManager->getRepository('Car')->find($id);
    $entityManager->remove($car);
    $entityManager->flush();

}