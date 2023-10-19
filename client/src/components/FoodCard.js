import React from "react";
import {Table, Button,} from 'semantic-ui-react'

function FoodCard({ food, handleDelete }) {

    function clickDelete(e) {
        handleDelete(food)
    }

return (
        <Table.Row>
        <Table.Cell>
            <>{food.item}</>
        </Table.Cell>
        <Table.Cell>
            <>{food.quantity}</>
        </Table.Cell>
        <Table.Cell>
            <>{food.party_id}</>
        </Table.Cell>
        <Table.Cell>
            <>{food.guest_id}</>
        </Table.Cell>
        <Table.Cell>
            <><Button style={{ background: "#D61C4E" }} onClick={clickDelete}>Delete</Button></>
        </Table.Cell>
        </Table.Row>
    )

}
export default FoodCard;
