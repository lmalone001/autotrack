<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-05-29
 * Time: 20:45
 */


/**
 * @Entity @Table(name="service")
 **/
class Service
{

    /** @Id @Column(type="integer") @GeneratedValue **/
    private $id;

    /**
     * Many services have one servicetype. This is the owning side.
     * @ManyToOne(targetEntity="ServiceType", inversedBy="services")
     */
    private $serviceType;


    /** @Column(type="date")**/
    private $date;


    /** @Column(type="integer")**/
    private $mileage;

}