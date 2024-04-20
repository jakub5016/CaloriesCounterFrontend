import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

const mealTypes = [
    "Breakfast",
    "Dinner",
    "Supper"
]

function handleDelete(mealId, productId){
  fetch('https://localhost:7261/api/Meals/' + (mealId) + '/Products/' + (productId), {method: "DELETE"})
  window.location.reload()
}

export default function ProductsTable(props) {
  const navigate = useNavigate()
  return (
    <>
    {props.meals.map((column) => (
    <TableContainer key={column.type} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} >{mealTypes[column.type-1]}</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ammount</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Calories</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fat&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Carbs&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Protein&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', borderBottom: "none"}}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
            {
                column.products.map((row, index) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#c5fbfc" } }>
                    <TableCell component="th" scope="row" sx={{}}>
                    {row.name}
                    </TableCell>
                    {console.log(column.amountOfProduct[index], index)}
                    <TableCell align="right">{column.amountOfProduct[index]}</TableCell>
                    <TableCell align="right">{Math.ceil(row.kcal/100*column.amountOfProduct[index])}</TableCell>
                    <TableCell align="right">{Math.ceil(row.fat/100*column.amountOfProduct[index])}</TableCell>
                    <TableCell align="right">{Math.ceil(row.carbs/100*column.amountOfProduct[index])}</TableCell>
                    <TableCell align="right">{Math.ceil(row.protein/100*column.amountOfProduct[index])}</TableCell>
                    <IconButton 
                      style={{border:"1px solid", color:"primary", marginRight: "0px", backgroundColor:"white"}}
                      onClick={()=>{handleDelete(column.id,row.id)}}
                      ><RemoveIcon/></IconButton>
                </TableRow>
                ))
            }

                <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color:"green"}}> Total:</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}> </TableCell>
                <TableCell align="right"  sx={{ fontWeight: 'bold', color:"green" }} >{column.kcalForMeal != null ? Math.ceil(column.kcalForMeal): 0}</TableCell>
                <TableCell align="right"  sx={{ fontWeight: 'bold', color:"green" }} >{column.fatForMeal != null ? Math.ceil(column.fatForMeal): 0}</TableCell>
                <TableCell align="right"  sx={{ fontWeight: 'bold', color:"green" }} >{column.carbsForMeal != null ? Math.ceil(column.carbsForMeal): 0}</TableCell>
                <TableCell align="right"  sx={{ fontWeight: 'bold', color:"green" }} >{column.proteinForMeal != null ? Math.ceil(column.proteinForMeal): 0}</TableCell>
                </TableRow>
        </TableBody>
      </Table>
      <Button variant="outlined" startIcon={<AddIcon/>} onClick={()=>{
        navigate("/addToMeal/" + column.id,
        {
          state: {
            date: props.selectedDay,
            type: column.type
          }
        }
      )
      }}>Add new product</Button>
    </TableContainer>
    ))}
    </>
  );
}