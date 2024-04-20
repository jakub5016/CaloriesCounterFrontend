function handleSearch(text, setData, setAmountArray){
    if ((text != null) && (text != "")){
      fetch('https://localhost:7261/api/Product/search?search='+text, {method:"POST"})
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setAmountArray(new Array(data.length).fill(0));
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    }
    else{
      fetchAllProducts()
        .then(data => {
          setData(data);
          setAmountArray(new Array(data.length).fill(0));
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    }
}

export default handleSearch