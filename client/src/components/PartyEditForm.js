import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from 'semantic-ui-react'

export const PartyEditForm = ({ refreshPage, setRefreshPage, editParty, showForm, setShowForm }) => {
  
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter party name"),
    location: yup.string().required("Must enter a location"),
    date: yup.date().required("Must use format yyyy-mm-dd")
  });

  const formik = useFormik({
    initialValues: {
      id: editParty.id,
      name: editParty.name,
      location: editParty.location,
      date: editParty.date,
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
        console.log(values)
      fetch(`http://localhost:5555/parties/${editParty.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then((res) => {
        resetForm()
        console.log(res.status)
        if (res.status === 200) {
          setRefreshPage(!refreshPage);
          setShowForm(!showForm)
        }
      })
    },
  });
  
  return (
    <div style={{ background: "#F2B6A0", border: "solid", borderColor: "#E06469", margin: "30px " }}>
      <h3 style={{ margin: "30px" }}>Edit Party:</h3>
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
      <Form.Field>
        <label htmlFor="name">What's the occasion?</label>
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
        <label htmlFor="location">Where should we meet?</label>
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
        <label htmlFor="date">What day is it? (yyyy-mm-dd)</label>
        <input
          id="date"
          name="date"
          style={{ width: "250px", textAlign: "center" }}
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        </Form.Field>
        <Button style={{background: "#AFD3E2",}}type="submit">Done Editing</Button>
      </Form>
    </div>
  );
};

export default PartyEditForm;