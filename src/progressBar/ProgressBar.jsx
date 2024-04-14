import { Grid, LinearProgress } from '@mui/material';


function ProgressBar(){

    return(
        <Grid container spacing={2}>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Calories</a>
                <LinearProgress variant='determinate' value={30}/>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Protein</a>
                <LinearProgress variant='determinate' value={30}/>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Fat</a>
                <LinearProgress variant='determinate' value={30}/>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Carbs</a>
                <LinearProgress variant='determinate' value={30}/>
            </Grid>
        </Grid>
    )
}

export default ProgressBar