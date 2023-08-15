import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

function GroupCreatePage(props) {
  const { register, handleSubmit, watch, reset } = useForm();

  const onSubmit = async (data) => {
    reset();
    await axios.post(
      `http://localhost:8000/create-group/${props.UserID}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);
  };
  watch(["groupName"]);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${"https://images.unsplash.com/photo-1689702095123-a20606125fd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        display="grid"
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          minHeight: "275px",
          minWidth: "400px",
        }}
      >
        <Typography
          fontSize={20}
          sx={{ color: "black", opacity: "1", padding: "0" }}
        >
          Create a new Sales Group
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="groupName"
            type="text"
            label="Enter Group Name Here"
            variant="outlined"
            sx={{ display: "block", mb: 2 }}
            {...register("groupname", { required: true })}
          />

          <Button variant="contained" sx={{ mb: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Grid>
  );
}

export default GroupCreatePage;
