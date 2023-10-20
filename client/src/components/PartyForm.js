import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'

export const PartyForm = ({ refreshPage, setRefreshPage }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter party name"),
    location: yup.string().required("Must enter a location"),
    date: yup.date("yyyy-mm-dd").required("Must use format yyyy-mm-dd")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      date: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("http://localhost:5555/parties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then((res) => {
        resetForm()
        console.log(res)
        if (res.status === 201) {
          setRefreshPage(!refreshPage);
          setShowSuccess(true)
        }
      })
    },
  });

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };



  return (
    <div style={{ background: "#146C94", borderColor: "#19A7CE", border: "solid", margin: "30px", textAlign: "center" }}>
      <h3 style={{ color:"#F6F1F1", margin: "30px" }}>Create a Party: <Button style={{background: "#AFD3E2",}}onClick={toggleFormVisibility}>{showForm ? "Collapse Form" : "Expand Form"}</Button></h3>
      
      {showForm && (
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <Form.Field>
        <label htmlFor="name" style={{color: "#F6F1F1"}}>What's the occasion?</label>
        <input
          style={{ width: "250px", textAlign: "center" }}
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="location" style={{color: "#F6F1F1"}}>Where should we meet?</label>
        <input
          style={{ width: "250px", textAlign: "center" }}
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="date" style={{color: "#F6F1F1"}}>What day is it? (yyyy-mm-dd)</label>
        <input
          style={{ width: "250px", textAlign: "center" }}
          id="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        </Form.Field>
        <Button style={{background: "#AFD3E2",}}type="submit">Submit</Button>
        {showSuccess ? <Message
        style={{ margin: "auto", width: "350px", marginTop: "20px", color: '#19A7CE'}}
                        header="Party Created"
                        content="You're ready to start adding guests and food"
                      /> : ""}
      </Form>
      )}
    </div>
  );
};

export default PartyForm;
