function fetchDataFromApi(query){
    console.log("https://localhost:7261/api/NutritionAPI/nutrition?query=" + query)
    return fetch("https://localhost:7261/api/NutritionAPI/nutrition?query=" + query)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((value) => {return(value)})
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

export default fetchDataFromApi