import { authClient } from "@/lib/auth-client";

export const handleRoleSelect = (selectedRole) => {
  setRegisterData((prev) => ({ ...prev, role: selectedRole }));
};

export const handleGenderSelect = (selectedGender) => {
  setRegisterData((prev) => ({ ...prev, gender: selectedGender }));
};

export const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  setSubmitError("");

  if (validateForm()) {
    // authClient handles the API request lifecycle seamlessly
    const { data, error } = await authClient.signUp.email({
      email: registerData.email,
      password: registerData.password,
      name: `${registerData.firstName.trim()} ${registerData.lastName.trim()}`,
      image: registerData.imageUrl.trim() || undefined, // use undefined if blank so it doesn't send an empty string

      // authClient automatically structuralizes 'data' properties for backend validation rules!
      data: {
        role: registerData.role,
        gender: registerData.gender,
      },
    });

    if (error) {
      // better-auth returns structured error objects (e.g., error.message or error.status)
      setSubmitError(
        error.message || "An authentication schema error occurred.",
      );
      console.error("Registration error detail:", error);
      return;
    }

    // Success! The session cookie is managed automatically by the client helper
    console.log("Registration successful! Session created:", data);

    // Redirect user to workspace or profile home
    // window.location.href = "/dashboard";
  } else {
    setSubmitError(
      "Please correct the errors indicated below before resubmitting.",
    );
  }
};

export const handleRegisterChange = (e) => {
  const { id, value, type, checked } = e.target;
  const fieldName = id.replace("reg-", "");

  setRegisterData((prev) => ({
    ...prev,
    [fieldName]: type === "checkbox" ? checked : value,
  }));

  // Clear field-specific error as user interacts with it
  if (errors[fieldName]) {
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  }
};
