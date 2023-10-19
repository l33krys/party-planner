import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'

export const FoodForm = ({ refreshPage, setRefreshPage }) => {
  const [showForm, setShowForm] = useState(false);

  const formSchema = yup.object().shape({
    item: yup.string().required("Must enter party name"),
    quantity: yup.number().required("Must enter a number quantity"),
    party_id: yup.number().required("Party must be exist"),
    guest_id: yup.number().required("Guest must exist")
  });

  const formik = useFormik({
    initialValues: {
      item: "",
      quantity: "",
      party_id: "",
      guest_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("http://localhost:5555/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            item: values.item,
            quantity: parseInt(values.quantity),
            party_id: parseInt(values.party_id),
            guest_id: parseInt(values.guest_id),
          }, null, 2),
      }).then((res) => {
        resetForm()
        if (res.status == 201) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ border: "solid", margin: "30px", textAlign: "center" }}>
      <h3 style={{ margin: "30px" }}>Add & Assign Food Items <Button
          style={{ background: "#D61C4E" }}
          onClick={toggleFormVisibility}
        >
          {showForm ? "Collapse Form" : "Expand Form"}
        </Button></h3>
    {showForm && (
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <Form.Field>
        <label htmlFor="item">Item</label>
        <input
          id="item"
          name="item"
          onChange={formik.handleChange}
          value={formik.values.item}
          style={{ width: "250px" }}
        />
        <p style={{ color: "red" }}> {formik.errors.item}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          style={{ width: "100px" }}
        />
        <p style={{ color: "red" }}> {formik.errors.quantity}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="party_id">Party ID</label>
        <input
          id="party_id"
          name="party_id"
          onChange={formik.handleChange}
          value={formik.values.party_id}
          style={{ width: "100px" }}
        />
        <p style={{ color: "red" }}> {formik.errors.party_id}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="guest_id">Guest ID</label>
        <input
          id="guest_id"
          name="guest_id"
          onChange={formik.handleChange}
          value={formik.values.guest_id}
          style={{ width: "100px" }}
        />
        <p style={{ color: "red" }}> {formik.errors.guest_id}</p>
        </Form.Field>
        <Button style={{ background: "#D61C4E" }} type="submit">Submit</Button>
      </Form>
      )}
    </div>
  );
};

export default FoodForm;