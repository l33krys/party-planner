import React, {useState, useEffect} from "react";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";

function FoodPage({ guests, parties, refreshPage, setRefreshPage }) {
  const [foods, setFoods] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5555/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        console.log("FETCH FOOD!", data);
      });
  }, [refreshPage]);

  function addFood(newFood) {
    setFoods([...foods, newFood])
  }

  return (
    <>
    <FoodForm
      foods={foods} 
      setFoods={setFoods} 
      refreshPage={refreshPage} 
      setRefreshPage={setRefreshPage} 
      addFood={addFood}
      parties={parties}
      guests={guests} />
    <FoodList
      foods={foods} 
      setFoods={setFoods} 
      refreshPage={refreshPage} 
      setRefreshPage={setRefreshPage}
      food={foods} />
    </>
  )
}

export default FoodPage;
