import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'

export const FoodForm = ({ refreshPage, setRefreshPage }) => {
  const [showForm, setShowForm] = useState(false);
  const [showFoodSuccess, setShowFoodSuccess] = useState(false)

  const formSchema = yup.object().shape({
    item: yup.string().required("Must enter party name"),
    quantity: yup.number().required("Must enter a number quantity"),
    party_id: yup.number().required("Party must be exist"),
    guest_id: yup.number().required("Guest must exist")
  });

  useEffect(() => {
    if (showFoodSuccess) {
      const timer = setTimeout(() => {
        setShowFoodSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showFoodSuccess]);

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
        if (res.status == 201) {
          resetForm()
          setRefreshPage(!refreshPage);
          setShowFoodSuccess(!showFoodSuccess)
        }
      });
    },
  });
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ background:"#146C94",border: "solid", margin: "30px", textAlign: "center" }}>
      <h3 style={{ margin: "30px", color:"#F6F1F1" }}>Add & Assign Food Items <Button
          style={{background: "#AFD3E2", marginLeft: "30px" }}
          onClick={toggleFormVisibility}
        >
          {showForm ? "Collapse Form" : "Expand Form"}
        </Button></h3>
    {showForm && (
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <Form.Field>
        <label htmlFor="item"style={{color: "#F6F1F1"}}>Item</label>
        <input
          id="item"
          name="item"
          onChange={formik.handleChange}
          value={formik.values.item}
          style={{ width: "250px", textAlign: "center" }}
        />
        <p style={{ color: "red" }}> {formik.errors.item}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="quantity"style={{color: "#F6F1F1"}}>Quantity</label>
        <input
          id="quantity"
          name="quantity"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          style={{ width: "250px", textAlign: "center" }}
        />
        <p style={{ color: "red" }}> {formik.errors.quantity}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="party_id"style={{color: "#F6F1F1"}}>Party ID</label>
        <input
          id="party_id"
          name="party_id"
          onChange={formik.handleChange}
          value={formik.values.party_id}
          style={{ width: "250px", textAlign: "center" }}
        />
        <p style={{ color: "red" }}> {formik.errors.party_id}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="guest_id"style={{color: "#F6F1F1"}}>Guest ID</label>
        <input
          id="guest_id"
          name="guest_id"
          onChange={formik.handleChange}
          value={formik.values.guest_id}
          style={{ width: "250px", textAlign: "center" }}
        />
        <p style={{ color: "red" }}> {formik.errors.guest_id}</p>
        </Form.Field>
        <Button style={{ background: "#AFD3E2" }} type="submit">Submit</Button>
        {showFoodSuccess ? <Message
        style={{ margin: "auto", width: "350px", marginTop: "20px", color: '#19A7CE'}}
                        header="Success: Food Created & Assigned"
                        content="Thanks for your contribution"
                      /> : ""}
      </Form>
      )}
    </div>
  );
};

export default FoodForm;
