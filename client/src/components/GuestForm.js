import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from 'semantic-ui-react'

export const GuestForm = ({ refreshPage, setRefreshPage }) => {
  const [showForm, setShowForm] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name"),
    email: yup.string().required("Must enter an email"),
    phone_number: yup.string().required("Must use format XXX-XXX-XXXX"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("http://localhost:5555/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        resetForm();
        if (res.status === 201) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ background: "#146C94", borderColor: "#19A7CE", border: "solid", margin: "30px", textAlign: "center" }}>
      <h2 style={{ color: "#F6F1F1", margin: "30px" }}>Add Yourself: <Button style={{ background: "#AFD3E2" }} onClick={toggleFormVisibility}>{showForm ? "Collapse Form" : "Expand Form"}</Button></h2>

      {showForm && (
        <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
          <Form.Field>
            <label htmlFor="name" style={{ color: "#F6F1F1" }}>
              What's your Name?
            </label>
            <input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              style={{ width: "250px", textAlign: "center" }}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>
          </Form.Field>
          <Form.Field>
            <label htmlFor="email" style={{ color: "#F6F1F1" }}>
              What's your Email?
            </label>
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              style={{ width: "250px", textAlign: "center" }}
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>
          </Form.Field>
          <Form.Field>
            <label htmlFor="phone_number" style={{ color: "#F6F1F1" }}>
              What's your Phone Number? (XXX-XXX-XXXX)
            </label>
            <input
              id="phone_number"
              name="phone_number"
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              style={{ width: "250px", textAlign: "center" }}
            />
            <p style={{ color: "red" }}> {formik.errors.phone_number}</p>
          </Form.Field>
          <Button style={{ background: "#AFD3E2" }} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default GuestForm;