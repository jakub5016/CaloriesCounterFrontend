import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function fetchAllProducts(){
  return fetch('https://localhost:7261/api/ProductControler')
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

function appendMealList(id, data, amountArray){
  if (id == "undefined"){
    console.log(amountArray)
    let ids = amountArray.map((ammout, index)=>{
      if (ammout != 0){
        return data[index].id
      }
    })

    let ammounts = amountArray.map((ammout)=>{
      if (ammout != 0){
        return ammout
      }
    })
    
    console.log(JSON.stringify({
      type: 1,
      date: "2024-04-15",
      productIds : ids,
      ammoutOfProduct :ammout
    }))


    return fetch('https://localhost:7261/api/Meals/',{
      method: "POST",
      body: JSON.stringify({
        type: 1,
        date: "2024-04-15",
        productIds : ids,
        ammoutOfProduct :ammout
      }),
      headers: {
        'accept': 'text/plain', 'Content-Type': 'application/json'
      }
    })
  }
  else{
    console.log(id)
    amountArray.map((ammout, index)=>{
      return fetch('https://localhost:7261/api/Meals/' + id + '/AppendProduct/' + data[index].id + "/" + ammout, {method: "PATCH"})
    })
  }

}

function handleSearch(text, setData, setAmountArray){
  if ((text != null) && (text != "")){
    fetch('https://localhost:7261/api/ProductControler/search?search='+text, {method:"POST"})
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setAmountArray(new Array(data.length).fill(0));
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }
  else{
    fetchAllProducts()
      .then(data => {
        setData(data);
        setAmountArray(new Array(data.length).fill(0));
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }
}

function AddToMeal() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [amountArray, setAmountArray] = useState([]);
  useEffect(() => {
    fetchAllProducts()
      .then(data => {
        setData(data);
        setAmountArray(new Array(data.length).fill(0));
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleFillAmountArray = (index, value) => {
    setAmountArray(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = value;
      return newArray;
    });
  };

  return (
    <Paper style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>Add To Meal</h1>
      <p>Meal ID: {id}</p>
      <div style={{display:"flex", justifyContent:"center"}}>
        <SearchIcon />
        <InputBase sx= {{marginLeft: "3px"}} placeholder="Wyszukaj" onChange={e => handleSearch(e.target.value, setData, setAmountArray)}/>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Calories</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Fat&nbsp;(g)</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Carbs&nbsp;(g)</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Protein&nbsp;(g)</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold', borderBottom: "none"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((product, index) => (
              <TableRow key={product.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{product.name}</TableCell>
                <TableCell align="left">{product.kcal}</TableCell>
                <TableCell align="left">{product.fat}</TableCell>
                <TableCell align="left">{product.carbs}</TableCell>
                <TableCell align="left" >{product.protein}</TableCell>
                <TableCell>
                  <input 
                    type="number" 
                    value={amountArray[index]} 
                    onChange={e => handleFillAmountArray(index, parseInt(e.target.value))}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={() => appendMealList(id, data, amountArray)}>Submit</Button>
    </Paper>
  );
}

export default AddToMeal;
