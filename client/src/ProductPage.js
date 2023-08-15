import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  CardContent,
  Card,
  Paper,
} from "@mui/material";

function ProductPage(props) {
  const { register, handleSubmit, watch, reset, getValues } = useForm();
  const [SaleGroupList, setSaleGroupList] = useState("");

  useEffect(() => {
    async function getGroups() {
      const res = await axios.get(
        `http://localhost:8000/product-page/${props.UserID}`
      );
      setSaleGroupList(res.data.SaleGroupList);
      console.log(res.data.SaleGroupList);
    }
    getGroups();
  }, []);

  const onSubmit = async (data) => {
    reset();
    const newProductResp = await axios
      .post(`http://localhost:8000/create-new-product/${props.UserID}`, data, {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(console.log(data));

    setSaleGroupList(newProductResp.data.newRespGroup);
  };

  watch(["name", "price", "Img", "description", "GroupName", "GroupName2"]);

  const deleteReq = async (deleteID) => {
    const deleteResponse = await axios.delete(
      `http://localhost:8000/delete-product/${props.UserID}/${deleteID}`
    );

    setSaleGroupList(deleteResponse.data.deleteResp);

    console.log(deleteResponse.data);
  };

  // Edit product function redirects to the edit page for the product that is being edited
  function editFunc(itemID) {}
  let selectOptions = [];
  if (SaleGroupList) {
    for (const group in SaleGroupList) {
      selectOptions.push(
        <option value={SaleGroupList[group]._id}>
          {SaleGroupList[group].name}
        </option>
      );
    }
  }

  let productDisplay = [];
  if (SaleGroupList) {
    for (const group in SaleGroupList) {
      productDisplay.push(
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          {SaleGroupList[group].name}
        </Typography>
      );
      for (const item in SaleGroupList[group].Products) {
        productDisplay.push(
          <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
            <CardContent>
              Product Name:{SaleGroupList[group].Products[item].name} <br></br>
              Price:
              {SaleGroupList[group].Products[item].price}
              <br></br>
              Product Description:
              {SaleGroupList[group].Products[item].description}
              <br></br>
              <Button
                onClick={() =>
                  deleteReq(SaleGroupList[group].Products[item]._id)
                }
                variant="contained"
                color="error"
                sx={{ mr: 1 }}
              >
                Delete
              </Button>
              <Link
                to={`/Product/Edit/${SaleGroupList[group].Products[item]._id}`}
              >
                <Button variant="contained" color="info">
                  Edit
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      }
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Typography variant="h4" sx={{ marginBottom: 10 }}>
        Add Products to Your Sales Group
      </Typography>
      <Grid container spacing={0}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="flex-end"
          xs={6}
          sx={{ minHeight: "600px" }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              minHeight: "600px",
              minWidth: "400px",
              border: 1,
              borderRadius: "2%",
              paddingLeft: 5,
              paddingRight: 5,
              marginRight: 3,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h6" sx={{ marginTop: 10 }}>
              Add New Group Products Here
            </Typography>
            <Stack spacing={2}>
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
                id="Img"
                label="Image Link"
                type="text"
                {...register("Img", { required: false })}
              />
              <select {...register("GroupName", { required: true })}>
                {selectOptions}
              </select>
              <TextField
                id="description"
                label="description"
                type="text"
                multiline
                rows={4}
                {...register("description", { required: false })}
              />
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 1, maxWidth: "25ch" }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Grid>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        ></input>
        <br></br>
        <label htmlFor="price">price </label>
        <input type="number" id="price" {...register("price")}></input>{" "}
        <br></br>
        <select {...register("GroupName", { required: true })}>
          {selectOptions}
        </select>
        <br></br>
        <label htmlFor="description">Product description </label>
        <br></br>
        <textarea
          type="text"
          id="description"
          rows={4}
          cols={50}
          {...register("description")}
        ></textarea>
        <br></br>
        <label htmlFor="Img">Image </label>
        <input
          type="Img"
          id="Img"
          {...register("Img", { required: false })}
        ></input>
        <br></br>
        <button>Submit</button>
      </form> */}
        <Grid container xs={6}>
          <Box
            sx={{
              border: 1,
              borderRadius: "2%",
              maxWidth: 500,
              paddingRight: 5,
              paddingLeft: 5,
            }}
          >
            <Typography variant="h6" sx={{ marginTop: 10 }}>
              View Group Products Here
            </Typography>
            <Paper style={{ maxHeight: 500, maxWidth: 500, overflow: "auto" }}>
              {productDisplay}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default ProductPage;
