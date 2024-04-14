import { Button, ButtonGroup, Paper, Box } from "@mui/material"
import createDatesArray from "./CreateDates"
import { useEffect, useState } from "react"



function fromSelectedDateToDate(selected){
    let parts = selected.split(".")
    return(new Date(parts[2], parts[1] -1, parts[0]))
}

function fromDateToSelectedDate(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    // Ensure day and month are formatted with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return(day + '.' + month + '.' + year)
}


function DatesBar(props){
    const[dates, setDates] = useState(createDatesArray(new Date()))
    let datesSliced = dates.map((date)=>{
       return date.toLocaleDateString().slice(0,5)
    })
    useEffect(()=>{
    }, [props.selectedDay])
    const weekday = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"];

    let screenWidth = (props.width).toString() + "px"
    let fontNormalSize = 14 + "px"
    let buttonWidth = "64px"
    if (props.width <= 700){
        buttonWidth =  (props.width/11).toString() + "px"
        fontNormalSize = Math.abs(fontNormalSize - (700- props.width)/50) + "px"
    }
    return(
        <Paper sx={{
            width: screenWidth, 
            display: "flex",
            justifyContent: "center",
            marginBottom: "1px"
            }}>
            <Button sx={{
                width: buttonWidth,
                minWidth: "0px",
                color: "#2B2D89",
                fontSize: fontNormalSize,
            }} onClick={() =>{
                let currentDateFromParts = fromSelectedDateToDate(props.selectedDay)
                
                currentDateFromParts.setDate(currentDateFromParts.getDate() - 7);
                
                props.setSelectedDay(fromDateToSelectedDate(currentDateFromParts));

                setDates(createDatesArray(currentDateFromParts))
            }}> {"<"}</Button>


                {datesSliced.map((date, index) => (
                    (index < 4 && parseInt(screenWidth.slice(0, -2)) < 450) ?(
                    <div key={date} style={{display: "flex", flexDirection: "column"}}>
                        <Button onClick={()=>{
                            props.setSelectedDay(createDatesArray(fromSelectedDateToDate(props.selectedDay))[index].toLocaleDateString())

                        }} 
                        sx={{
                            width: (parseInt(buttonWidth.slice(0, -2)) +40).toString() + "px",
                            minWidth: "55px",
                            backgroundColor: props.selectedDay.slice(0,5) == date ? "#EFF5FF" :"white",
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "column",
                            color: "black",
                            fontSize: fontNormalSize
                        }}>{weekday[index]} <br/> 
                            <p style={{
                                color:"var(--purple)",
                                margin: "auto",
                                fontSize: fontNormalSize
                                }}>{date}</p>
                        </Button>

                        <div style={{
                                backgroundColor: props.selectedDay.slice(0,5) == date ? "purple" :"white",
                                height: "3px",
                                width: "auto"
                        }}/> 
                    </div>
                    ) : (parseInt(screenWidth.slice(0, -2)) > 450) && (<div key={date} style={{display: "flex", flexDirection: "column"}}>
                    <Button onClick={()=>{
                        props.setSelectedDay(createDatesArray(fromSelectedDateToDate(props.selectedDay))[index].toLocaleDateString())

                    }} 
                    sx={{
                        width: buttonWidth,
                        minWidth: "55px",
                        backgroundColor: props.selectedDay.slice(0,5) == date ? "#EFF5FF" :"white",
                        textTransform: "none",
                        display: "flex",
                        flexDirection: "column",
                        color: "black",
                        fontSize: fontNormalSize
                    }}>{weekday[index]} <br/> 
                        <p style={{
                            color:"var(--purple)",
                            margin: "auto",
                            fontSize: fontNormalSize
                            }}>{date}</p>
                    </Button>

                    <div style={{
                            backgroundColor: props.selectedDay.slice(0,5) == date ? "blue" :"white",
                            height: "3px",
                            width: "auto"
                    }}/> 
                </div>)
                ))}


            <Button sx={{
                width: buttonWidth,
                minWidth: "0px",
                color: "#2B2D89",
                fontSize: fontNormalSize,
            }} onClick={() => {
                let currentDateFromParts = fromSelectedDateToDate(props.selectedDay)
                
                currentDateFromParts.setDate(currentDateFromParts.getDate() + 7);
                
                props.setSelectedDay(fromDateToSelectedDate(currentDateFromParts));

                setDates(createDatesArray(currentDateFromParts))
            }
            }> {">"}</Button>

        </Paper>
    )
}

export default DatesBar