function validateEmployeeData(employeeData) {
    const { name, phoneNumber, Designation, JoiningDate } = employeeData;
    console.log(employeeData)
    // Validation for name (only alphabets, length between 2 and 50)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!name || !nameRegex.test(name)) {
      return { valid: false, message: "Name should contain only alphabets and must be between 2 and 50 characters." };
    }
  
    // Validation for phoneNumber (valid 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return { valid: false, message: "Phone number must be a valid 10-digit number." };
    }
  
    // Validation for designation (non-empty string)
    if (!Designation || Designation.trim() === "") {
      return { valid: false, message: "Designation is required and cannot be empty." };
    }
  
    // Validation for joinDate (must be a valid date)
    if (!JoiningDate || isNaN(Date.parse(JoiningDate))) {
      return { valid: false, message: "Join date must be a valid date." };
    }
  
    // If all validations pass
    return { valid: true, message: "Validation successful" };
  }

  export default validateEmployeeData