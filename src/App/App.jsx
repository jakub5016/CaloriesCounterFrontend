import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from '../ProductsTable';
import DatesBar from '../datesBar/DatesBar';

function fetchMeals() {
  return fetch('https://localhost:7261/api/Meals', {
    method: 'GET',
    headers: {
      'accept': 'application/json' 
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

function fetchMealsByDate(date){
  return fetch("https://localhost:7261/api/meals/" + date, {
    method: 'GET', 
    headers: {'accept':'application/json'}
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok https://localhost:7261/api/meals/' +date);
    }
    return response.json();
  })
  .then(data => {
    // let correctData = [{type: 1, products: []},{type: 2, products: []},{type: 3, products: []}]
    // correctData.map(((e, index) =>{
    //   console.log("AAA")
    //   console.log(data[index])
    //   if (data[index] == undefined){
    //     return e
    //   }
    //   else if (e.type == data[index]){
    //     console.log("AA")
    //     return data[index]
    //   }
    // }))
    // console.log("DATA")
    let correctData = []
    let i = 1
    while (i <= 3){
      if (data != undefined){
        
        data.forEach((e, index) =>{
          if (e.id == i){
            correctData.push(e)
          }
        })
      }

      if (correctData.length != i){
        correctData.push({type: i, products: []})
      }
      i++
    }


    console.log(correctData)
    return correctData
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString())
  let formatedDate = selectedDay.slice(-4) + "-" + selectedDay.slice(3, 5) + "-" + selectedDay.slice(0, 2)
  const [meals, setMeals] = useState(fetchMealsByDate(formatedDate));
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  // let formatedDate = 
  // selectedDay.getFullYear() + 
  // "-"+ 
  // String(todayDate.getMonth()+1 < 10 ? "0" + (todayDate.getMonth()+1): (todayDate.getMonth()+1)) +
  // "-"+ 
  // String(todayDate.getDate() < 10 ? "0" + todayDate.getDate(): todayDate.getDate());


  useEffect(() => {
    fetchMealsByDate(formatedDate).then(data => {setMeals(data); setLoading(false);});
    setWidth(window.innerWidth)
  }, [selectedDay]);


  return (
    <div style={{display: "flex", flexDirection:"column"}}>
      <DatesBar width={width + "px"} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {meals.length > 0 && <ProductTable meals={meals} setMeals={setMeals} />}
        </>
      )}
    </div>
  );
}

export default App;
