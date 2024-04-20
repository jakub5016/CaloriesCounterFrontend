import { Button, InputBase, Paper } from "@mui/material"
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";

function handleRegister(weight, height, age, gender){
  if ((weight < 30) || (weight > 250)){
    return new Error("Bad weight")
  }
  if ((height < 100) || (height > 250)){
    return new Error("Bad height")
  }

  if ((age < 0) || (age > 150)){
    return new Error("Bad age")
  }

  if (gender == null){
    return new Error("Gender not provided")
  }

  fetch("https://localhost:7261/api/User", {
    method: "POST",
    headers: {"accept" : "text/plain", "Content-Type": "application/json"},
    body:JSON.stringify({
      "weight" : weight,
      "gender" : gender,
      "height" : height,
      "age" : age 
    })
  })

  return true

}

function Register(){
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState(null)
  return(<Paper sx={{padding:"30px"}}>
      <h1>
        Zarejestruj się
      </h1>

      <form style={{display: "flex", flexDirection: "column"} }>
        <label style={{display: "flex", flexDirection: "column"} }>
          <h2>Waga w kg: </h2>
          <InputBase type="number" sx={{border:"1px solid"}} onChange={(e)=>{setWeight(e.target.value)}}/>
        </label>

        <label style={{display: "flex", flexDirection: "column"} }>
          <h2>Wzrost w cm</h2>
          <InputBase type="number" sx={{border:"1px solid"}} onChange={(e)=>{setHeight(e.target.value)}}/>
        </label>

        <label style={{display: "flex", flexDirection: "column"} }>
          <h2>Wiek</h2>
          <InputBase type="number" sx={{border:"1px solid"}} onChange={(e)=>{setAge(e.target.value)}}/>
        </label>


        <label style={{display: "flex", flexDirection: "column", marginBottom:"30px"} }>
          <h2>Płeć </h2>
          <div style={{alignItems:"center"}}>
              <a>Kobieta</a><Checkbox disabled={gender != null && gender} onChange={()=>{gender == null ? setGender(false) : setGender(null)}}/>
              <a>Mężczyzna</a><Checkbox disabled={gender != null && !gender}  onChange={()=>{gender == null ? setGender(true) : setGender(null)}}/>
          </div>

        </label>
      
      <Button variant="outlined" onClick={()=>{handleRegister(weight, height, age, gender); window.location.reload()}}>Zarejestruj</Button>
      </form>
    </Paper>)
}

export default Register