import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const OAUTH_CLIENT_SECRET = "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"

function GoogleAuthLogin() {
    const redirect = useNavigate()

    const onSuccess = async (response) => {
        const decoded = jwtDecode(response.credential);
        const email = decoded.email
    
        let uri = '/child/authenticate'
        const res = await axios.post(uri, {email: email})

        if (res.status != 200) {
            
        }

        redirect('/cheer/home')
    }

    const onFailure = (res) => {
        console.log("Error Logging in", res)
    }

    return(
        <div id="oauth-sign-in">
            <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            />;
        </div>
    )
}

export default GoogleAuthLogin