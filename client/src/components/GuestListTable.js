import React, { useEffect, useState } from "react";

const GuestListTable = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const response = await fetch("http://localhost:5555/guest-list");
        if (response.ok) {
          const data = await response.json();
          // Organize the data by grouping parties for each guest
          const groupedGuests = groupGuestsByGuestId(data);
          setGuests(groupedGuests);
        } else {
          console.error("Error fetching guest list:", response.statusText);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching guest list:", error);
        setLoading(false);
      }
    };

    fetchGuestList();
  }, []);

  // Function to group parties by guest id
  const groupGuestsByGuestId = (data) => {
    const groupedGuests = {};
    data.forEach(({ guest, party }) => {
      if (!groupedGuests[guest.id]) {
        groupedGuests[guest.id] = {
          guest: { ...guest },
          parties: []
        };
      }
      groupedGuests[guest.id].parties.push(party);
    });
    return Object.values(groupedGuests);
  };

  return (
    <div>
      <h2>Guest List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Parties Attending</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(({ guest, parties }) => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>{guest.email}</td>
                <td>{guest.phone_number}</td>
                <td>
                  <ul>
                    {parties.map((party) => (
                      <li key={party.id}>{party.name} - {party.date}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuestListTable;
