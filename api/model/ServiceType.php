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
class ServiceType implements JsonSerializable
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

//    /**
//     * One servicetype has many services. This is the inverse side.
//     * @OneToMany(targetEntity="Service", mappedBy="servicetype", orphanRemoval=true)
//     */
//    private $services;

//    public function __construct() {
//        $this->services = new \Doctrine\Common\Collections\ArrayCollection();
//    }

    /**
     * @var int
     */
    /** @Column(type="integer") **/
    private $nextServiceDueMileage;

    /**
     * @return mixed
     */
    public function getNextServiceDueMileage()
    {
        return $this->nextServiceDueMileage;
    }

    /**
     * @param mixed $nextServiceDueMileage
     */
    public function setNextServiceDueMileage($nextServiceDueMileage)
    {
        $this->nextServiceDueMileage = $nextServiceDueMileage;
    }


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getFrequency()
    {
        return $this->frequency;
    }

    /**
     * @param mixed $frequency
     */
    public function setFrequency($frequency)
    {
        $this->frequency = $frequency;
    }

    /**
     * @return mixed
     */
    public function getCar()
    {
        return $this->car;
    }

    /**
     * @param mixed $car
     */
    public function setCar($car)
    {
        $this->car = $car;
    }

//    /**
//     * @return mixed
//     */
//    public function getServices()
//    {
//        return $this->services;
//    }

//    /**
//     * @param mixed $services
//     */
//    public function setServices($services)
//    {
//        $this->services = $services;
//    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'frequency' => $this->frequency,
            'nextServiceDueMileage' => $this->nextServiceDueMileage
        ];
    }

}