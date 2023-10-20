import React, {  useState } from "react";
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard";
import AddToPartyForm from "./AddToPartyForm";


export const UserList = ({ guests, setGuests, refreshPage, setRefreshPage, parties, handleDeleteRSVP }) => {
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
        setRefreshPage(!refreshPage)
    })

  }

    function handleAddToParty(guest) {
        if (!showAddToPartyForm) {
            setShowAddToPartyForm(!showAddToPartyForm)
            setSelectedGuest(guest)
        }
    }

  return (
    <div style={{ background:"#146C94", border: "solid", margin: "30px" }}>
        {showAddToPartyForm ? 
        <AddToPartyForm 
            parties={parties} 
            guests={guests}
            selectedParty={selectedParty}
            selectedGuest={selectedGuest}
            setShowAddToPartyForm={setShowAddToPartyForm} 
            showAddToPartyForm={showAddToPartyForm} 
            setRefreshPage={setRefreshPage} 
            refreshPage={refreshPage} /> 
            : ""}
      
      <h1 style={{ color:"#F6F1F1", margin: "30px", textAlign:"center", }}>Site Users</h1>
      <Card.Group style={{ margin: "30px " }}>
        {guests ? (
            guests.map((guest, key) => (
              <UserCard 
                key={key} 
                guest={guest} 
                handleDeleteGuest={handleDeleteGuest} 
                setSelectedGuest={setSelectedGuest} 
                handleAddToParty={handleAddToParty}
                setRefreshPage={setRefreshPage} 
                refreshPage={refreshPage}
                handleDeleteRSVP={handleDeleteRSVP}  />
            ))
          ) :
          (
            <p>Loading</p>
          )}
      </Card.Group>
    </div>
  );
};

export default UserList;