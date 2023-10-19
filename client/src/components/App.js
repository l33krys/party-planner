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

  return (
    <Router>
    <div  style={appStyles}>
      <Navbar />
      <Switch>
        <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/party">
            <PartyPage />
          </Route>
          <Route path="/food">
            <FoodPage />
          </Route>
          <Route path="/guest">
            <GuestPage />
          </Route>
        </Switch>
    </div>
    </Router>
  )
}

export default App;
