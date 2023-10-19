import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Card, Icon, Image, Button } from 'semantic-ui-react'


function UserCard({ guest, handleDeleteGuest, handleEditGuest, setSelectedGuest, handleAddToParty, refreshPage, setRefreshPage }) {
    
    function clickDeleteGuest(e) {
        handleDeleteGuest(guest)
    }

    function clickEditGuest(e) {
        handleEditGuest(guest)
    }

    function clickAddToParty(e) {
        // setSelectedGuest(guest)
        handleAddToParty(guest)
    }

    // console.log(guest.guest_lists.map((item) => item.party.name))

    

    return (
        <>
            <Card style={{ borderColor: "#146C94" ,border: "solid", background: "#F6F1F1" }}>

                <Card.Content>
                    <Image 
                          floated='right'
                          size='mini'
                          src='..\UserIcon.png'/>
                    <Card.Header>{guest.name} (ID: {guest.id}) </Card.Header>
                    <Card.Meta>{guest.email}</Card.Meta>
                    <Card.Meta>{guest.phone_number}</Card.Meta>
                    <Card.Description>
                        {guest.guest_lists.length > 0 ? `RSVP'd to ${guest.guest_lists.length} parties` : "Not going to party"}
                        {guest.guest_lists.map((item, i) => <div key={i}>- {item.party.name}</div>)}
                    </Card.Description>

                    <Button style={{ padding: "10px", background: "#E06469" }} onClick={clickDeleteGuest}>Delete</Button>
                    <Button style={{ padding: "10px", background: "#F2B6A0" }} onClick={clickAddToParty}>Add to Party</Button>
                    
                </Card.Content>
            </Card>

        </>
    )

}

export default UserCard;
