import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import EnhancedTable from "../../HelperComps/ClientPageTable";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import Select from "@mui/base/Select";
import Option from "@mui/base/Option";

function ClientPage(props) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, reset, control } = useForm();
  const [dataArray, setDataArray] = useState([]);
  const [groupInfo, setGroupInfo] = useState("");

  const onSubmit = async (data) => {
    reset();
    const newClientResp = await axios
      .post(`http://localhost:8000/create-new-client/${props.UserID}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(setSubmitted((previousState) => !previousState));

    setDataArray(newClientResp.data.newContactList.Contacts);
  };

  const deleteReq = async (deleteID) => {
    const deleteResponse = await axios.delete(
      `http://localhost:8000/delete-client/${props.UserID}/${deleteID}`
    );
    setDataArray(deleteResponse.data.updatedClientList.Contacts);
  };

  watch([
    "name",
    "title",
    "Email",
    "phoneNumber",
    "Source",
    "Notes",
    "GroupName",
    "ContactStatus",
  ]);

  //useEffect to fetch the contacts that are associated with the UserID that is currently logged in
  useEffect(() => {
    async function getMessage() {
      if (props.UserID) {
        try {
          const response = await axios.get(
            `http://localhost:8000/showpage/${props.UserID}`
          );
          console.log(response.data.groupInfo);
          setDataArray(response.data.info.Contacts);
          setGroupInfo(response.data.groupInfo);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getMessage();
  }, [props.UserID]);

  let ShowPageContent = [];

  let selectOptions = [];

  // Card Variant of Client Page information Display
  //***************************************** */
  // for (let i = 0; i < dataArray.length; i++) {
  //   ShowPageContent.push(
  //     <Grid item xs={8}>
  //       <Card
  //         variant="outlined"
  //         sx={{ minWidth: "700px", mt: 3, boxShadow: 1 }}
  //       >
  //         <CardContent align="center">
  //           <Typography variant="subtitle1" style={{ wordWrap: "break-word" }}>
  //             Name:{dataArray[i].name}
  //           </Typography>
  //           <Typography variant="subtitle1" style={{ wordWrap: "break-word" }}>
  //             Title:{dataArray[i].title}
  //           </Typography>
  //           <Typography variant="subtitle1" style={{ wordWrap: "break-word" }}>
  //             Email:{dataArray[i].Email}
  //           </Typography>
  //           <Typography variant="subtitle1">
  //             phoneNumber:{dataArray[i].phoneNumber}
  //           </Typography>
  //           <Typography variant="subtitle1" style={{ wordWrap: "break-word" }}>
  //             Source:{dataArray[i].Source}
  //           </Typography>
  //           <Typography variant="subtitle1">
  //             Notes:{dataArray[i].Notes}
  //           </Typography>
  //           <Typography variant="subtitle1">
  //             Contact Status: {dataArray[i].ContactStatus}
  //           </Typography>
  //           <Typography variant="subtitle1">
  //             Date Created:{dataArray[i].createdAt}
  //           </Typography>
  //           <Typography variant="subtitle1">
  //             Last Updated:{dataArray[i].updatedAt}
  //           </Typography>
  //           {/* <p>Name:{dataArray[i].name}</p>
  //        <p>Title:{dataArray[i].title}</p>
  //       <p>Email:{dataArray[i].Email}</p>
  //       <p>Phone number:{dataArray[i].phoneNumber}</p>
  //       <p>Source:{dataArray[i].Source}</p>
  //       <p>Notes:{dataArray[i].Notes}</p> */}

  //           <Link to={`/Client/Edit/${dataArray[i]._id}`}>
  //             <Button variant="contained">Edit</Button>
  //           </Link>
  //           <Button
  //             variant="contained"
  //             color="error"
  //             onClick={() => deleteReq(dataArray[i]._id)}
  //           >
  //             Delete
  //           </Button>

  //           <Button variant="contained" color="secondary">
  //             Notes
  //           </Button>
  //           <br></br>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   );
  // }
  // *****************************
  const ShowDataTable = [];
  if (dataArray[0]) {
    ShowDataTable.push(<EnhancedTable dataArray={dataArray} />);
  }
  if (groupInfo) {
    for (const group in groupInfo) {
      selectOptions.push(
        // <MenuItem value={groupInfo[group._id]}>
        //   {groupInfo[group].name}
        // </MenuItem>
        <MenuItem value={groupInfo[group]._id}>
          {groupInfo[group].name}
        </MenuItem>
      );
    }
  }

  return (
    <Box>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh", backgroundColor: "ghostwhite" }}
        >
          <Typography variant="h3" sx={{ mt: 10 }} gutterBottom>
            Client Page
          </Typography>
          <Card>
            <CardContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Typography variant="h4">Add a client here</Typography>
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
                </div>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <br></br>
                <Typography variant="subtitle1" gutterBottom>
                  Group Name
                </Typography>
                {/* <select {...register("GroupName", { required: true })}>
                  {selectOptions}
                </select> */}
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue=""
                  inputProps={register("GroupName", {
                    required: "Please seleect group",
                  })}
                >
                  {selectOptions}
                </TextField>
                {/* Need to change group select to Material UI */}

                <Typography variant="subtitle1" gutterBottom>
                  Contact Status
                </Typography>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue={"default"}
                  sx={{ marginBottom: 2 }}
                  inputProps={register("ContactStatus", {
                    required: "Please select contact status ",
                  })}
                >
                  <MenuItem value="default" disabled>
                    Choose a Contact Status
                  </MenuItem>
                  <MenuItem value="opportunity">New Opportunity</MenuItem>
                  <MenuItem value="contacting">Contacting</MenuItem>
                  <MenuItem value="engaging">Engaging</MenuItem>
                  <MenuItem value="qualified">Qualified</MenuItem>
                  {/* custom stages is different for each company will try to make this step customizable later. Place holder atm */}
                  <MenuItem value="customStages">Custom stages</MenuItem>
                  <MenuItem value="closing">Closing</MenuItem>
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                </TextField>

                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
          {ShowPageContent}
          {ShowDataTable}
        </Grid>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "right" }}
        ></Grid>
      </div>
    </Box>
  );
}

export default ClientPage;
