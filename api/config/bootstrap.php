<?php

// Turn on error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once $_SERVER['DOCUMENT_ROOT']. '/vendor/autoload.php';
//require_once 'vendor/autoload.php';


$isDevMode = true;

$config = Setup::createAnnotationMetadataConfiguration(array("/var/www/html/autotrack/api/model"), $isDevMode);

$conn = [
    'driver' => 'pdo_mysql',
    'host' => 'autotrack-database.cfoq8eyanp9q.us-east-1.rds.amazonaws.com',
    'dbname' => 'autotrack',
    'user' => 'admin',
    'password' => 'password',

];

try {
// obtaining the entity manager
    $entityManager = EntityManager::create($conn, $config);
} catch (Exception $e) {
    echo $e;
}

?>
