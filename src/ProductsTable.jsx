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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const mealTypes = [
    "Breakfast",
    "Dinner",
    "Supper"
]
export default function ProductsTable(props) {
  return (
    <>
    {props.meals.map((column) => (
    <TableContainer key={column.type} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} >{mealTypes[column.type-1]}</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Calories</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fat&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Carbs&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Protein&nbsp;(g)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
            {
                column.products.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="right">{row.kcal}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="left"><IconButton style={{border:"1px solid", color:"primary"}}><RemoveIcon/></IconButton></TableCell>
                </TableRow>
                ))
            }
        </TableBody>
      </Table>
      <Button variant="outlined" startIcon={<AddIcon/>} href = {"/addToMeal"}>Add new product</Button>
    </TableContainer>
    ))}
    </>
  );
}