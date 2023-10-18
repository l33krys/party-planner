import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function PartyCard({ party, handleDelete }) {

    function clickDelete(e) {
        handleDelete(party)
    }

    return (
        <>
            <tr>
            <td>{party.name}</td>
            <td>{party.location}</td>
            <td>{party.date}</td>
            <td><button onClick={clickDelete}>Delete</button></td>
            </tr>
        </>
    )

}

export default PartyCard;