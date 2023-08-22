import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Grid, Typography, TextField, Box, Button } from "@mui/material";

function ProductEdit(props) {
  const [productData, setProductData] = useState("");
  const { register, handleSubmit, watch, reset } = useForm();
  const { productID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getProductData() {
      try {
        const productDataReq = await axios.get(
          `http://localhost:8000/edit-product/${productID}`
        );
        console.log(productDataReq.data.productDataResp);

        setProductData(productDataReq.data.productDataResp);
      } catch (error) {
        console.error(error);
      }
    }

    getProductData();
  }, []);

  useEffect(() => {
    async function resetClientDefault() {
      let defaultValues = {};
      defaultValues.name = `${productData.name}`;
      defaultValues.price = `${productData.price}`;
      defaultValues.Img = `${productData.Img}`;
      defaultValues.description = `${productData.description}`;

      reset({ ...defaultValues });
    }
    resetClientDefault();
  }, [productData]);

  const onSubmit = async (data) => {
    navigate(`/Product-Page/${props.UserID}`);
    await axios.post(
      `http://localhost:8000/update-product/${productID}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);
  };

  console.log(watch(["name", "price", "Img", "description"]));
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "ghostwhite" }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          backgroundColor: "white",
          padding: "60px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
          <h5>Product ID:{productID}</h5>
          <TextField
            id="name"
            label="name"
            type="text"
            {...register("name", { required: true })}
          />
          <TextField
            id="price"
            label="price"
            type="number"
            {...register("price", { required: true })}
          />
          <TextField
            id="description"
            label="description"
            type="number"
            multiline
            rows={4}
            {...register("description", { required: true })}
          />
          <br></br>
          <TextField
            id="Img"
            label="Img"
            type="text"
            {...register("Notes", { required: false })}
          />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Grid>
  );
}

export default ProductEdit;
