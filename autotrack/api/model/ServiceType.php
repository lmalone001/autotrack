<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-05-30
 * Time: 20:28
 */

include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Car.php';

include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Service.php';

/**
 * @Entity @Table(name="servicetype")
 **/
class ServiceType
{
    /**
     * @var int
     */
    /** @Id @Column(type="integer") @GeneratedValue **/
    private $id;

    /**
     * @var string
     */
    /** @Column(type="string") **/
    private $name;

    /**
     * @var int
     */
    /** @Column(type="integer") **/
    private $frequency;

    /**
     * Many serviceTypes have one car. This is the owning side.
     * @ManyToOne(targetEntity="Car", inversedBy="serviceTypes")
     */
    private $car;

    /**
     * One user has many cars. This is the inverse side.
     * @OneToMany(targetEntity="Car", mappedBy="user")
     */
    /**
     * One servicetype has many services. This is the inverse side.
     * @OneToMany(targetEntity="Service", mappedBy="servicetype")
     */
    private $services;
}