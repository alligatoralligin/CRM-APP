import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      groupMemberRender.push(<h3>{group}</h3>);
      for (let i = 0; i < userList.length; i++) {
        groupMemberRender.push(
          <div>
            <p>Username:{userList[i].username} </p>
            <p>Email:{userList[i].Email}</p>

            <button
              onClick={() =>
                removefromGroup(GroupData[group]._id, userList[i]._id)
              }
            >
              x
            </button>
          </div>
        );
      }
    }
  }

  if (GroupData) {
    for (const group in GroupData) {
      selectOptions.push(<option value={GroupData[group]._id}>{group}</option>);
    }
  }

  console.log(groupMemberRender);

  return (
    <div>
      <h1>Hello from Sale Group Page</h1>
      <h2>{GroupData.name}</h2>
      <h2>Add a member to {GroupData.name}</h2>

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
      <h2> Group Members</h2>
      {groupMemberRender}
    </div>
  );
}

export default GroupPage;
