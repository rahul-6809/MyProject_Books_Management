


const ObjectId = require("mongoose").Types.ObjectId
//==Mandatory Field Validation

const isValid = (value) =>{
    if(typeof value === 'null'||typeof value === 'undefined'){
        return false;
 } if(typeof value === 'string' && value.trim().length ==0){
    return false;
 }else{
    return true;
 }
}


//==ISBN Validation
// let isValidISBN=function(value){
//    let isbnRegex=/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
//    return isbnRegex.test(value);
// } 


//==Date Validation
let isValidDate = function(value) {
   let regEx = /^\d{4}-\d{2}-\d{2}$/;
   return regEx.test(value);
 }



//==ObjectId Validation
 let isValidObjectId = function (objectId) {
   if (!ObjectId.isValid(objectId)) return false;
   return true;
}


let isValidName=function(name){
   let nameRegex=/^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
   return nameRegex.test(name);
   }




   let isValidRequestBody = function (body) {
      if (Object.keys(body).length === 0) return false;
      return true;
   }


module.exports = {isValid,isValidDate,isValidObjectId,isValidName,isValidRequestBody}