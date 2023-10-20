import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'

export const GuestForm = ({ refreshPage, setRefreshPage }) => {
  const [showForm, setShowForm] = useState(false);
  const [showErrorEmailMessage, setShowErrorEmailMessage] = useState(false)
  const [showSuccessRegistration, setShowSuccessRegistration] = useState(false)

  useEffect(() => {
    if (showSuccessRegistration) {
      const timer = setTimeout(() => {
        setShowSuccessRegistration(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessRegistration]);

  const formSchema = yup.object().shape({
    name: yup.string().uppercase().required("Must enter a name"),
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
        body: JSON.stringify({
          name: formik.values.name.charAt(0).toUpperCase() + formik.values.name.substr(1).toLowerCase(),
          email: formik.values.email,
          phone_number: formik.values.phone_number
        }, null, 2),
      }).then((res) => {
        if (res.status === 201) {
          setRefreshPage(!refreshPage);
          setShowErrorEmailMessage(false)
          setShowSuccessRegistration(true)
          resetForm();
        }
        if (res.status === 400) {
          setShowErrorEmailMessage(true)
          setShowSuccessRegistration(false)
        }
      });
    },
  });

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ background: "#146C94", borderColor: "#19A7CE", border: "solid", margin: "30px", textAlign: "center" }}>
      <h2 style={{ color: "#F6F1F1", margin: "30px" }}>Add Yourself: <Button style={{background: "#AFD3E2", marginLeft: "30px" }} onClick={toggleFormVisibility}>{showForm ? "Collapse Form" : "Expand Form"}</Button></h2>

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
          {showErrorEmailMessage ? <Message style={{ margin: "auto", width: "250px", marginBottom: "20px", color: '#E06469'}} header="Attention Required" content="Email has already been registered"></Message> : ""}
          {showSuccessRegistration ? <Message style={{ margin: "auto", width: "250px", marginBottom: "20px", color: '#19A7CE'}} header="Registration Completed" content="You're ready to start a party!"></Message> : ""}
          <Button style={{ background: "#AFD3E2" }} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default GuestForm;