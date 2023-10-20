import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Message } from 'semantic-ui-react'

export const AddToPartyForm = ({ parties, guests, selectedGuest, setShowAddToPartyForm, showAddToPartyForm, setRefreshPage, refreshPage }) => {
  
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const formSchema = yup.object().shape({
    guest_id: yup.number().max(guests.length, "Must be valid party ID").required("Must enter valid Guest ID"),
    party_id: yup.number().max(parties.length, "Must be valid party ID").required("Must enter valid Party ID"),
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
        if (res.status == 400) {
          setShowErrorMessage(true)
        }
      })
    },
  });
  
  return (
    <div style={{textAlign:"center", background: "#F2B6A0", border: "solid", borderColor: "#E06469", margin: "30px " }}>
      <h3 style={{ margin: "30px" }}>Add to Party:</h3>
      <Form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
      <Form.Field>
        <label htmlFor="guest_id">Guest ID</label>
        <input
          style={{ width: "250px", textAlign: "center" }}
          id="guest_id"
          name="guest_id"
          onChange={formik.handleChange}
          value={formik.values.guest_id}
        />
        <p style={{ color: "#146C94" }}> {formik.errors.guest_id}</p>
        </Form.Field>
        <Form.Field>
        <label htmlFor="party_id">Party ID</label>
        <input
          style={{ width: "250px", textAlign: "center" }}
          id="party_id"
          name="party_id"
          onChange={formik.handleChange}
          value={formik.values.party_id}
        />
        <p style={{ color: "#146C94" }}> {formik.errors.party_id}</p>
        </Form.Field>
        {showErrorMessage ? <Message style={{ margin: "auto", width: "250px", marginBottom: "20px", color: '#E06469' }} header="Attention Required" content="You already RSVP'd"></Message> : ""}
        <Button style={{background: "#AFD3E2",}} type="submit">RSVP</Button>
        <Button style={{background: "#E06469",}} onClick={(e) => setShowAddToPartyForm(false)}>Cancel</Button>
      </Form>
    </div>
  );
};

export default AddToPartyForm;