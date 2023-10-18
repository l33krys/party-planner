import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import FoodForm from "./FoodForm";


function PartyCard({ party, handleDelete, handleEdit }) {
    
    function clickDelete(e) {
        handleDelete(party)
    }

    function clickEdit(e) {
        handleEdit(party)
    }

    function clickAssignFood(e) {
        console.log("Route to food page")
    }

    return (
        <>
            <Card>
                <Image src="https://c.pxhere.com/photos/1b/9e/balloons_birthday_bright_celebration_color_colorful_coloring_colourful-1561027.jpg!d" wrapped ui={false} />
                <Card.Content>
                    <p>{party.name}</p>
                    <p>Location: {party.location}</p>
                    <p>Date: {party.date}</p>
                    <p><Button style={{ padding: "10px" }} onClick={clickEdit}>Edit</Button>
                        <Button style={{ padding: "10px" }} onClick={clickAssignFood}>Assign Food</Button>
                        <Button style={{ padding: "10px" }} onClick={clickDelete}>Delete</Button>
                        
                    </p>
                </Card.Content>
            </Card>


            {/* <tr>
            <td>{party.name}</td>
            <td>{party.location}</td>
            <td>{party.date}</td>
            <td><button onClick={clickDelete}>Delete</button></td>
            </tr> */}

        </>
    )

}

export default PartyCard;
