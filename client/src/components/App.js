import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PartyForm from "./PartyForm";

function App() {
  return (
    <div>
      <h1>Party Planner</h1>
      <p>Join the Party!</p>
      <PartyForm />
    </div>

  )
}

export default App;
