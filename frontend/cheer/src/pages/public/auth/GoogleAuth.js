import { GoogleLogin } from '@react-oauth/google';
const OAUTH_CLIENT_SECRET = "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"

function GoogleAuthLogin() {
    const onSuccess = (res) => {
        console.log("Logged In", res)
    }

    const onFailure = (res) => {
        console.log("Error Logging in", res)
    }

    return(
        <div id="oauth-sign-in">
            <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />;
        </div>
    )
}

export default GoogleAuthLogin