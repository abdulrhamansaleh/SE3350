const exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate_email = (email)=>{
    if(email.match(exp)){
        return true
    }
    return false
}

module.exports = validate_email