<?php
/**
 * Created by PhpStorm.
 * User: Lauren
 * Date: 2019-05-27
 * Time: 17:29
 */

include_once $_SERVER['DOCUMENT_ROOT']. '/api/model/Car.php';

/**
 * @Entity @Table(name="user")
 **/
class User implements JsonSerializable
{

    /** @Id @Column(type="integer") @GeneratedValue **/
    private $id;

    /** @Column(type="string", unique=true) **/
    private $username;

    /** @Column(type="string") **/
    private $password;

    /**
     * @return mixed
     */
    public function getCars()
    {
        return $this->cars;
    }

    /**
     * @param mixed $cars
     */
    public function setCars($cars)
    {
        $this->cars = $cars;
    }

    /**
     * One user has many cars. This is the inverse side.
     * @OneToMany(targetEntity="Car", mappedBy="user")
     */
    private $cars;

    public function __construct() {
        $cars = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($name)
    {
        $this->username = $name;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'password' => $this->password
        ];
    }
}