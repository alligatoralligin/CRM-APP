import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

function ClientPage(props) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const [dataArray, setDataArray] = useState([]);

  const onSubmit = async (data) => {
    reset();
    await axios
      .post(`http://localhost:8000/create-new-client/${props.UserID}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(setSubmitted((previousState) => !previousState));

    console.log(data);
  };

  const deleteReq = async (deleteID) => {
    setSubmitted(!submitted);
    await axios.delete(`http://localhost:8000/delete-client/${deleteID}`);
  };

  watch(["name", "title", "Email", "phoneNumber", "Source"]);

  useEffect(() => {
    async function getMessage() {
      if (props.UserID) {
        try {
          const response = await axios.get(
            `http://localhost:8000/showpage/${props.UserID}`
          );
          console.log(response.data.info.Contacts);
          setDataArray(response.data.info.Contacts);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getMessage();
  }, [props.UserID, submitted]);

  //

  let ShowPageContent = [];

  for (let i = 0; i < dataArray.length; i++) {
    ShowPageContent.push(
      <div>
        <p>Name:{dataArray[i].name}</p>
        <p>Title:{dataArray[i].title}</p>
        <p>Email:{dataArray[i].Email}</p>
        <p>Phone number:{dataArray[i].phoneNumber}</p>
        <p>Source:{dataArray[i].Source}</p>
        <Link to={`/Client/Edit/${dataArray[i]._id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => deleteReq(dataArray[i]._id)}>Delete</button>

        <br></br>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello from Client Page</h1>
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
        <button>Submit</button>
      </form>
      {ShowPageContent}
    </div>
  );
}

export default ClientPage;
