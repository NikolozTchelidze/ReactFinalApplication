import { FormControl, TextField, Button } from "@mui/material";
import React from "react";
import { authenticateUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useForm } from "../../application/hooks/useForm";
import { useNavigate } from "react-router-dom";

export const generateLoginFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      error: null,
      validateInput: (email) =>
        email.includes("@") ? "" : "email is not valid",
    },
    password: {
      value: "",
      required: true,
      error: null,
      validateInput: (password) =>
        password.length > 6 ? "" : "password must be more than 6 characters",
    },
  };
};
export const LoginForm = () => {
  const { formValues: loginFormValues, onInputChange } = useForm({
    defaultFormValues: generateLoginFormValues(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (e) => {
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    dispatch(
      authenticateUser({
        isLogin: true,
        formValues: {
          email,
          password,
        },
      })
    )
      .unwrap()
      .then(() => navigate("/"));
  };
  return (
    <FormControl>
      <TextField
        name="email"
        label="Enter your email"
        value={loginFormValues.email.value}
        onChange={onInputChange}
        error={!!loginFormValues.email.error}
        helperText={loginFormValues.email.error}
      />
      <TextField
        name="password"
        label="Enter your passowrd"
        type="password"
        value={loginFormValues.password.value}
        onChange={onInputChange}
        error={!!loginFormValues.password.error}
        helperText={loginFormValues.password.error}
      />
      <Button onClick={onLogin}>Log in</Button>
    </FormControl>
  );
};
