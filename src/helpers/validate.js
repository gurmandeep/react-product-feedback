export const validateField = (name, value, formData) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      break;
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
      break;
    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      break;
    case "password_confirmation":
      if (!value) return "Confirm Password is required";
      if (value !== formData["password"]) return "Passwords do not match";
      break;
    case "title":
      if (!value.trim()) return "Title is required";
      break;
    case "category":
      if (!value.trim()) return "Please choose category";
      break;
  }
  return undefined;
};

export const validate = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });

  return errors;
};
