import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';



function fetchMealData(id) {
  console.log('https://localhost:7261/api/meals/' + id)
  return fetch('https://localhost:7261/api/meals/' + id, {
    method: 'GET'
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

function fetchAllProducts(){
  return fetch('https://localhost:7261/api/ProductControler', {
    method: 'GET'
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

function AddToMeal() {
    const { id } = useParams()

    const [data, setData] = useState(null)

    useEffect(()=>{
      fetchAllProducts().then(data=>{
        setData(data)
      }).catch(error =>{
        console.error('Error fetching product data:', error);
      })
    },[])

    // useEffect(() => {
    //   fetchMealData(id)
    //     .then(data => {
    //       setData(data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching meal data:', error);
    //     });
    // }, [id]);

    console.log(data)
    return (
        <div>
          <h1>Add To Meal</h1>
          <p>Meal ID: {id}</p>
          <TableContainer  component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Calories</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Fat&nbsp;(g)</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Carbs&nbsp;(g)</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Protein&nbsp;(g)</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Ammount</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold', borderBottom: "none"}}></TableCell>
                </TableRow>
              </TableHead>
          <TableBody>
          {data && data.map((product)=>{
            return(
            // <div key={product.id}>{product.name}</div>
            <TableRow key={product.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
              {product.name}
              </TableCell>
              <TableCell align="left">{product.kcal}</TableCell>
              <TableCell align="left">{product.fat}</TableCell>
              <TableCell align="left">{product.carbs}</TableCell>
              <TableCell align="left" sx={{borderRight: "1px solid"}}>{product.protein}</TableCell>
              {/* <IconButton style={{border:"1px solid", color:"primary", marginRight: "0px"}}>AAAA</IconButton> */}
            </TableRow>
          )
          })}
          </TableBody>
          </Table>
          </TableContainer>

        </div>
    );
}

export default AddToMeal;
