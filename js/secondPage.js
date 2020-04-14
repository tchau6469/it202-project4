//import to get the getData() function from dataFunction.js
import getData from "./dataFunc.js"

//the endpoint (data for covid-19)
let endpoint = "https://pomber.github.io/covid19/timeseries.json";

//the promise returned from fetching endpoint
let promise = getData(endpoint);

let button1 = document.querySelector("#createDatatableButton");

//console.log(promise);

button1.addEventListener("click", (event) => {
    let selectedCountriesArr = document.querySelectorAll(".countrySpan");
    
    //console.log(selectedCountriesArr);
    
    let headers = document.querySelector(".mdc-data-table__header-row");
    let tbody = document.querySelector(".mdc-data-table__content");
    
    
    //adding the date column header
    let th = document.createElement("th");
    th.classList.add("mdc-data-table__header-cell");
    th.textContent = "Date";
    headers.appendChild(th);
    
    //adds datatable headers as country names selected
    for (let name of selectedCountriesArr) {
        let th = document.createElement("th");
        th.classList.add("mdc-data-table__header-cell");
        th.textContent = name.textContent;
        headers.appendChild(th);
    }
    
    promise.then((data) => {
        //getting the length of the array value of the first property in object
        let numberOfDates = data[Object.keys(data)[0]].length;
        //console.log(numberOfDates);
        
        
        //for each index (date index), create a row and add date to the row. then, for each country in the selected list, find the number of confirmed cases
        for (let i = 0; i < numberOfDates; i++) {
            //creating tr element with class row
            let tr = document.createElement("tr");
            tr.classList.add("mdc-data-table__row");
            
            //creating row cell element for date, which there is only 1 per index
            let dateNode = document.createElement("td");
            dateNode.classList.add("mdc-data-table__cell");
            
            //setting the textcontent of the date element with the corresponding date index
            dateNode.textContent = data[Object.keys(data)[0]][i].date;
            
            //append the row cell to the main row
            tr.appendChild(dateNode);
            
            //append row to the datatable
            tbody.appendChild(tr);
            
            //for each country in the selected countries array, create a row cell with value = confirmed cases of that country name
            for (let country of selectedCountriesArr) {
                
                //creating row cell element for the confirmed cases value of the current country
                let td = document.createElement("td");
                td.classList.add("mdc-data-table__cell");
                
                //numCases of number of confirmed cases in current country index
                let numCases = data[country.textContent][i].confirmed;
                td.textContent = numCases;
                
                //appending the row cell element to the main row
                tr.appendChild(td);
                
            }
         
        }
        
    });//end promise.then()
    
});//end of the eventlistener for button