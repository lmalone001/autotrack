<?php
// cli-config.php
require_once $_SERVER['DOCUMENT_ROOT']. 'api/config/bootstrap.php';

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
?>