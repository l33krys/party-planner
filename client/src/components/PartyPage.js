import React from "react";
import PartyForm from "./PartyForm";
import PartyList from "./PartyList"

function PartyPage({ parties, setParties, refreshPage, setRefreshPage }) {

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
      <PartyForm 
        parties={parties} 
        setParties={setParties} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} 
        addParty={addParty} />
      <PartyList 
        parties={parties} 
        setParties={setParties} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} 
        refreshParty={refreshParty} />
    </>
  )
}

export default PartyPage;
