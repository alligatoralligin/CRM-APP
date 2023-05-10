import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductPage(props) {
  const { register, handleSubmit, watch, reset } = useForm();
  const [SaleGroupList, setSaleGroupList] = useState("");

  useEffect(() => {
    async function getGroups() {
      const res = await axios.get(
        `http://localhost:8000/product-page/${props.UserID}`
      );
      console.log(res.data.SaleGroupList);
      setSaleGroupList(res.data.SaleGroupList);
    }
    getGroups();
  }, []);

  const onSubmit = async (data) => {
    reset();
    const newProductResp = await axios
      .post(`http://localhost:8000/create-new-product/${props.UserID}`, data, {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(console.log(data));
  };

  watch(["name", "price", "Img", "description", "GroupName"]);

  let selectOptions = [];
  if (SaleGroupList) {
    for (const group in SaleGroupList) {
      selectOptions.push(
        <option value={SaleGroupList[group]._id}>
          {SaleGroupList[group].name}
        </option>
      );
    }
  }
  return (
    <div>
      <h1>Hello from Product Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        ></input>
        <br></br>
        <label htmlFor="price">price </label>
        <input type="number" id="price" {...register("price")}></input>{" "}
        <br></br>
        <select {...register("GroupName", { required: true })}>
          {selectOptions}
        </select>
        <br></br>
        <label htmlFor="description">Product description </label>
        <br></br>
        <textarea
          type="text"
          id="description"
          rows={4}
          cols={50}
          {...register("description")}
        ></textarea>
        <br></br>
        <label htmlFor="Img">Image </label>
        <input
          type="Img"
          id="Img"
          {...register("Img", { required: false })}
        ></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default ProductPage;
