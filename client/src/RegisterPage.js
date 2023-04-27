import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    reset();
    let registerResponse = await axios.post(
      "http://localhost:8000/register-user",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);
    window.localStorage.setItem("UserID", registerResponse.data.registeredID);
    props.setIsLoggedIn();
    navigate(`/Clientlist/${registerResponse.data.registeredID}`);
  };
  watch(["username", "password", "salegroup", "Email"]);

  return (
    <div>
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for="username">Username </label>
        <input
          type="text"
          id="username"
          {...register("username", { required: true })}
        ></input>
        <br></br>
        <label for="password">Password </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        ></input>
        <br></br>
        <label for="Email">Email </label>
        <input
          type="email"
          id="Email"
          {...register("Email", { required: true })}
        ></input>
        <br></br>
        <label for="salegroup">Enter SaleGroup here if known </label>
        <br></br>
        <input
          type="text"
          id="salegroup"
          {...register("salegroup", { required: false })}
        ></input>
        <br></br>
        <button>Register</button>
      </form>
    </div>
  );
}
