import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PartyForm from "./PartyForm";
import PartyList from "./PartyList"
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";

function App() {

    const [parties, setParties] = useState([{}]);
    const [foods, setFoods] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
  
    useEffect(() => {
      console.log("FETCH PARTIES! ");
      fetch("http://localhost:5555/parties")
        .then((res) => res.json())
        .then((data) => {
          setParties(data);
        });
    }, [refreshPage]);

    useEffect(() => {
      console.log("FETCH FOOD! ");
      fetch("http://localhost:5555/foods")
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
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
    

    function addFood(newFood) {
      setFoods([...foods, newFood])
    }

  return (
    <div>
      <h1>Party Planner</h1>
      <p>Join the Party!</p>
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
      <FoodForm 
        foods={foods} 
        setFoods={setFoods} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} 
        addFood={addFood} />
      <FoodList 
        foods={foods} 
        setFoods={setFoods} 
        refreshPage={refreshPage} 
        setRefreshPage={setRefreshPage} />

    </div>

  )
}

export default App;
