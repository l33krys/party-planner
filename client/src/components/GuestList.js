import React from "react";

function GuestList({ guests }) {
  return (
    <>
      <h2>Guest List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Attending Parties</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name ? guest.name : "N/A"}</td>
              <td>{guest.email ? guest.email : "N/A"}</td>
              <td>{guest.phone_number ? guest.phone_number : "N/A"}</td>
              <td>{guest.attParties ? guest.attParties : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default GuestList;
