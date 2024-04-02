import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from '../ProductsTable';

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
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

function App() {
  let todayDate = new Date()
  let formatedDate = 
    todayDate.getFullYear() + 
    "-"+ 
    String(todayDate.getMonth()+1 < 10 ? "0" + (todayDate.getMonth()+1): (todayDate.getMonth()+1)) +
    "-"+ 
    String(todayDate.getDate() < 10 ? "0" + todayDate.getDate(): todayDate.getDate());

  const [meals, setMeals] = useState(fetchMealsByDate(formatedDate));
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState('')
  useEffect(() => {
    setToday(formatedDate)

    fetchMealsByDate(today).then(data => {setMeals(data); setLoading(false);});
  }, [today]);

  console.log(meals)

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Current meals: {meals.length > 0 ? JSON.stringify(meals[0]) : "No meals available"}</p>
          {meals.length > 0 && <ProductTable meals={meals} setMeals={setMeals} />}
        </>
      )}
    </>
  );
}

export default App;
