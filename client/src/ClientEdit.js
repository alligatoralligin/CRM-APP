import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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

      reset({ ...defaultValues });
    }
    resetClientDefault();
  }, [clientData]);

  const onSubmit = async (data) => {
    navigate(`/Clientlist/${props.ClientID}`);
    await axios.post(`http://localhost:8000/update-client/${id}`, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log(data);
  };

  console.log(
    watch(["name", "title", "Email", "phoneNumber", "Source", "notes"])
  );
  return (
    <div>
      <h1>Hello from ClientEdit</h1>
      <h5>{id}</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        ></input>
        <br></br>
        <label htmlFor="title">title </label>
        <input type="text" id="title" {...register("title")}></input> <br></br>
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
      </form>
    </div>
  );
}

export default ClientEdit;
