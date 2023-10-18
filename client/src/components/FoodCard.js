import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function FoodCard({ food, handleDelete }) {

    function clickDelete(e) {
        handleDelete(food)
    }

return (

    <tr>
        <td>{food.item}</td>
        <td>{food.quantity}</td>
        <td>{food.party_id}</td>
        <td>{food.guest_id}</td>
        <td><button onClick={clickDelete}>Delete</button></td>
    </tr>

)

}
export default FoodCard;