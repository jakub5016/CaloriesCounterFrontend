import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from '../ProductsTable';
import DatesBar from '../datesBar/DatesBar';
import ProgressBar from '../progressBar/ProgressBar';
import { LinearProgress, Paper } from '@mui/material';

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

    return correctData
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString())
  let formatedDate = selectedDay.slice(-4) + "-" + selectedDay.slice(-7, -5) + "-" + selectedDay.slice(0, 2)
  if (formatedDate[-1] == '.'){
    formatedDate = selectedDay.slice(-4) + "-" + selectedDay.slice(2, 4) + "-" + selectedDay[0]
  }

  console.log(formatedDate)
  const [meals, setMeals] = useState(fetchMealsByDate(formatedDate));
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    fetchMealsByDate(formatedDate).then(data => {setMeals(data); setLoading(false);});
    setWidth(window.innerWidth)
  }, [selectedDay]);


  return (
    <div style={{display: "flex", flexDirection:"column"}}>
      <DatesBar width={width + "px"} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          {meals.length > 0 && <ProductTable meals={meals} setMeals={setMeals} />}
          <Paper sx={{paddingBottom: "8px"}}>
            <ProgressBar variant="determinate" value={30}/>
          </Paper>
        </>
      )}
    </div>
  );
}

export default App;
