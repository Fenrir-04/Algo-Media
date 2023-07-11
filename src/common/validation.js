const emailRegex = /^\w+(?:[\.-]\w+)*@(?:gmail\.com|yahoo\.com|hotmail\.com|aol\.com|outlook\.com)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;

const validation = {
    email: (value)=>{
      return emailRegex.test(value)
      ? {  email: false, emailError: false }
      : {  email: true,emailError: "Please enter valid email address" }
    },
    password: (value)=>{
      return passwordRegex.test(value)
      ? { password: false, passwordError: false }
      : {
          password: true,
          passwordError:
            "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*), 1 number (0-9).",
        };
    },

    confirmPassword:  (value, password) => {
      return value === password
        ? { confirmPassword: false, confirmPasswordError: false }
        : {
            confirmPassword: true,
            confirmPasswordError: "Password does not match",
          };
    }
};

export default validation;
