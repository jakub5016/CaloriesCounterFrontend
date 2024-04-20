function fetchAllProducts(){
    return fetch('https://localhost:7261/api/Product', {method: "GET", headers:{accept: "*/*"}})
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }

export default fetchAllProducts