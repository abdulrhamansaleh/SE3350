import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function GoogleAuthLogin({ setToken }) {
    const redirect = useNavigate()

    const onSuccess = async (response) => {
        const decoded = jwtDecode(response.credential);
        const email = decoded.email
    
        let uri = '/child/authenticate'
        const res = await axios.post(uri, {email: email})

        if (res.data.status == 200){
            setToken({loggedIn: true, accountId: res.data.id, type: ''})
            redirect('/cheer/home')
        }
        else{
            redirect('/cheer/signup')
        }
    }

    const onFailure = (res) => {
        console.log("Error Logging in", res)
    }

    return(
        <div id="oauth-sign-in">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
            />
        </div>
    )
}

export default GoogleAuthLogin