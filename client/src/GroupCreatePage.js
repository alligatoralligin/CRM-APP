import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
    <div>
      <h1>Hello from GroupCreatePage</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="groupName">Enter Group Name here</label>
        <input
          type="text"
          id="groupName"
          {...register("groupname", { required: true })}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default GroupCreatePage;
