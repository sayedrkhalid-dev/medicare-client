export const validateRegForm = () => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!registerData.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (registerData.firstName.trim().length < 2) {
    errors.firstName = "Must be at least 2 characters";
  }

  if (!registerData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!registerData.email) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(registerData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!registerData.password) {
    errors.password = "Password is required";
  } else if (strengthScore < 2) {
    errors.password = "Password is too weak (Use numbers, upper cases)";
  }

  if (!registerData.agreeToTerms) {
    errors.agreeToTerms = "You must accept the terms to proceed";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
