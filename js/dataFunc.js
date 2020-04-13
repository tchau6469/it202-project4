let getData = async (endpoint) => {
    let theData = await fetch (endpoint)
    .then((response) => {return response.json()})
    return theData;
}

export default getData;


