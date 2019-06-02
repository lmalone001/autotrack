<?php

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once $_SERVER['DOCUMENT_ROOT']. '/vendor/autoload.php';


// Create a simple "default" Doctrine ORM configuration for Annotations
$isDevMode = true;

$config = Setup::createAnnotationMetadataConfiguration(array("/var/www/html/api/model"), $isDevMode);

$conn = [
    'driver' => 'pdo_mysql',
    'host' => 'localhost',
    'dbname' => 'autotrack',
    'user' => 'admin',
    'password' => 'password',

];

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);

?>
