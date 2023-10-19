import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./NavBar";
import PartyPage from "./PartyPage";
import FoodPage from "./FoodPage";
import GuestPage from "./GuestPage";


function App() {
  const appStyles = {
    margin: 0,
    padding: 0,
    backgroundColor: '#1CD6CE',
    minHeight: '100vh',
  };

  return (
    <Router>
    <div  style={appStyles}>
      <Navbar />
      <Switch>
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
