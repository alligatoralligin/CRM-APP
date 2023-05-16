import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductPage(props) {
  const { register, handleSubmit, watch, reset, getValues } = useForm();
  const [SaleGroupList, setSaleGroupList] = useState("");
  const [groupProducts, setGroupProducts] = useState("");

  useEffect(() => {
    async function getGroups() {
      const res = await axios.get(
        `http://localhost:8000/product-page/${props.UserID}`
      );
      setSaleGroupList(res.data.SaleGroupList);
      console.log(res.data.SaleGroupList);
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

    setSaleGroupList(newProductResp.data.newRespGroup);
  };

  watch(["name", "price", "Img", "description", "GroupName", "GroupName2"]);

  const deleteReq = async (deleteID) => {
    const deleteResponse = await axios.delete(
      `http://localhost:8000/delete-product/${props.UserID}/${deleteID}`
    );

    setSaleGroupList(deleteResponse.data.deleteResp);

    console.log(deleteResponse.data);
  };

  // Edit product function redirects to the edit page for the product that is being edited
  function editFunc(itemID) {}
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

  let productDisplay = [];
  if (SaleGroupList) {
    for (const group in SaleGroupList) {
      productDisplay.push(<p>{SaleGroupList[group].name}</p>);
      for (const item in SaleGroupList[group].Products) {
        productDisplay.push(
          <p>
            Product Name:{SaleGroupList[group].Products[item].name} <br></br>
            Price:
            {SaleGroupList[group].Products[item].price}
            <br></br>
            Product Description:
            {SaleGroupList[group].Products[item].description}
            <br></br>
            <button
              onClick={() => deleteReq(SaleGroupList[group].Products[item]._id)}
            >
              Delete
            </button>
            <Link
              to={`/Product/Edit/${SaleGroupList[group].Products[item]._id}`}
            >
              <button>Edit</button>
            </Link>
          </p>
        );
      }
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
      <h2>View Group Products Here</h2>
      {productDisplay}
    </div>
  );
}
export default ProductPage;
