import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CardContent, Grid, Typography, Card, Button } from "@mui/material";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

function GroupPage(props) {
  const [GroupData, setGroupData] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const navigate = useNavigate();

  //Adding based on email (make sure to make email submittions unique)
  const onSubmit = async (data) => {
    reset();
    await axios.post(`http://localhost:8000/add-to-group`, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log(data);
    setIsSubmitted(!isSubmitted);
  };

  const removefromGroup = async (groupID, userID) => {
    const deleteResponse = await axios.delete(
      `http://localhost:8000/remove-from-group/${props.UserID}/${groupID}/${userID}`
    );
    console.log(deleteResponse.data.newGroupInfo);
    setGroupData(deleteResponse.data.newGroupInfo);
  };
  watch(["Email", "GroupName"]);

  let GroupsArray = {}; //An array to store alll the group data so that the GroupData state can store all the group data
  useEffect(() => {
    async function getGroupData() {
      try {
        const postResponse = await axios.get(
          `http://localhost:8000/group-page/${props.UserID}`
        );
        console.log(postResponse.data.GroupInfo);
        if (postResponse.data.GroupInfo) {
          let responseArray = postResponse.data.GroupInfo;
          let responseArrayLength = responseArray.length;
          for (let i = 0; i < responseArrayLength; i++) {
            GroupsArray[`Group${i}`] = postResponse.data.GroupInfo[i];
          }
          setGroupData(GroupsArray);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getGroupData();
  }, [isSubmitted]);

  // const memberLength = GroupData.Users.length;
  // console.log(memberLength);

  let groupMemberRender = [];
  let selectOptions = [];

  if (GroupData) {
    for (const group in GroupData) {
      let userList = GroupData[group].Users;
      groupMemberRender.push(<h3>{GroupData[group].name}</h3>);
      for (let i = 0; i < userList.length; i++) {
        groupMemberRender.push(
          <Card variant="outlined" sx={{ minWidth: "350px", marginBottom: 2 }}>
            <CardContent>
              <div>
                <Typography variant="subtitle1">
                  Username:{userList[i].username}
                </Typography>
                <Typography variant="subtitle1">
                  Email:{userList[i].Email}
                </Typography>
                <Typography variant="subtitle1">
                  Group:{userList[i].Group}
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() =>
                    removefromGroup(GroupData[group]._id, userList[i]._id)
                  }
                >
                  <GroupRemoveIcon />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      }
    }
  }

  if (GroupData) {
    for (const group in GroupData) {
      selectOptions.push(
        <option value={GroupData[group]._id}>{GroupData[group].name}</option>
      );
    }
  }

  console.log(groupMemberRender);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Typography variant="h3">Sale Group Page</Typography>
      <h2>{GroupData.name}</h2>
      <Typography variant="h6">Add a member to {GroupData.name}</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="GroupName">GroupName</label>
        <select {...register("GroupName", { required: true })}>
          {selectOptions}
        </select>
        <br></br>
        <label htmlFor="Email">Email </label>
        <input
          type="Email"
          id="Email"
          {...register("Email", { required: true })}
        ></input>
        <br></br>
        <button>Submit</button>
      </form>
      <Typography variant="h4"> Group Members</Typography>
      {groupMemberRender}
    </Grid>
  );
}

export default GroupPage;
