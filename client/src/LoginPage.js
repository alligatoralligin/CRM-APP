import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Box, TextField, Stack } from "@mui/material";

export default function LoginPage(props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
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
  };

  watch(["Username", "Password"]);
  return (
    <Grid
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
  );
}
