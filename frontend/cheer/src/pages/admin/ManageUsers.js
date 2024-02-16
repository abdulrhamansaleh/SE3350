import React, {useEffect, useState} from 'react'
import './styles/ManageUsers.css'
import CTable from '../../reusables/table/ManageAdminTable'

function ManageUsers() {
    const [rows, setRows] = useState([])

    useEffect(()=>{
        fetch("/admin/get/users",{

        }).then(
            response=>{if(response.ok)return response.json()}
        ).then(
            data=>setRows(data) 
        )
    },[])

    const handleChange = ()=>{
        fetch("/admin/get/users",{

        }).then(
            response=>{if(response.ok)return response.json()}
        ).then(
            data=>setRows(data) 
        )
    }
    const h =["First Name","Last Name","Email","Type","Verified?","Subscribed?"]
    const d = [{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"},]

    return (
        <div className='manageusers_main_container'>
            <div className='manageusers_search_container'>
                <select onChange={handleChange}>
                    <option>Everyone</option>
                    <option>Verified</option>
                    <option>Un-Verified</option>
                    <option>Subscribed</option>
                    <option>Requested Change</option>
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
            {console.log({rows})}
                <CTable table_data={rows}/>
            </div>
        </div>
    )
}

export default ManageUsers