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
class Service {

    /** @Id @Column(type="integer") @GeneratedValue **/
    private $id;

    /**
     * Many services have one servicetype. This is the owning side.
     * @ManyToOne(targetEntity="ServiceType")
     * @JoinColumn(name="serviceTypeId", referencedColumnName="id")
     */
    protected $serviceType;

    /** @Column(type="date")**/
    private $date;

    /** @Column(type="integer")**/
    private $mileage;

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
    public function getServiceType()
    {
        return $this->serviceType;
    }

    /**
     * @param mixed $serviceType
     */
    public function setServiceType($serviceType)
    {
        $this->serviceType = $serviceType;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @return mixed
     */
    public function getMileage()
    {
        return $this->mileage;
    }

    /**
     * @param mixed $mileage
     */
    public function setMileage($mileage)
    {
        $this->mileage = $mileage;
    }

}