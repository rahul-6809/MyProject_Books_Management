



//==Mandatory Field Validation

let isValid = function (value) {
   if (typeof value === 'undefined' || value === null) return false;
   if (typeof value === 'string' && value.trim().length === 0) return false;
   return true;
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



//name valide


let isValidName=function(name){
   let nameRegex=/^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
   return nameRegex.test(name);
   }




   


module.exports = {isValid,isValidDate,isValidName}