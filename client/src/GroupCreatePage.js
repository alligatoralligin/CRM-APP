import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

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
      sx={{ minHeight: "100vh" }}
    >
      <Typography variant="h3" gutterBottom>
        Hello from GroupCreatePage
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="groupName">Enter Group Name here</label>
        <input
          type="text"
          id="groupName"
          {...register("groupname", { required: true })}
        ></input>
        <button>Submit</button>
      </form>
    </Grid>
  );
}

export default GroupCreatePage;
