import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import PartyCard from "./PartyCard"

export const PartyForm = ({ refreshPage, setRefreshPage, addParty }) => {
  // const [parties, setParties] = useState([{}]);
  // const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  // useEffect(() => {
  //   console.log("FETCH PARTIES! ");
  //   fetch("http://localhost:5555/parties")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setParties(data);
  //       console.log(data);
  //     });
  // }, [refreshPage]);
  
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
        if (res.status == 201) {
          setRefreshPage(!refreshPage);
        }
      })
      // .then(r => r.json())
      // .then(newParty =>{
      //   addParty(newParty)
      //   resetForm()
      // })
    },
  });

  // function handleDelete(delParty) {
  //   fetch(`http://127.0.0.1:5555/parties/${delParty.id}`, {
  //       method: "DELETE"
  //   })
  //   .then(() => {
  //       const updatedParties = parties.filter(
  //           (party) => party.id != delParty.id
  //       )
  //       setParties(updatedParties)
  //   })

  // }
  
  return (
    <div style={{ border: "solid", margin: "30px " }}>
      <h3 style={{ color: "blue" }}>Create a Party:</h3>
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
      {/* <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>Party</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
          {parties ? (
            parties.map((party, key) => (
              <PartyCard key={key} party={party} handleDelete={handleDelete} />
              // <>
              //   <tr key={i}>
              //     <td>{party.name}</td>
              //     <td>{party.location}</td>
              //     <td>{party.date}</td>
              //   </tr>
              // </>
            ))
          ) :
          (
            <p>Loading</p>
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default PartyForm;