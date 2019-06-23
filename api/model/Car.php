<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-05-29
 * Time: 20:27
 */

include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/User.php';
include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/ServiceType.php';



/**
 * @Entity @Table(name="car")
 **/
class Car implements JsonSerializable
{


    /** @Id @Column(type="integer") @GeneratedValue **/
    private $id;

    /** @Column(type="string") **/
    private $name;

    /** @Column(type="integer") options={"default":0})**/
    private $mileage;

    /**
     * One car has many serviceTypes. This is the inverse side.
     * @OneToMany(targetEntity="ServiceType", mappedBy="car")
     */
    private $serviceTypes;

    /**
     * Many cars have one user. This is the owning side.
     * @ManyToOne(targetEntity="User", inversedBy="cars")
     */
    private $user;

    public function __construct() {
       $serviceTypes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getServiceTypes()
    {
        return $this->serviceTypes;
    }

    /**
     * @param mixed $serviceTypes
     */
    public function setServiceTypes($serviceTypes)
    {
        $this->serviceTypes = $serviceTypes;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getId()
    {
        return $this->id;
    }

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
     * @param mixed $password
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    public function getMileage()
    {
        return $this->mileage;
    }

    public function setMileage($mileage)
    {
        $this->mileage = $mileage;
    }

    public function jsonSerialize() {
        return [
            'id'=>$this->id,
            'name' => $this->name,
            'mileage' => $this->mileage,
        ];
    }
}