import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

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
        if (res.status == 200) {
          setRefreshPage(!refreshPage);
          setShowForm(!showForm)
        }
      })
    },
  });
  
  return (
    <div style={{ border: "solid", margin: "30px " }}>
      <h3 style={{ color: "blue" }}>Edit Party:</h3>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">What's the occasion?</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="location">Where should we meet?</label>
        <br />

        <input
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PartyEditForm;