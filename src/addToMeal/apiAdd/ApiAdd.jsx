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


function handleCheck(index, value, fetchedItemsChecked, setFetchedItemsChecked){
    let arr = []

    arr = fetchedItemsChecked.map((e, e_index)=>{
        if (e_index != index){
            return e
        }
        else{
            return value
        }
    })

    console.log(arr)
    setFetchedItemsChecked(arr)
}

function addApiProducts(fetchedItemsChecked, fetchedItemsAPI) {
    fetchedItemsChecked.forEach((check, index) => {
        if (check === true) {
            fetch("https://localhost:7261/api/ProductControler", {
                method: "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": fetchedItemsAPI[index].name,
                    "kcal": parseInt(fetchedItemsAPI[index].calories),
                    "fat": parseInt(fetchedItemsAPI[index].fat),
                    "carbs": parseInt(fetchedItemsAPI[index].carbs),
                    "protein": parseInt(fetchedItemsAPI[index].protein)
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
                // Handle successful response
                console.log("Product added successfully");
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    });

    window.location.reload()
}



function ApiAdd(props){
    const [queryForApi, setQueryForApi] = useState('');
    const [loadingApi, setLoadingApi] = useState(false);
    const [dataFromApi, setDataFromApi] = useState(null)
    const [featchedItemsAPI, setFetchedItemsAPI] = useState([])
    const [fetchedItemsChecked, setFetchedItemsChecked]= useState([])


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
            
            var checkedArr = value.items.map(e => (false));
            setFetchedItemsChecked(checkedArr)
            setFetchedItemsAPI(arr);
            setLoadingApi(false); 
          }).catch(error => {
            console.error('Error fetching data from API:', error);
            setLoadingApi(false); 
          });
        } else {
          setFetchedItemsAPI([]);
          setLoadingApi(false);
        }
      }, [dataFromApi])

    return(<Paper sx={{marginLeft:"30px", padding:"7px", textAlign:"right"}}>
    <IconButton onClick={()=>{props.setOpenApi(false)}}>X</IconButton><br/>
    <div style={{textAlign:"center"}}>
    <a>Nie widzisz produktu który chcesz dodać na liście?</a> <br/>
    <a>Dodaj go przy pomocy sztucznej inteligencji!</a>
    </div>
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
          <a style={{textAlign:"center"}}>Uzyskane wyniki :</a>
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
          {featchedItemsAPI.map((e, index)=>{
            return(
              <TableRow key={e.name}>
                <TableCell align="right" sx={{fontWeight:"bold"}}>{e.name}</TableCell>
                <TableCell align="right">{e.calories}</TableCell>
                <TableCell align="right">{e.fat}</TableCell>
                <TableCell align="right">{e.carbs}</TableCell>
                <TableCell align="right">{e.protein}</TableCell>
                <TableCell align="right"><Checkbox onChange={(e)=>{
                    handleCheck(index, e.target.checked, fetchedItemsChecked, setFetchedItemsChecked)
                }}/></TableCell>
              </TableRow>
            )
          })}
          </Table>
          <Button  variant="outlined" sx={{marginTop:"30px"}} onClick={()=>{addApiProducts(fetchedItemsChecked, featchedItemsAPI)}}>Dodaj zaznaczone produkty</Button>
          </div>
          )
        }
      </Box>
    </div>
  </Paper>)
}

export default ApiAdd