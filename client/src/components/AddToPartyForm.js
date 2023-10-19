import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Card, Icon, Image, Button } from 'semantic-ui-react'

export const AddToPartyForm = ({ parties, selectedParty, selectedGuest, setShowAddToPartyForm, showAddToPartyForm, setRefreshPage, refreshPage }) => {
  
  const formSchema = yup.object().shape({
    guest_id: yup.number().required("Must enter valid Guest ID"),
    party_id: yup.number().required("Must enter valid Party ID"),
  });

  const formik = useFormik({
    initialValues: {
      guest_id: selectedGuest.id,
      party_id: ""
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch(`http://localhost:5555/guest_lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            guest_id: parseInt(values.guest_id),
            party_id: parseInt(values.party_id)
        }, null, 2),
      })
      .then((res) => {
        resetForm()
        if (res.status == 201) {
          setRefreshPage(!refreshPage);
          setShowAddToPartyForm(!showAddToPartyForm)
        }
      })
    },
  });
  
  return (
    <div style={{ margin: "30px " }}>
      <h3 style={{ color: "blue" }}>Add to Party:</h3>
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="guest_id">Guest ID</label>
        <br />
        <input
          style={{ width: "250px" }}
          id="guest_id"
          name="guest_id"
          onChange={formik.handleChange}
          value={formik.values.guest_id}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="party_id">Party ID</label>
        <br />

        <input
          style={{ width: "250px" }}
          id="party_id"
          name="party_id"
          onChange={formik.handleChange}
          value={formik.values.party_id}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>

        <Button type="submit">RSVP</Button>
        <Button onClick={(e) => setShowAddToPartyForm(false)}>Cancel</Button>
      </Form>
    </div>
  );
};

export default AddToPartyForm;