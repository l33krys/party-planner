import React from "react";
import FoodCard from "./FoodCard"
import { Table} from 'semantic-ui-react'

export const FoodList = ({ foods, setFoods }) => {

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
      <h1 style={{ textAlign: "center", color:"#146C94", margin: "30px" }}>Food List</h1>
      <Table style={{ borderColor: "#19A7CE", background: "#AFD3E2", color: "black", border: "solid", textAlign: "center", padding: "15px" }}>
        <Table.Header>
          <Table.Row >
          <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='2'>Item</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='2'>Quantity</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='2'>Party</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='2'>Assigned To Guest</Table.HeaderCell>
          <Table.HeaderCell style={{background:"#146C94", color: "#F6F1F1"}} rowSpan='2'></Table.HeaderCell>
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
      <br />
    </div>
  );
};

export default FoodList;
