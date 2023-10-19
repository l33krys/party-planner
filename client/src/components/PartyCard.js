import React from "react";
import { Card, Image, Button } from 'semantic-ui-react'

function PartyCard({ party, handleDelete, handleEdit }) {
    
    function clickDelete(e) {
        handleDelete(party)
    }
    function clickEdit(e) {
        handleEdit(party)
    }

    return (
        <>
            <Card style={{background: "#F6F1F1", border: "solid", borderColor: "black", textAlign: "center"}}>
                <Image src='..\PartyImage2.PNG' wrapped ui={false} />
                <Card.Content>
                    <p style={{fontWeight: 'bold'}}>{party.name}</p>
                    <p>Location: {party.location}</p>
                    <p>Date: {party.date}</p>
                    <p>Party ID: {party.id}</p>
                    <p><Button style={{ background: "#F2B6A0", padding: "10px" }} onClick={clickEdit}>Edit</Button>
                        <Button style={{ background: "#E06469", padding: "10px" }} onClick={clickDelete}>Delete</Button>
                    </p>
                </Card.Content>
            </Card>
        </>
    )
}
export default PartyCard;