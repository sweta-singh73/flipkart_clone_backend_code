//Empty validation
const isEmpty = async(data)=>{
const arr = [];
for(const [key, value]  of Object.entries(data)){
  if(value == "" || value == undefined || value == null ){
    arr.push(`${key} is required`)
  }
}
  return arr;
}

//trim extra spaces validation 
let trimExtra = async (str) => {
  var trimedStr = str.trim();
  console.log(trimedStr);
  return str;
}

//email validation
const emailValodator = async(email)=>{
  const emailFormate =  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if(email !=="" && email.match(emailFormate)){
    return true;
  }
  return false;
}

//phone number validator 
const phoneValidator = async(phone)=>{
const phoneFormate = /^((\+1)?[\s-]?)?\(?[1-9]\d\d\)?[\s-]?[1-9]\d\d[\s-]?\d\d\d\d/;
if(phone !=="" && phone.match(phoneFormate)){
  return true;
}
return false;
}

//password validation
const passwordValidator = (password) => {
  let errors = [];

  if (password.length < 8) {
    errors.push("Your password must be at least 8 characters.");
  }

  if (password.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }

  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: [] };
};

//username validation
const userNameValidator = async(username)=>{
  const userNameFormate = /^[a-z0-9_\.]+$/;
  if(username !== "" && username.match(userNameFormate)){
    return true;
  }
  return false;
}

//name validation
const nameValidator = async(name)=>{
  const nameFormate = /^[a-zA-Z ]+$/;
  if(name !== "" && name.match(nameFormate)){
    return true;
  }
  return false;
}

// validate all validation data
const validateData = async(data)=>{
  const arr = [];
  for(const [key, value] of Object.entries(data)){
    if(key == email){
      const emailValid = await emailValodator(value);
      if(!emailValid){
        arr.push(`${key} is invalid`);
      }
    }
    else if(key == name){
      const nameValid = await nameValidator(value)
        if(!nameValid){
          arr.push(`${key} is invalid`)
        }
    }
    else if(key == username){
      const userNameValid = await userNameValidator(value)
      if(!userNameValid){
        arr.push(`${key} is invalid`)
      }
    }
    else if(key == phone){
      const phoneValid = await phoneValidator(value)
      if(!phoneValid){
        arr.push(`${key} is invalid`)
      }
    }
    else if (key == "password") {
      let passwordValid = await passwordValidator(value);
      if (!passwordValid.isValid) {
          arr.push(`${key} is invalid: ${passwordValid.errors.join(", ")}`);
      }
  }

  }
  return arr;
}
//handle the validation of the request body
const handleValidation = async (data, res) => {
  const emptyFields = await isEmpty(data);
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "All fields are required!", data: emptyFields });
  }

  const invalidData = await validateData(data);
  if (invalidData.length > 0) {
    return res
      .status(400)
      .json({ message: "Data must be valid!", data: invalidData });
  }
  return null; // Return null if there are no validation errors
};





module.exports = { 
  isEmpty,
  emailValodator,
  phoneValidator,
  passwordValidator,
  userNameValidator,
  trimExtra,
  nameValidator,
  validateData,
  handleValidation
} 




