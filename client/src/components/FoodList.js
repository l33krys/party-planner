import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FoodCard from "./FoodCard"
import {Tab, Table} from 'semantic-ui-react'

export const FoodForm = ({ foods, setFoods, refreshPage, setRefreshPage }) => {

  function handleDelete(delFood) {
    fetch(`http://127.0.0.1:5555/foods/${delFood.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const updatedFoods = foods.filter(
            (food) => food.id != delFood.id
        )
        setFoods(updatedFoods)
    })

  }

  return (
    <div style={{ width: '75%', margin: '0 auto' }}>
      <Table style={{ background: "#FEDB39", color: "black", border: "solid", margin: "30px", textAlign: "center", padding: "15px" }}>
        <Table.Header>
          <Table.Row >
          <Table.HeaderCell style={{background:"#293462", color: "white"}} rowSpan='2'>Item</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#293462", color: "white"}} rowSpan='2'>Quantity</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#293462", color: "white"}} rowSpan='2'>Party</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#293462", color: "white"}} rowSpan='2'>Assigned To Guest</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#293462", color: "white"}} rowSpan='2'></Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Table.Body>
              {foods ? foods.map((food, key) => (
                    <FoodCard key={key} food={food} handleDelete={handleDelete} />
                )) :
                <p>Loading...</p>
              }
            </Table.Body>
      </Table>
    </div>
  );
};

export default FoodForm;