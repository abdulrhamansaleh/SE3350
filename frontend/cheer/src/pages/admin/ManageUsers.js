import React from 'react'
import './styles/ManageUsers.css'
import CTable from '../../reusables/table/ManageAdminTable'

function ManageUsers() {
    const handleChange = ()=>{
        
    }
    const h =["First Name","Last Name","Email","Type","Verified?","Subscribed?"]
    const d = [{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" ,Prompt: "abcd efg hijklmno p qrs tuv wx yz" , requested_change: "no"},{First_Name:"Aug" ,Last_Name: "Zil", Email: "abc@gmail.com",Type:"user" ,Verified:"yes" ,Subscribed:"no" , requested_change: "yes"}]
    // const d = ["Aug","Zil","abc@gmail.com","user","yes","no",[""]]
    return (
        <div className='manageusers_main_container'>
            <div className='manageusers_search_container'>
                <select onChange={handleChange}>
                    <option>Everyone</option>
                    <option>Verified</option>
                    <option>Un-Verified</option>
                </select>

                <form>
                    <input placeholder='Search For'>

                    </input>
                </form>
            </div>
            <div className='manageuser_display_container'>  
                <CTable header={h} table_data={d}/>
            </div>
        </div>
    )
}

export default ManageUsers