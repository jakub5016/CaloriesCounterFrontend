import { Box, Button, CircularProgress, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox';
import fetchDataFromApi from "./fetchDataFromApi";
import { useEffect, useState } from "react";


function ApiAdd(){
    const [queryForApi, setQueryForApi] = useState('');
    const [loadingApi, setLoadingApi] = useState(false);
    const [dataFromApi, setDataFromApi] = useState(null)
    const [featchedItemsAPI, setFetchedItemsAPI] = useState([])



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

    return(<Paper sx={{marginLeft:"30px", padding:"7px"}}>
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
        {!loadingApi && featchedItemsAPI.length != 0 && (
          <div style={{display:"flex",flexDirection:"column"}}>
          <a>Uzyskane wyniki :</a>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Calories</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fat&nbsp;(g)</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Carbs&nbsp;(g)</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Protein&nbsp;(g)</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', borderBottom: "none"}}></TableCell>

              </TableRow>
            </TableHead>
          {featchedItemsAPI.map((e)=>{
            return(
              <TableRow key={e.name}>
                <TableCell align="right" sx={{fontWeight:"bold"}}>{e.name}</TableCell>
                <TableCell align="right">{e.calories}</TableCell>
                <TableCell align="right">{e.fat}</TableCell>
                <TableCell align="right">{e.carbs}</TableCell>
                <TableCell align="right">{e.protein}</TableCell>
                <TableCell align="right"><Checkbox/></TableCell>
              </TableRow>
            )
          })}
          </Table>
          <Button  variant="outlined" sx={{marginTop:"30px"}}>Dodaj zaznaczone produkty</Button>
          </div>
          )
        }
      </Box>
    </div>
  </Paper>)
}

export default ApiAdd