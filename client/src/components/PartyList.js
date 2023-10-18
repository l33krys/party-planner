import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PartyCard from "./PartyCard"

export const PartyList = ({ parties, setParties, refreshPage, setRefreshPage }) => {
//   const [parties, setParties] = useState([{}]);
//   const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  useEffect(() => {
    console.log("FETCH PARTIES! ");
    fetch("http://localhost:5555/parties")
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
        console.log(data);
      });
  }, [refreshPage]);


  function handleDelete(delParty) {
    fetch(`http://127.0.0.1:5555/parties/${delParty.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedParties = parties.filter(
            (party) => party.id != delParty.id
        )
        setParties(updatedParties)
    })

  }
  
  return (
    <div>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>Party</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
          {parties ? (
            parties.map((party, key) => (
              <PartyCard key={key} party={party} handleDelete={handleDelete} />
            ))
          ) :
          (
            <p>Loading</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PartyList;