 const isValid = (value) =>{
    if(typeof value === 'null'||typeof value === 'undefined'){
        return false;
 } if(typeof value === 'string' && value.trim().length ==0){
    return false;
 }else{
    return true;
 }
}


module.exports = {isValid}