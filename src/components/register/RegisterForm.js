import { FormControl, TextField, Button } from "@mui/material";
import React from "react";
import { useForm } from "../../application/hooks/useForm";
import { authenticateUser } from "../../redux/";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const generateRegisterFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 5 ? null : "Name should have at least 5 characters",
    },

    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 5
          ? null
          : "Last name should have at least 5 characters",
    },
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@") ? null : "Email should include @",
    },
    password: {
      value: "",
      requried: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : "Password should be more than 6 characters",
    },
  };
};

export const RegisterForm = () => {
  const { formValues, onInputChange } = useForm({
    defaultFormValues: generateRegisterFormValues(),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = (e) => {
    e.preventDefault();
    const firstName = formValues.firstName.value;
    const lastName = formValues.lastName.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    dispatch(
      authenticateUser({
        formValues: {
          firstName,
          lastName,
          email,
          password,
        },
        isLogin: false,
      })
    ).unwrap()
     .then(() => navigate("/"))
  };
  return (
    <FormControl fullWidth>
      <TextField
        variant="outlined"
        name="firstName"
        value={formValues.firstName.value}
        label="Enter your first name"
        onChange={onInputChange}
        error={!!formValues.firstName.error}
        helperText={formValues.firstName.error}
      />
      <TextField
        variant="outlined"
        name="lastName"
        value={formValues.lastName.value}
        label="Enter your last name"
        onChange={onInputChange}
        error={!!formValues.lastName.error}
        helperText={formValues.lastName.error}
      />
      <TextField
        variant="outlined"
        name="email"
        value={formValues.email.value}
        label="Enter your email"
        onChange={onInputChange}
        error={!!formValues.email.error}
        helperText={formValues.email.error}
      />
      <TextField
        type="password"
        variant="outlined"
        name="password"
        value={formValues.password.value}
        label="Enter your password"
        onChange={onInputChange}
        error={!!formValues.password.error}
        helperText={formValues.password.error}
      />
      <Button onClick={onRegister}>Sign Up</Button>
    </FormControl>
  );
};
