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
            <>{food.party ? food.party['name'] : ""}</>
        </Table.Cell>
        <Table.Cell>
            <>{food.guest ? food.guest['name'] : ""}</>
        </Table.Cell>
        <Table.Cell>
            <><Button style={{ background: "#E06469" }} onClick={clickDelete}>Delete</Button></>
        </Table.Cell>
        </Table.Row>
    )

}
export default FoodCard;
