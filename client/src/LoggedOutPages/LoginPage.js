import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  Stack,
  Hidden,
  Alert,
} from "@mui/material";
import FlashMessage from "react-flash-message";

export default function LoginPage(props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = async (data) => {
    reset();
    const loginResponse = await axios.post(
      "http://localhost:8000/login",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    console.log(`Logged in state : ${loginResponse.data.session}`);
    console.log(loginResponse.data);

    console.log(loginResponse.data.session);

    if (loginResponse.data.session === true) {
      props.setIsLoggedIn();
      window.localStorage.setItem("IS_LOGGED_IN", loginResponse.data.session);
      window.localStorage.setItem("UserID", loginResponse.data.id);
      window.localStorage.setItem("Username", loginResponse.data.username);
      window.localStorage.setItem(
        "GroupIDs",
        JSON.stringify(loginResponse.data.GroupIDs)
      );

      navigate(`/Clientlist/${loginResponse.data.id}`);
    }

    console.log(data);
    if (loginResponse.data.session === undefined) {
      setErrorMessage(
        <Alert severity="error">{loginResponse.data.errorMessage}</Alert>
      );
    }
  };

  watch(["Username", "Password"]);
  return (
    <Grid container width={5 / 5} sx={{ overflow: "hidden" }}>
      <Grid
        item
        xs={6}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2}>
            <TextField
              id="Username"
              label="Username"
              type="text"
              {...register("Username", { required: true })}
            />
            <TextField
              id="Password"
              label="Password"
              type="password"
              {...register("Password", { required: true })}
            />
            <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
              Login
            </Button>
            {errorMessage}
            <Typography variant="subtitle">
              Don't have an account? {<NavLink to="/Register">Sign Up</NavLink>}
            </Typography>
            <Typography variant="subtitle1">
              <NavLink to={""}>Forgot Password?</NavLink>
            </Typography>
          </Stack>
        </Box>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Username">
          <Typography variant="subtitle1">Username</Typography>
        </label>
        <input
          type="text"
          id="Username"
          {...register("Username", { required: true })}
        ></input>
        <br></br>
        <label htmlFor="Password">
          <Typography variant="subtitle1">Password</Typography>{" "}
        </label>
        <input
          type="password"
          id="Password"
          {...register("Password", { required: true })}
        ></input>
        <br></br>
    
      </form> */}
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{ height: "100%", width: "100" }}
          component="img"
          src="https://images.unsplash.com/photo-1684609557323-ccc9881e871e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        ></Box>
      </Grid>
    </Grid>
  );
}
