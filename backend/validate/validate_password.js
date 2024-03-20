const exp = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,16}$/;

const validate_password = (password) =>{
    if(password.match(exp)){
        return true
    }
    return false
}

module.exports = validate_password