const clean_number = (number)=>{
    //if you have a prettier way of doing this, feel free. 
    //This replaces all (, ), -, _ in the phone number string so it fits in the db
    number = number.replaceAll('(','')
    number = number.replaceAll(')','')
    number = number.replaceAll('-','')
    number = number.replaceAll('_','')
    return number
}

module.exports = clean_number