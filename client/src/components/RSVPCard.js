import React from "react";
import {Table, Button,} from 'semantic-ui-react'

function RSVPCard({ rsvp, handleDeleteRSVP }) {

    function clickDeleteRSVP(e) {
        handleDeleteRSVP(rsvp)
    }

return (
        <Table.Row>
            <Table.Cell>{rsvp.party.name}</Table.Cell>
            <Table.Cell>{rsvp.guest.name}</Table.Cell>
            <Table.Cell><Button style={{background: "#E06469"}} onClick={clickDeleteRSVP}>Delete</Button></Table.Cell>
        </Table.Row>
    )
}
export default RSVPCard;