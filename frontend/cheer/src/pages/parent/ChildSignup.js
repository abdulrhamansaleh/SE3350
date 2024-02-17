import React, {useState} from 'react'
import './ChildSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChildSignup = () => {
    const parent_id = JSON.parse(sessionStorage.getItem("token")).account_id

    const redirect = useNavigate()

    const [data, setData] = useState({
        parent: parent_id,
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        verbal: "",
        special_needs: "",
    });

    const handleChange = ({currentTarget:input}) => {
    setData({...data,[input.name]:input.value})
}

const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        const url = `/parent/register-child`
        const res = await axios.post(url, data);

        if (res.data.status == 200) {
            redirect('/cheer/home')
        }
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
                                    value="1" 
                                    onChange={handleChange} 
                                    required /> Yes
                            </label>
                            <label>
                                <input type="radio" 
                                    name="verbal" 
                                    value="0" 
                                    onChange={handleChange} 
                                    required /> No
                            </label>
                        </fieldset>
                        <fieldset class="selectors">
                            <legend>Are they special needs ? </legend>
                            <label>
                                <input type="radio" 
                                    name="special_needs" 
                                    value="1" 
                                    onChange={handleChange} 
                                    required /> Yes
                            </label>
                            <label>
                                <input type="radio" 
                                    name="special_needs" 
                                    value="0" 
                                    onChange={handleChange} 
                                    required /> No
                            </label>
                        </fieldset>
                        <button type = "Submit" class="green_btn">
                            Register Child
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChildSignup;