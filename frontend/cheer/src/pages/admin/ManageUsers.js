import React, {useEffect, useState} from 'react'
import './styles/ManageUsers.css'
import CTable from '../../reusables/table/ManageAdminTable'

function ManageUsers() {
    const [type, setType] = useState("Everyone")

    const handleChange = ()=>{
        setType(document.getElementById("user_type_dropdown").value)
        console.log(type)
    }
    const h =["First Name","Last Name","Email","Type","Verified?","Subscribed?"]
    const d = [{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},]

    return (
        <div className='manageusers_main_container'>
            <div className='manageusers_search_container'>
                <select onChange={handleChange} id="user_type_dropdown">
                    <option>Everyone</option>
                    <option>Verified</option>
                    <option>Un-Verified</option>
                    <option>Subscribed</option>
                    <option>Requested-Change</option>
                    <option>Users</option>
                    <option>Parents</option>
                    <option>Employees</option>
                </select>

                <form>
                    <input placeholder='Search For'>

                    </input>
                </form>
            </div>
            <div className='manageuser_display_container'>  
                <CTable url={"/admin/get/users"} type={type}/>
            </div>
        </div>
    )
}

export default ManageUsers