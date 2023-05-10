import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

function ClientPage(props) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
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

  for (let i = 0; i < dataArray.length; i++) {
    ShowPageContent.push(
      <div>
        <p>Name:{dataArray[i].name}</p>
        <p>Title:{dataArray[i].title}</p>
        <p>Email:{dataArray[i].Email}</p>
        <p>Phone number:{dataArray[i].phoneNumber}</p>
        <p>Source:{dataArray[i].Source}</p>
        <p>Notes:{dataArray[i].Notes}</p>
        <Link to={`/Client/Edit/${dataArray[i]._id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => deleteReq(dataArray[i]._id)}>Delete</button>
        <button>Notes</button>
        <br></br>
      </div>
    );
  }

  if (groupInfo) {
    for (const group in groupInfo) {
      selectOptions.push(
        <option value={groupInfo[group]._id}>{groupInfo[group].name}</option>
      );
    }
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
        <label htmlFor="GroupName">GroupName</label>
        <select {...register("GroupName", { required: true })}>
          {selectOptions}
        </select>
        <br></br>
        <button>Submit</button>
      </form>
      {ShowPageContent}
    </div>
  );
}

export default ClientPage;
