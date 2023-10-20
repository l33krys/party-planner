import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Card, Icon, Image, Button } from 'semantic-ui-react'


function UserCard({ guest, handleDeleteGuest, handleEditGuest, setSelectedGuest, handleAddToParty, refreshPage, setRefreshPage, handleDeleteRSVP }) {
   
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

    // function clickDeleteRSVP(entry) {
    //     handleDeleteRSVP(entry)
    // }

    // function handleDeleteRSVP(delRSVP) {

    //     fetch(`http://127.0.0.1:5555/guest_lists/${delRSVP}`, {
    //         method: "DELETE"
    //     })
    //     .then(() => {
    //         setRefreshPage(!refreshPage)
    //     })
    //   }

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
                        {guest.guest_lists.map((item, i) => <div key={i}>- {item.party.name} <Button style={{ margin: "2px", background: "#E06469" }} onClick={(e) => {handleDeleteRSVP(item.id)}} size="mini">Delete</Button></div>)}
                    </Card.Description>
                    <br/>
                    <Button style={{ padding: "10px", background: "#E06469" }} onClick={clickDeleteGuest}>Delete User</Button>
                    <Button style={{ padding: "10px", background: "#F2B6A0" }} onClick={clickAddToParty}>Add to Party</Button>
                    
                </Card.Content>
            </Card>

        </>
    )

}

export default UserCard;
