<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-06-01
 * Time: 10:19
 */

function read_user_by_id($entityManager, $id) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('u')
        ->from('User', 'u')
        ->where('u.id = ?1')
        ->setParameter(1, $id);

    $query = $qb->getQuery();

    $user = $query->getSingleResult();
    return $user;
}

function read_user_by_username($entityManager, $username) {
    $qb = $entityManager->createQueryBuilder();
    $qb->select('u')
        ->from('User', 'u')
        ->where('u.username = ?1')
        ->setParameter(1, $username);

    $query = $qb->getQuery();

        $user = $query->getSingleResult();
        return $user;
}

function createUser($entityManager, $user) {
    $entityManager->persist($user);
    $entityManager->flush();

}

function readAllUsers($entityManager) {


    $qb = $entityManager->createQueryBuilder();
    $qb->select('u')
        ->from('User', 'u');
    $query = $qb->getQuery();

    $array = $query->getArrayResult();
    return $array;
}