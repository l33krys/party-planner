import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export const GuestForm = ({ guests, setGuests, refreshPage, setRefreshPage }) => {
  // const [guests, setGuests] = useState([]);
  // const [refreshPage, setRefreshPage] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:5555/guests")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGuests(data);
  //     });
  // }, [refreshPage]);

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name"),
    email: yup.string().required("Must enter a email"),
    phone_number: yup.string().required("Must use format XXX-XXX-XXXX")
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
        resetForm()
        if (res.status === 201) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div>
      <h2>Add Yourself</h2>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">What's your Name?</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="email">What's your Email?</label>
        <br />

        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>

        <label htmlFor="phone_number">What's your Phone Number? (XXX-XXX-XXXX)</label>
        <br />

        <input
          id="phone_number"
          name="phone_number"
          onChange={formik.handleChange}
          value={formik.values.phone_number}
        />
        <p style={{ color: "red" }}> {formik.errors.phone_number}</p>
        <button type="submit">Submit</button>
      </form>
      {/* <table style={{ padding: "15px" }}>
        <tbody>
        <h2>All Users</h2>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
          {guests === undefined ? (
            <p>Loading</p>
          ) : (
            guests.map((guest, i) => (
              <>
                <tr key={i}>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>{guest.phone_number}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default GuestForm;