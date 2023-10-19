import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Card, Icon, Image, Button } from 'semantic-ui-react'

function RSVPCard({ rsvp, handleDeleteRSVP }) {

    function clickDeleteRSVP(e) {
        handleDeleteRSVP(rsvp)
    }

    // console.log(rsvp.party.name)

return (
        
        <tr>
            <td>{rsvp.id}</td>
            <td>{rsvp.party.name}</td>
            <td>{rsvp.guest.name}</td>
            <td><Button onClick={clickDeleteRSVP}>Delete</Button></td>
        </tr>

    )

}
export default RSVPCard;