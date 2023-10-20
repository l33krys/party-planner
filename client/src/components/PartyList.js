import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import PartyCard from "./PartyCard"
import PartyEditForm from "./PartyEditForm";

export const PartyList = ({ parties, setParties, refreshPage, setRefreshPage, refreshParty }) => {
  const [showForm, setShowForm] = useState(false)
  const [editParty, setEditParty] = useState([{}])

  function handleDelete(delParty) {
    fetch(`http://127.0.0.1:5555/parties/${delParty.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedParties = parties.filter(
            (party) => party.id !== delParty.id
        )
        setParties(updatedParties)
        setRefreshPage(!refreshPage)
    })

  }

  function handleEdit(editParty) {
    fetch(`http://127.0.0.1:5555/parties/${editParty.id}`, {
        method: "GET"
    })
    .then((r) => r.json())
    .then(party => {
      setEditParty(party)
      if (!showForm) {
        setShowForm(!showForm)
      }
      
    })
    }  
  
  return (
    <div style={{ background: "#146C94", borderColor: "#19A7CE", border: "solid", margin: "30px ", textAlign: "center" }}>
      <h1 style={{ textAlign: "center", margin: "30px", color:"#F6F1F1" }}>My Parties</h1>
      <Card.Group style={{ margin: "30px " }}>
        {parties ? (
            parties.map((party, key) => (
              <PartyCard key={key} party={party} handleDelete={handleDelete} handleEdit={handleEdit} />
            ))
          ) :
          (
            <p>Loading</p>
          )}
      </Card.Group>
      {showForm ? <PartyEditForm refreshPage={refreshPage} setRefreshPage={setRefreshPage} editParty={editParty} showForm={showForm} setShowForm={setShowForm} refreshParty={refreshParty} /> : ""}
    </div>
  );
};

export default PartyList;
