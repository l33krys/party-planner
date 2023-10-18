import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FoodCard from "./FoodCard"

export const FoodForm = ({ foods, setFoods, refreshPage, setRefreshPage }) => {
  // const [foods, setFoods] = useState([{}]);
  // const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  // useEffect(() => {
  //   console.log("FETCH FOOD! ");
  //   fetch("http://localhost:5555/foods")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFoods(data);
  //       console.log(data);
  //     });
  // }, [refreshPage]);

//   const formSchema = yup.object().shape({
//     item: yup.string().required("Must enter party name"),
//     quantity: yup.number().required("Must enter a number quantity"),
//     party_id: yup.number().required("Party must be exist"),
//     guest_id: yup.number().required("Guest must exist")
//   });

//   const formik = useFormik({
//     initialValues: {
//       item: "",
//       quantity: "",
//       party_id: "",
//       guest_id: "",
//     },
//     validationSchema: formSchema,
//     onSubmit: (values, { resetForm }) => {
//       fetch("http://localhost:5555/foods", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             item: values.item,
//             quantity: parseInt(values.quantity),
//             party_id: parseInt(values.party_id),
//             guest_id: parseInt(values.guest_id),
//           }, null, 2),
//       }).then((res) => {
//         resetForm()
//         if (res.status == 201) {
//           setRefreshPage(!refreshPage);
//         }
//       });
//     },
//   });

  function handleDelete(delFood) {
    fetch(`http://127.0.0.1:5555/foods/${delFood.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedFoods = foods.filter(
            (food) => food.id != delFood.id
        )
        setFoods(updatedFoods)
    })

  }

  return (
    <div>
      {/* <h3>Add & Assign Food Items</h3>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="item">Item</label>
        <br />
        <input
          id="item"
          name="item"
          onChange={formik.handleChange}
          value={formik.values.item}
        />
        <p style={{ color: "red" }}> {formik.errors.item}</p>
        <label htmlFor="quantity">Quantity</label>
        <br />

        <input
          id="quantity"
          name="quantity"
          onChange={formik.handleChange}
          value={formik.values.quantity}
        />
        <p style={{ color: "red" }}> {formik.errors.quantity}</p>

        <label htmlFor="party_id">Party ID</label>
        <br />

        <input
          id="party_id"
          name="party_id"
          onChange={formik.handleChange}
          value={formik.values.party_id}
        />
        <p style={{ color: "red" }}> {formik.errors.party_id}</p>

        <label htmlFor="guest_id">Guest ID</label>
        <br />

        <input
          id="guest_id"
          name="guest_id"
          onChange={formik.handleChange}
          value={formik.values.guest_id}
        />
        <p style={{ color: "red" }}> {formik.errors.guest_id}</p>
        <button type="submit">Submit</button>
      </form> */}
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Party</th>
            <th>Assigned To</th>
            <th></th>
          </tr>
          {foods ? foods.map((food, key) => (
                <FoodCard key={key} food={food} handleDelete={handleDelete} />
            )) :
            <p>Loading...</p>
          }
          {/* {foods === "undefined" ? (
            <p>Loading</p>
          ) : (
            foods.map((food, i) => (
                <FoodList food={food} handleDelete={handleDelete} />
            ))
          )} */}
        </tbody>
      </table>
    </div>
  );
};

export default FoodForm;