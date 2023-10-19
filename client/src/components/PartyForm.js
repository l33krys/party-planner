import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Message } from 'semantic-ui-react'

export const PartyForm = ({ refreshPage, setRefreshPage, addParty }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false);
  
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter party name"),
    location: yup.string().required("Must enter a location"),
    date: yup.date().required("Must use format yyyy-mm-dd")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      date: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
        console.log(values)
      fetch("http://localhost:5555/parties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then((res) => {
        resetForm()
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
    <div style={{ border: "solid", margin: "30px", textAlign: "center" }}>
      <h3 style={{ margin: "30px" }}>Create a Party: <Button style={{background: "#D61C4E",}}onClick={toggleFormVisibility}>{showForm ? "Collapse Form" : "Expand Form"}</Button></h3>
      
      {showForm && (
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <Form.Field>
        <label htmlFor="name">What's the occasion?</label>
        <input
          style={{ width: "250px" }}
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="location">Where should we meet?</label>
        <input
          style={{ width: "250px" }}
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="date">What day is it? (yyyy-mm-dd)</label>
        <input
          style={{ width: "150px" }}
          id="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        </Form.Field>
        <Button style={{background: "#D61C4E",}}type="submit">Submit</Button>
        {showSuccess? <Message
                        success
                        header="Party Created"
                        content="You're ready to start adding guests and food"
                      /> : ""}

      </Form>
      )}
    </div>
  );
};

export default PartyForm;