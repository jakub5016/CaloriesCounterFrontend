import { useParams } from "react-router-dom";

function addToMeal(){
    const {id} = useParams()
    return (
        <div>
          <h1>Add To Meal</h1>
          <p>Meal ID: {id}</p>
        </div>
      );
}

export default addToMeal