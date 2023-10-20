import React, {useState, useEffect} from "react";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import SearchParty from "./SearchParty";


function FoodPage({ parties, refreshPage, setRefreshPage }) {
  const [foods, setFoods] = useState([{}]);
  // const [refreshPage, setRefreshPage] = useState(false);

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
      addFood={addFood} />
    <SearchParty
      parties={parties} />
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
