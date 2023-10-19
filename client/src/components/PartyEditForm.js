import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from 'semantic-ui-react'

export const PartyEditForm = ({ refreshPage, setRefreshPage, editParty, showForm, setShowForm, refreshParty }) => {
  
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
    <div style={{ border: "solid", borderColor: "#1CD6CE", margin: "30px " }}>
      <h3>Edit Party:</h3>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">What's the occasion?</label>
        <br />
        <input
          style={{ width: "250px" }}
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="location">Where should we meet?</label>
        <br />

        <input
          style={{ width: "250px" }}
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>

        <label htmlFor="date">What day is it? (yyyy-mm-dd)</label>
        <br />

        <input
          id="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        <Button style={{background: "#D61C4E",}}type="submit">Done Editing</Button>
      </form>
    </div>
  );
};

export default PartyEditForm;