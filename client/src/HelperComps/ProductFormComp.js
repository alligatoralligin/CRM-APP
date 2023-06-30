import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";

export default function AddProductComp(props) {
  const { register, handleSubmit, watch, reset, getValues } = useForm();

  const onSubmit = async (data) => {
    reset();
    const newProductResp = await axios
      .post(
        `http://localhost:8000/add-product-to-client/${props.clientID}/${props.productID}/${props.userID}`,
        data,
        {
          header: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then(console.log(data));
  };

  watch("quantity");

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="quantity"
          label="quantity"
          type="number"
          {...register("quantity", { required: false })}
        />

        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
