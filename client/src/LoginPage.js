import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    reset();
    const loginResponse = await axios.post(
      "http://localhost:8000/login",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    console.log(`Logged in state : ${loginResponse.data.session}`);
    console.log(loginResponse.data);
    if (loginResponse.data.session === true) {
      props.setIsLoggedIn();
      window.localStorage.setItem("IS_LOGGED_IN", loginResponse.data.session);
      window.localStorage.setItem("UserID", loginResponse.data.id);
      window.localStorage.setItem("Username", loginResponse.data.username);
      window.localStorage.setItem(
        "GroupIDs",
        JSON.stringify(loginResponse.data.GroupIDs)
      );

      navigate(`/Clientlist/${loginResponse.data.id}`);
    }
    console.log(data);
  };

  watch(["Username", "Password"]);
  return (
    <div>
      <h1>Login here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Username">Username </label>
        <input
          type="text"
          id="Username"
          {...register("Username", { required: true })}
        ></input>
        <br></br>
        <label htmlFor="Password">Password </label>
        <input
          type="password"
          id="Password"
          {...register("Password", { required: true })}
        ></input>
        <br></br>
        <button>Login</button>
      </form>
    </div>
  );
}
