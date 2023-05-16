import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function ProductEdit(props) {
  const [productData, setProductData] = useState("");
  const { register, handleSubmit, watch, reset } = useForm();
  const { productID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function getProductData() {
      try {
        const productDataReq = await axios.get(
          `http://localhost:8000/edit-product/${productID}`
        );
        console.log(productDataReq.data.productDataResp);

        setProductData(productDataReq.data.productDataResp);
      } catch (error) {
        console.error(error);
      }
    }

    getProductData();
  }, []);

  useEffect(() => {
    async function resetClientDefault() {
      let defaultValues = {};
      defaultValues.name = `${productData.name}`;
      defaultValues.price = `${productData.price}`;
      defaultValues.Img = `${productData.Img}`;
      defaultValues.description = `${productData.description}`;

      reset({ ...defaultValues });
    }
    resetClientDefault();
  }, [productData]);

  const onSubmit = async (data) => {
    navigate(`/Product-Page/${props.UserID}`);
    await axios.post(
      `http://localhost:8000/update-product/${productID}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);
  };

  console.log(watch(["name", "price", "Img", "description"]));
  return (
    <div>
      <h1>Hello from ProductEdit</h1>
      <h5>{productID}</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        ></input>
        <br></br>
        <label htmlFor="price">price </label>
        <input type="number" id="price" {...register("price")}></input>
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
          type="text"
          id="Image"
          {...register("Img", { required: false })}
        ></input>
        <br></br>
        <button>Update</button>
      </form>
    </div>
  );
}

export default ProductEdit;
