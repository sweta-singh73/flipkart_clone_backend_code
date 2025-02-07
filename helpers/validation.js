// Empty field validation
const isEmpty = async (data) => {
  const arr = [];
  for (const [key, value] of Object.entries(data)) {
    if (value == "" || value == undefined || value == null) {
      arr.push(`${key} is required`);
    }
  }
  return arr;
};

// Trim extra spaces
const trimExtra = async (str) => {
  return str.trim(); // Return the trimmed string, not the original one
};

// Email validation
const emailValidator = async (email) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email && email.match(emailFormat)) {
    return true;
  }
  return false;
};

// Phone number validation
const phoneValidator = async (phone) => {
  const phoneFormat = /^((\+1)?[\s-]?)?\(?[1-9]\d\d\)?[\s-]?[1-9]\d\d[\s-]?\d\d\d\d/;
  if (phone && phone.match(phoneFormat)) {
    return true;
  }
  return false;
};

// Password validation
const passwordValidator = (password) => {
  let errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  if (password.search(/[a-z]/i) < 0) {
    errors.push("Password must contain at least one letter.");
  }

  if (password.search(/[0-9]/) < 0) {
    errors.push("Password must contain at least one digit.");
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: [] };
};

// Username validation (only lowercase letters, numbers, underscores, and dots)
const userNameValidator = async (username) => {
  const userNameFormat = /^[a-z0-9_\.]+$/;
  if (username && username.match(userNameFormat)) {
    return true;
  }
  return false;
};

// Name validation (only letters and spaces allowed)
const nameValidator = async (name) => {
  const nameFormat = /^[a-zA-Z ]+$/;
  if (name && name.match(nameFormat)) {
    return true;
  }
  return false;
};

// Validate all the data
const validateData = async (data) => {
  const arr = [];
  for (const [key, value] of Object.entries(data)) {
    if (key === "email") {
      const emailValid = await emailValidator(value);
      if (!emailValid) {
        arr.push(`${key} is invalid`);
      }
    } else if (key === "name") {
      const nameValid = await nameValidator(value);
      if (!nameValid) {
        arr.push(`${key} is invalid`);
      }
    } else if (key === "username") {
      const userNameValid = await userNameValidator(value);
      if (!userNameValid) {
        arr.push(`${key} is invalid`);
      }
    } else if (key === "phone") {
      const phoneValid = await phoneValidator(value);
      if (!phoneValid) {
        arr.push(`${key} is invalid`);
      }
    } else if (key === "password") {
      const { isValid, errors } = await passwordValidator(value);
      if (!isValid) {
        arr.push(`${key} is invalid: ${errors.join(", ")}`);
      }
    }
  }
  return arr;
};

// Handle all validation
const handleValidation = async (data, res) => {
  // First check if any required field is empty
  const emptyFields = await isEmpty(data);
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "All fields are required!", data: emptyFields });
  }

  // Now validate the individual fields
  const invalidData = await validateData(data);
  if (invalidData.length > 0) {
    return res
      .status(400)
      .json({ message: "Data must be valid!", data: invalidData });
  }

  return null; // No errors, proceed with the request
};

module.exports = {
  isEmpty,
  emailValidator,
  phoneValidator,
  passwordValidator,
  userNameValidator,
  trimExtra,
  nameValidator,
  validateData,
  handleValidation
};
