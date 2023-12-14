import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Stack, TextField, Button } from "@mui/material";

export default function RegisterPage(props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    reset();
    let registerResponse = await axios.post(
      "http://localhost:8000/register-user",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);
    window.localStorage.setItem("UserID", registerResponse.data.registeredID);
    props.setIsLoggedIn();
    navigate(`/Clientlist/${registerResponse.data.registeredID}`);
  };
  watch(["username", "password", "Email", "salegroup"]);

  return (
    <Grid container width={5 / 5} sx={{ overflow: "hidden" }}>
      <Grid item xs={6}>
        <Box
          sx={{ height: "100%", width: "100%" }}
          component="img"
          src="https://images.unsplash.com/photo-1685814783586-b5abaf7da7df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2062&q=80"
        ></Box>
      </Grid>
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
          Register Here
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
              {...register("username", { required: true })}
            />
            <TextField
              id="password"
              label="password"
              type="password"
              {...register("password", { required: true })}
            />
            <TextField
              id="Email"
              label="Email"
              type="email"
              {...register("Email", { required: true })}
            />
            <TextField
              id="salegroup"
              label="Enter SaleGroup Here"
              type="text"
              {...register("salegroup", { required: true })}
            />
            <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
              Register
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>

    // <div>
    //   <h1>Register Here</h1>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <label for="username">Username </label>
    //     <input
    //       type="text"
    //       id="username"
    //       {...register("username", { required: true })}
    //     ></input>
    //     <br></br>
    //     <label for="password">Password </label>
    //     <input
    //       type="password"
    //       id="password"
    //       {...register("password", { required: true })}
    //     ></input>
    //     <br></br>
    //     <label for="Email">Email </label>
    //     <input
    //       type="email"
    //       id="Email"
    //       {...register("Email", { required: true })}
    //     ></input>
    //     <br></br>
    //     <label for="salegroup">Enter SaleGroup Here </label>
    //     <br></br>
    //     <input
    //       type="text"
    //       id="salegroup"
    //       {...register("salegroup", { required: false })}
    //     ></input>
    //     <br></br>
    //     <button>Register</button>
    //   </form>
    // </div>
  );
}
