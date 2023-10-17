import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PartyForm from "./PartyForm";
import GuestForm from "./GuestForm";
import GuestListTable from "./GuestListTable";

function App() {
  return (
    <div>
      <h1>Party Planner</h1>
      <p>Join the Party!</p>
      <PartyForm />
      <GuestForm />
      <GuestListTable />
    </div>

  )
}

export default App;
