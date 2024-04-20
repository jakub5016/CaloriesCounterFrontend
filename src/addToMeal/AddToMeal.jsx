import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import fetchAllProducts from "./fetchAllProducts";
import handleSearch from "./handleSearch";
import ApiAdd from "./apiAdd/ApiAdd";

function appendMealList(id, data, amountArray, date=null, type=null){
  let ids = []
  amountArray.map((ammout, index)=>{
    if (ammout != 0){
      ids.push(data[index].id)
    }
  })
  
  let ammounts = []
  amountArray.map((ammout)=>{
    if (ammout != 0){
      ammounts.push(ammout)
    }
  })

  console.log(JSON.stringify({
    type: type,
    date: date,
    productIds : ids,
    ammoutOfProduct :ammounts
  }))

  if ((id == "undefined") && ((date != null) && (type !=null))){
    console.log(JSON.stringify({
      type: type,
      date: date,
      productIds : ids,
      ammoutOfProduct :ammounts
    }))
    return fetch('https://localhost:7261/api/Meals',{
      method: "POST",
      body: JSON.stringify({
        type: type,
        date: date,
        productIds : ids,
        amountOfProduct :ammounts
      }),
      headers: {
        'accept': 'text/plain', 'Content-Type': 'application/json'
      }
    })
  }
  else{
    amountArray.map((ammout, index)=>{
      if ((ammout != null) && (ammout != 0)){
        return fetch('https://localhost:7261/api/Meals/' + id + '/AppendProduct/' + data[index].id + "/" + ammout, {method: "PATCH"})

      }
    })
  }

}

function AddToMeal() {
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [amountArray, setAmountArray] = useState([]);
  const [openApi, setOpenApi] = useState(false)
  const navigate = useNavigate()
  
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
    <div style={{display:"flex", flexDirection:"row"}}>
    <Paper style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>Add To Meal</h1>
      {/* <p>Meal ID: {id}</p> */}
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

      <Button onClick={() => {appendMealList(id, data, amountArray, state.date, state.type);  navigate("/"); window.location.reload();}}>Submit</Button>
    </Paper>
    
    {openApi && <ApiAdd setOpenApi={setOpenApi}/>}
    {!openApi && <Button sx={{fontSize:"40px", border:"1px solid"}} onClick={()=>setOpenApi(!openApi)}>.<br/>.<br/>.<br/></Button>}

    </div>
  );
}

export default AddToMeal;
