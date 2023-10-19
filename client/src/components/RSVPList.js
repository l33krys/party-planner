// import React from "react";

// function RSVPList({ guests }) {
//   return (
//     <>
//       <h2>Guest List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Attending Parties</th>
//           </tr>
//         </thead>
//         <tbody>
//           {guests.map((guest) => (
//             <tr key={guest.id}>
//               <td>{guest.name ? guest.name : "N/A"}</td>
//               <td>{guest.email ? guest.email : "N/A"}</td>
//               <td>{guest.phone_number ? guest.phone_number : "N/A"}</td>
//               <td>{guest.attParties ? guest.attParties : "N/A"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
// export default RSVPList;

import React, { useEffect, useState } from "react";
import RSVPCard from "./RSVPCard"

export const RSVPList = ({ RSVPs, setRSVPs }) => {

  function handleDeleteRSVP(delRSVP) {
    fetch(`http://127.0.0.1:5555/guest_lists/${delRSVP.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedRSVPs = RSVPs.filter(
            (rsvp) => rsvp.id != delRSVP.id
        )
        setRSVPs(updatedRSVPs)
    })
  }

  return (
    <div>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Party</th>
            <th>Guest</th>
            <th></th>
          </tr>
          {RSVPs ? RSVPs.map((rsvp, key) => (
                <RSVPCard key={key} rsvp={rsvp} handleDeleteRSVP={handleDeleteRSVP} />
            )) :
            <p>Loading...</p>
          }
        </tbody>
      </table>
    </div>
  );
};

export default RSVPList;
