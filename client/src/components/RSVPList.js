import React from "react";
import { Table, Button} from 'semantic-ui-react'

export const RSVPList = ({ RSVPs, setRSVPs, refreshPage, setRefreshPage }) => {

  const sortedRSVPs = RSVPs.sort((a, b) => {
    const partyA = a.party.name.toUpperCase();
    const partyB = b.party.name.toUpperCase();
    if (partyA < partyB) {
      return -1;
    }
    if (partyA > partyB) {
      return 1;
    }
    return 0;
  });

  const groupedRSVPs = RSVPs.reduce((acc, rsvp) => {
    const partyName = rsvp.party.name;
    if (!acc[partyName]) {
      acc[partyName] = [];
    }
    acc[partyName].push(rsvp);
    return acc;
  }, {});

  function handleDeleteRSVP(delRSVP) {
    fetch(`http://127.0.0.1:5555/guest_lists/${delRSVP.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedRSVPs = RSVPs.filter(
            (rsvp) => rsvp.id != delRSVP.id
        )
        setRSVPs(updatedRSVPs)
        setRefreshPage(!refreshPage)
    })
  }

  return (
    <div style={{ width: '75%', margin: '0 auto' }}>
      <h1 style={{ textAlign: "center", color:"#146C94", margin: "30px" }}>RSVP List</h1>
      <Table style={{ borderColor: "#19A7CE", background: "#AFD3E2", color: "black", border: "solid",  textAlign: "center", padding: "15px", }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='1'>Party</Table.HeaderCell>
            <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='3'>Guest</Table.HeaderCell>
            <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='1'></Table.HeaderCell>
          </Table.Row>
          </Table.Header>
          <Table.Body>
          {Object.keys(groupedRSVPs).map(partyName => (
            <Table.Row key={partyName}>
              <Table.Cell>{partyName}</Table.Cell>
              <Table.Cell>
                {groupedRSVPs[partyName].map((rsvp, index) => (
                  <span key={index}>{rsvp.guest.name}{index !== groupedRSVPs[partyName].length - 1 ? ', ' : ''}</span>
                ))}
              </Table.Cell>
              <Table.Cell>
                <Button style={{ background: "#E06469" }} onClick={() => handleDeleteRSVP(groupedRSVPs[partyName][0])}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RSVPList;
