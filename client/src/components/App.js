import React, { useEffect, useState } from "react";
import PartyForm from "./PartyForm";
import GuestForm from "./GuestForm";
import GuestList from "./GuestList";

function App() {
  const [guests, setGuests] = useState([]);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/guests")  
      .then(response => response.json())
      .then(data => setGuests(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAddPartyToGuest = (guestId, partyId) => {
    const updatedGuests = guests.map((guest) => {
      if (guest.id === guestId) {
        return {
          ...guest,
          attParties: [...guest.attParties, parties.find((party) => party.id === partyId)]
        };
      }
      return guest;
    });
    setGuests(updatedGuests);
  };

  return (
    <div>
      <h1>Party Planner</h1>
      <p>Join the Party!</p>
      <PartyForm parties={parties} setParties={setParties} guests={guests} />
      <GuestForm />
      <GuestList guests={guests} parties={parties} onAddPartyToGuest={handleAddPartyToGuest} />
    </div>

  )
}

export default App;
