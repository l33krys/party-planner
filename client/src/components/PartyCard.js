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
            <Card style={{background: "#FEDB39", border: "solid", borderColor: "#293462", textAlign: "center"}}>
                <Image src="https://c.pxhere.com/photos/1b/9e/balloons_birthday_bright_celebration_color_colorful_coloring_colourful-1561027.jpg!d" wrapped ui={false} />
                <Card.Content>
                    <p>{party.name}</p>
                    <p>Location: {party.location}</p>
                    <p>Date: {party.date}</p>
                    <p>Party ID: {party.id}</p>
                    <p><Button style={{ background: "#D61C4E", padding: "10px" }} onClick={clickEdit}>Edit</Button>
                        <Button style={{ background: "#D61C4E", padding: "10px" }} onClick={clickDelete}>Delete</Button>
                    </p>
                </Card.Content>
            </Card>
        </>
    )
}
export default PartyCard;