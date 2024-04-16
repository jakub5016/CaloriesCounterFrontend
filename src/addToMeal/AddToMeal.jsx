import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import fetchAllProducts from "./fetchAllProducts";
import handleSearch from "./handleSearch";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import fetchDataFromApi from "./fetchDataFromApi";

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
    return fetch('https://localhost:7261/api/Meals',{
      method: "POST",
      body: JSON.stringify({
        type: type,
        date: date,
        productIds : ids,
        ammoutOfProduct :ammounts
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
  const [loadingApi, setLoadingApi] = useState(false);
  const [queryForApi, setQueryForApi] = useState('');
  const [dataFromApi, setDataFromApi] = useState(null)
  const [featchedItemsAPI, setFetchedItemsAPI] = useState([])
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

  useEffect(()=>{
    if (dataFromApi != null){
      setLoadingApi(true);
      dataFromApi.then((value) => {
        var arr = value.items.map(e => ({
          name: e.name, 
          calories: e.calories, 
          fat: e.fat_total_g, 
          protein: e.protein_g, 
          carbs: e.carbohydrates_total_g
        }));
        setFetchedItemsAPI(arr);
        setLoadingApi(false); 
        console.log("fetched");
      }).catch(error => {
        console.error('Error fetching data from API:', error);
        setLoadingApi(false); 
      });
    } else {
      setFetchedItemsAPI([]);
      setLoadingApi(false);
    }
  }, [dataFromApi])
  

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
    <Paper sx={{marginLeft:"30px", padding:"7px"}}>
      <a>Nie widzisz produktu który chcesz dodać na liście?</a> <br/>
      <a>Dodaj go przy pomocy sztucznej inteligencji!</a>
      <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
        <Box sx={{alignItems: "center"}}>
          <InputBase sx= {{marginTop: "20px", border:"1px solid gray", padding:"3px"}} placeholder="Nazwa produktu" onChange={e => setQueryForApi(e.target.value)}/>
          <IconButton onClick={()=>{setLoadingApi(true); setDataFromApi(fetchDataFromApi(queryForApi))}}>
            <SearchIcon/>
          </IconButton>
        </Box>
        <Box sx={{marginTop: "20px"}} >
          {loadingApi && <CircularProgress/>}
          {!loadingApi && featchedItemsAPI.length == 0 && <a>Brak wyników</a>}
          {!loadingApi && featchedItemsAPI.length != 0 &&
            featchedItemsAPI.map((e)=>{
              return(<a key={e.name} sx={{ fontWeight: 'bold', color:"green"}}> Total:</a>)
            })
          }
        </Box>
      </div>
    </Paper>
    </div>
  );
}

export default AddToMeal;
