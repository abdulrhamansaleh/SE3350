import React, {useState} from 'react'
import './ChildSignup.css';
import axios from 'axios'

import useToken from '../../reusables/tokenHook/useToken';

const ChildSignup = ({parent}) => {
    const [data, setData] = useState({
        parent: parent,
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        isVerbal: "",
        isSpecialNeed: "",
    });

    const handleChange = ({currentTarget:input}) => {
    setData({...data,[input.name]:input.value})
}

// fetch registration API endpoint 
const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        const url = `http://localhost:8080/parent/register-child`
        const {data: res} = await axios.post(url, data);
    }
    catch(err){
    }
}
    return(
        <div class="signup_container">
            <div class="signup_form_container">
                <div class="right">
                    <form class="form_container" onSubmit={handleSubmit}>
                        <h1>Register Your Child</h1>
                        <input type="text" 
                        placeholder="First Name"
                        name = 'first_name'
                        onChange={handleChange}
                        value = {data.first_name}
                        required
                        class="input"
                        />
                        <input type="text" 
                        placeholder="Last Name"
                        name = 'last_name'
                        onChange={handleChange}
                        value = {data.last_name}
                        required
                        class="input"
                        />
                        <input type="text" 
                        placeholder="Email"
                        name = 'email'
                        onChange={handleChange}
                        value = {data.email}
                        required
                        class="input"
                        />
                        <input type="number" 
                        placeholder="Age"
                        name = 'age'
                        onChange={handleChange}
                        value = {data.age}
                        required
                        class="input"
                        />
                        <fieldset class="selectors">
                            <legend>Are they verbal ?</legend>
                            <label>
                                <input type="radio" 
                                    name="verbal" 
                                    value="yes" 
                                    onChange={handleChange} 
                                    required /> Yes
                            </label>
                            <label>
                                <input type="radio" 
                                    name="verbal" 
                                    value="no" 
                                    onChange={handleChange} 
                                    required /> No
                            </label>
                        </fieldset>
                        <fieldset class="selectors">
                            <legend>Are they special needs ? </legend>
                            <label>
                                <input type="radio" 
                                    name="special_needs" 
                                    value="yes" 
                                    onChange={handleChange} 
                                    required /> Yes
                            </label>
                            <label>
                                <input type="radio" 
                                    name="special_needs" 
                                    value="no" 
                                    onChange={handleChange} 
                                    required /> No
                            </label>
                        </fieldset>
                        <button type = "Submit" class="green_btn">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChildSignup;