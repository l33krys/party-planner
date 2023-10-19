import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard";
import AddToPartyForm from "./AddToPartyForm";


export const UserList = ({ guests, setGuests, refreshPage, setRefreshPage, refreshGuests, parties }) => {
//   const [showForm, setShowForm] = useState(false)
  const [editGuest, setEditGuest] = useState([{}])
  const [selectedParty, setSelectedParty] = useState([{}])
  const [selectedGuest, setSelectedGuest] = useState([{}])
  const [showAddToPartyForm, setShowAddToPartyForm] = useState(false)


  function handleDeleteGuest(delGuest) {
    fetch(`http://127.0.0.1:5555/guests/${delGuest.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedGuests = guests.filter(
            (guest) => guest.id != delGuest.id
        )
        setGuests(updatedGuests)
    })

  }

  function handleEditGuest(editGuest) {
    fetch(`http://127.0.0.1:5555/guests/${editGuest.id}`, {
        method: "GET"
    })
    .then((r) => r.json())
    .then(guest => {
      setEditGuest(guest)
    //   if (!showForm) {
    //     setShowForm(!showForm)
    //   }
      
    })
    }

    function handleAddToParty(guest) {
        if (!showAddToPartyForm) {
            setShowAddToPartyForm(!showAddToPartyForm)
            setSelectedGuest(guest)
        }
    }
  

  return (
    <div style={{ border: "solid", margin: "30px" }}>
        {showAddToPartyForm ? 
        <AddToPartyForm 
            parties={parties} 
            selectedParty={selectedParty}
            selectedGuest={selectedGuest}
            setShowAddToPartyForm={setShowAddToPartyForm} 
            showAddToPartyForm={showAddToPartyForm} 
            setRefreshPage={setRefreshPage} 
            refreshPage={refreshPage} /> 
            : ""}
      
      <h1>Site Users</h1>
      <Card.Group style={{ margin: "30px " }}>
        {guests ? (
            guests.map((guest, key) => (
              <UserCard key={key} guest={guest} handleDeleteGuest={handleDeleteGuest} handleEditGuest={handleEditGuest} setSelectedGuest={setSelectedGuest} handleAddToParty={handleAddToParty}
              setRefreshPage={setRefreshPage} 
              refreshPage={refreshPage} />
            ))
          ) :
          (
            <p>Loading</p>
          )}
      </Card.Group>
      {/* {showForm ? <PartyEditForm refreshPage={refreshPage} setRefreshPage={setRefreshPage} editParty={editParty} showForm={showForm} setShowForm={setShowForm} refreshParty={refreshParty} /> : ""} */}
    </div>
  );
};

export default UserList;