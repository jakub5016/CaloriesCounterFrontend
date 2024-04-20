import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from '../ProductsTable';
import DatesBar from '../datesBar/DatesBar';
import ProgressBar from '../progressBar/ProgressBar';
import { LinearProgress, Paper } from '@mui/material';
import Register from '../register/Register.jsx'

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
          if (e.type == i){
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

  const [meals, setMeals] = useState(fetchMealsByDate(formatedDate));
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [dayMacro, setDayMacro] = useState({})
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() =>{
    if (user == null){
      fetch("https://localhost:7261/api/User", {method:"GET", headers:{"accept": "text/plain"}})
      .then(resp =>{
        if (resp.status != 204){
          setUser(resp.json())
        }
        else{
          setUser(null)
        }
      })
    }
  }, [])

  useEffect(()=>{
    if (user != null){user.then((data)=>{setUserData(data)})}
  },[user])

  useEffect(() => {
    fetchMealsByDate(formatedDate).then(data => {setMeals(data);    console.log(data)      ;setLoading(false);});
    setWidth(window.innerWidth)
  }, [selectedDay]);

  useEffect(()=>{
    let correctDayMacro = {kcal: 0, protein:0, fat:0, carbs:0}
    let i =0 
    while (i < 3){
      if (meals[i] != undefined){
        if (meals[i].kcalForMeal != undefined){
          correctDayMacro.kcal += meals[i].kcalForMeal
          correctDayMacro.protein += meals[i].proteinForMeal
          correctDayMacro.fat += meals[i].fatForMeal
          correctDayMacro.carbs += meals[i].carbsForMeal
        }
      }
      i++;
    }

    setDayMacro(correctDayMacro)
  }, [meals])

  return (
    user != null ? (<div style={{display: "flex", flexDirection:"column"}}>
      <DatesBar width={width + "px"} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          {meals.length > 0 && <ProductTable meals={meals} setMeals={setMeals} selectedDay={formatedDate}/>}
          <Paper sx={{paddingBottom: "8px"}}>
            <ProgressBar userData={userData} dayMacro={dayMacro} variant="determinate" value={30}/>
          </Paper>
        </>
      )}
    </div>) : <Register/>
  );
}

export default App;
