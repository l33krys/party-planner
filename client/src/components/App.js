import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./NavBar";
import PartyPage from "./PartyPage";
import FoodPage from "./FoodPage";
import GuestPage from "./GuestPage";
import HomePage from "./HomePage";


function App() {
  const appStyles = {
    margin: 0,
    padding: 0,
    backgroundColor: '#F6F1F1',
    minHeight: '100vh',
  };

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
    <Router>
    <div  style={appStyles}>
      <Navbar />
      <Switch>
        <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/party">
            <PartyPage
              parties={parties}
              setParties={setParties}
              refreshPage={refreshPage}
              setRefreshPage={setRefreshPage} />
          </Route>
          <Route path="/food">
            <FoodPage 
              parties={parties}
              refreshPage={refreshPage}
              setRefreshPage={setRefreshPage}/>
          </Route>
          <Route path="/guest">
            <GuestPage
              parties={parties}
              setParties={setParties}
              />
          </Route>
        </Switch>
    </div>
    </Router>
  )
}

export default App;
