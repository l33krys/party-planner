import React, { useEffect, useState } from "react";
import PartyForm from "./PartyForm";
import PartyList from "./PartyList"

function PartyPage() {

    const [parties, setParties] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
      fetch("http://localhost:5555/parties")
        .then((res) => res.json())
        .then((data) => {
          setParties(data);
          console.log("FETCH PARTIES!", data);
        });
    }, [refreshPage]);

    function addParty(newParty) {
      setParties([...parties, newParty])
    }

    function refreshParty(updatedParty) {
      const updatedParties = parties.map(party => {
        if (party.id === updatedParty.id) {
          return {...party, updatedParty}
        } else {
          return party
        }  
      })
        setParties(updatedParties)
    }
    

  return (
    <>
      <PartyList 
        parties={parties} 
        setParties={setParties} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} 
        refreshParty={refreshParty} />
      <PartyForm 
        parties={parties} 
        setParties={setParties} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} 
        addParty={addParty} />
    </>
  )
}

export default PartyPage;