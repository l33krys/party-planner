import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const PartyForm = ({ parties, setParties, guests }) => {
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter party name"),
    location: yup.string().required("Must enter a location"),
    date: yup.date().required("Must use format yyyy-mm-dd")
  });

  const [refreshPage, setRefreshPage] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [selectedGuestsList, setSelectedGuestsList] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      date: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      values.attendingGuests = selectedGuests;
      fetch("http://localhost:5555/parties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        resetForm();
        if (res.status === 201) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  const handleGuestSelection = (e) => {
    const selectedGuestId = parseInt(e.target.value);
    setSelectedGuests((prevSelectedGuests) => {
      if (prevSelectedGuests.includes(selectedGuestId)) {
        return prevSelectedGuests.filter((guestId) => guestId !== selectedGuestId);
      } else {
        return [...prevSelectedGuests, selectedGuestId];
      }
    });
  };

  useEffect(() => {
    setSelectedGuestsList(guests.filter((guest) => selectedGuests.includes(guest.id)));
  }, [selectedGuests, guests]);

  useEffect(() => {
    fetch("http://localhost:5555/parties")
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
        console.log(data)
      });
  }, [refreshPage, setParties]);

  return (
    <div>
      <h2>Host a Party</h2>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">What's the occasion?</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="location">Where should we meet?</label>
        <br />
        <input
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        <label htmlFor="date">What day is it? (yyyy-mm-dd)</label>
        <br />
        <input
          id="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <p style={{ color: "red" }}> {formik.errors.date}</p>
        <div>
  <h2>Select Guests:</h2>
  {guests.map((guest) => (
    <div key={guest.id}>
      <input
        type="checkbox"
        id={`guest-${guest.id}`}
        name={`guest-${guest.id}`}
        value={guest.id}
        checked={selectedGuests.includes(guest.id)}
        onChange={handleGuestSelection}
      />
      <label htmlFor={`guest-${guest.id}`}>{guest.name}</label>
    </div>
  ))}
  <p style={{ color: "red" }}>{formik.errors.attendingGuests}</p>
</div>
<div>
          <ul>
            {selectedGuestsList.map((guest) => (
              <li key={guest.id}>{guest.name}</li>
            ))}
          </ul>
          <button type="submit">Add Guests</button>
        </div>

        <button type="submit">Submit</button>
      </form>
      <table style={{ padding: "15px" }}>
  <tbody>
    <tr>
      <th>Party</th>
      <th>Location</th>
      <th>Date</th>
    </tr>
    {parties.length === 0 ? (
      <tr>
        <td colSpan="4">Loading...</td>
      </tr>
    ) : (
      parties.map((party, i) => (
        <tr key={i}>
          <td>{party.name}</td>
          <td>{party.location}</td>
          <td>{party.date}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
    </div>
  );
};

export default PartyForm;
