import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import AddProductComp from "./HelperComps/ProductFormComp";

function ClientEdit(props) {
  const [clientData, setClientData] = useState("");
  const { register, handleSubmit, watch, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productList, setProductList] = useState("");

  useEffect(() => {
    async function getClientData() {
      try {
        const ClientData = await axios.get(
          `http://localhost:8000/get-client-by-id/${id}`
        );
        console.log(ClientData);
        setClientData(ClientData.data.ClientInfo);
      } catch (error) {
        console.error(error);
      }
    }

    getClientData();
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(
          `http://localhost:8000/product-page/${props.UserID}`
        );
        setProductList(res.data.SaleGroupList[0].Products);
        console.log(productList);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    async function resetClientDefault() {
      let defaultValues = {};
      defaultValues.name = `${clientData.name}`;
      defaultValues.title = `${clientData.title}`;
      defaultValues.Email = `${clientData.Email}`;
      defaultValues.phoneNumber = `${clientData.phoneNumber}`;
      defaultValues.Source = `${clientData.Source}`;
      defaultValues.Notes = `${clientData.Notes}`;
      defaultValues.ContactStatus = `${clientData.ContactStatus}`;

      reset({ ...defaultValues });
    }
    resetClientDefault();
  }, [clientData]);

  const onSubmit = async (data) => {
    navigate(`/Clientlist/${props.UserID}`);
    await axios.post(
      `http://localhost:8000/update-client/${id}/${props.UserID}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);
  };

  watch(["name", "title", "Email", "phoneNumber", "Source", "Notes"]);

  let productRender = [];

  for (const product in productList) {
    productRender.push(
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Product Name:{productList[product].name}
          </Typography>
          <Typography variant="subtitle1">
            Price: {productList[product].price}
          </Typography>
          <Typography variant="subtitle1">
            Product Description: {productList[product].description}
          </Typography>
          <Typography variant="subtitle1">
            Product ID: {productList[product]._id}
          </Typography>
          <Typography variant="subtitle1">
            Amount Sold : {productList[product].AmountSold}
          </Typography>
          <AddProductComp
            clientID={id}
            productID={productList[product]._id}
            userID={props.UserID}
          ></AddProductComp>
        </CardContent>
      </Card>
    );
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
      <Typography variant="h3" gutterBottom>
        Update Client
      </Typography>
      <h5>{id}</h5>
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
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2}>
              <TextField
                id="name"
                label="name"
                type="text"
                {...register("name", { required: true })}
              />
              <TextField
                id="title"
                label="title"
                type="text"
                {...register("title", { required: true })}
              />
              <TextField
                id="Email"
                label="Email"
                type="Email"
                {...register("Email", { required: true })}
              />
              <TextField
                id="phoneNumber"
                label="phoneNumber"
                type="number"
                {...register("phoneNumber", { required: true })}
              />
              <TextField
                id="Source"
                label="Source"
                type="text"
                {...register("Source", { required: true })}
              />
              <br></br>
              <TextField
                id="Notes"
                label="Notes"
                type="text"
                multiline
                rows={4}
                {...register("Notes", { required: true })}
              />
              <br></br>
              <label htmlFor="ContactStatus">Contact Status</label>
              <select {...register("ContactStatus", { required: true })}>
                <option value="opportunity">New Opportunity</option>
                <option value="contacting">Contacting</option>
                <option value="engaging">Engaging</option>
                <option value="qualified">Qualified</option>
                {/* custom stages is different for each company will try to make this step customizable later. Place holder atm */}
                <option value="customStages">Custom stages</option>
                <option value="closing">Closing</option>
                <option value="Success">Success</option>
                <option value="Failure">Failure</option>
              </select>
              <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                Update
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
          <label htmlFor="title">title </label>
          <input type="text" id="title" {...register("title")}></input>{" "}
          <br></br>
          <label htmlFor="Email">Email </label>
          <input
            type="Email"
            id="Email"
            {...register("Email", { required: true })}
          ></input>
          <br></br>
          <label htmlFor="phoneNumber">Phone Number </label>
          <input
            type="number"
            id="phoneNumber"
            {...register("phoneNumber", { required: true })}
          ></input>
          <br></br>
          <label htmlFor="Source">Source </label>
          <input type="text" id="Source" {...register("Source")}></input>
          <br></br>
          <label htmlFor="Notes">Notes </label>
          <br></br>
          <textarea
            type="text"
            id="Notes"
            rows={4}
            cols={50}
            {...register("Notes")}
          ></textarea>
          <br></br>
          <button>Update</button>
        </form> */}

        <Grid container xs={6}>
          <Box sx={{ marginLeft: 5 }}>
            <Typography variant="h6" gutterBottom>
              Add Products
            </Typography>
            <Paper
              style={{ maxHeight: 300, minWidth: "50%", overflow: "auto" }}
            >
              {productRender}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ClientEdit;
