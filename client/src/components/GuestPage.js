import React, { useEffect, useState } from "react";
import GuestForm from "./GuestForm";
import RSVPList from "./RSVPList";
import UserList from "./UserList";

function GuestPage({ guests, setGuests, parties, refreshPage, setRefreshPage }) {
    const [RSVPs, setRSVPs] = useState([])
    
      useEffect(() => {
        fetch("http://localhost:5555/guest_lists")  
          .then(response => response.json())
          .then((data) => setRSVPs(data))
          .catch(error => console.error("Error fetching data:", error));
      }, [refreshPage]);
    
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

      function handleDeleteRSVP(delRSVP) {
        let id = 0
        if (typeof(delRSVP) === 'object') {
          id = delRSVP.id

        } else {
          id = delRSVP

        }
        fetch(`http://127.0.0.1:5555/guest_lists/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setRefreshPage(!refreshPage)
        })
      }

return (
    <>
    <GuestForm 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} />
    <UserList 
        guests={guests}
        setGuests={setGuests}
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage}
        parties={parties}
        handleDeleteRSVP={handleDeleteRSVP} />
    <RSVPList 
        guests={guests} 
        parties={parties} 
        onAddPartyToGuest={handleAddPartyToGuest}
        RSVPs={RSVPs}
        setRSVPs={setRSVPs} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage}
        handleDeleteRSVP={handleDeleteRSVP}/>
    </>
)
}

export default GuestPage;