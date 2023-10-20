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
  const [guests, setGuests] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5555/guests")  
      .then(response => response.json())
      .then((data) => setGuests(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [refreshPage]);

  useEffect(() => {
    fetch("http://localhost:5555/parties")
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
      });
  }, [refreshPage]);
  

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
              guests={guests}
              parties={parties}
              refreshPage={refreshPage}
              setRefreshPage={setRefreshPage} />
          </Route>
          <Route path="/guest">
            <GuestPage
              guests={guests}
              setGuests={setGuests}
              parties={parties}
              setParties={setParties}
              refreshPage={refreshPage}
              setRefreshPage={setRefreshPage}
              />
          </Route>
        </Switch>
    </div>
    </Router>
  )
}

export default App;
