import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PartyForm from "./PartyForm";
import PartyList from "./PartyList"
import FoodForm from "./FoodForm";

function App() {

    const [parties, setParties] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);
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

    function addParty(newParty) {
      setParties([...parties, newParty])
    }

  return (
    <div>
      <h1>Party Planner</h1>
      <p>Join the Party!</p>
      <PartyForm parties={parties} setParties={setParties} refreshPage={refreshPage} setRefreshPage={setRefreshPage} addParty={addParty} />
      <PartyList parties={parties} setParties={setParties} refreshPage={refreshPage} setRefreshPage={setRefreshPage} />
      <FoodForm />

    </div>

  )
}

export default App;
