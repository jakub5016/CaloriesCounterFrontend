import { Grid, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: 'blue', // Set your desired color for the progress bar
      },
      '& .MuiLinearProgress-bar2ColorPrimary': {
        backgroundColor: 'red', // Set your desired color for the overflow
      },
    },
  }));
  

function ProgressBar(props){
    const classes = useStyles();
    
    let kcalForDay = props.userData.kcalMaintaince
    let proteinForDay = 70
    let fatForDay = 40
    let carbsForDay = 200

    return(
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Calories</a>
                <LinearProgress variant='determinate' value={(props.dayMacro.kcal/kcalForDay) * 100}/>
                <a>{props.dayMacro.kcal} / {kcalForDay}</a>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Protein</a>
                <LinearProgress variant='determinate' value={(props.dayMacro.protein/proteinForDay) * 100}/>
                <a>{props.dayMacro.protein} / {proteinForDay}</a>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Fat</a>
                <LinearProgress variant='determinate' value={(props.dayMacro.fat/fatForDay) * 100}/>
                <a>{props.dayMacro.fat} / {fatForDay}</a>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:"column"}}>
                <a>Carbs</a>
                <LinearProgress variant='determinate' value={(props.dayMacro.carbs/carbsForDay) * 100}/>
                <a>{props.dayMacro.carbs} / {carbsForDay}</a>

            </Grid>
        </Grid>
    )
}

export default ProgressBar