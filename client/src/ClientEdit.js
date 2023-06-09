import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Grid, Stack, Box, Typography, TextField, Button } from "@mui/material";

function ClientEdit(props) {
  const [clientData, setClientData] = useState("");
  const { register, handleSubmit, watch, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

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

  console.log(
    watch(["name", "title", "Email", "phoneNumber", "Source", "Notes"])
  );
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Stack>
        <h1>Hello from ClientEdit</h1>
        <h5>{id}</h5>

        <Typography variant="h4" gutterBottom>
          Update Client
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
      </Stack>
    </Grid>
  );
}

export default ClientEdit;
