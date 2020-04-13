//import to get the getData() function from dataFunction.js
import getData from "./dataFunc.js"

//the endpoint (data for covid-19)
let endpoint = "https://pomber.github.io/covid19/timeseries.json";

//the promise returned from fetching endpoint
let promise = getData(endpoint);

//datalist in DOM
let datalist = document.querySelector("datalist");

//unordered list in DOM
let countryList = document.querySelector("ul");

//array to hold country names that have been added to the list by user
let countryArray = [];

//array that holds all the total country names from endpoint
let totalNameArray = [];

//function that checks if the country name even exists in the totalNameArray
let countryExists = (countryName) => {
    for (let value of totalNameArray) {
        
        //if value exists in totalNameArray, return true
        if (value == countryName) {
            return true;
        }
    }
    
    //returns false if country does not exist in totalNameArray
    return false;
}


//function to check if a country name already exists in the countryArray
let validCountry = (countryName) => {
    //return false if the inputted name matches with a name in countryArray (name already exists)
    for (let value of countryArray) {
        
        if (value == countryName) {
            return false;
        }
        
        //country name entered in datalist textfield does not exist in datalist, so return false (not valid country)
        if (!countryExists(countryName)) {
            return false;
        }
        
    }
    //return true if none matched
    return true;
    
}

//use the promise's object to add options to datalist
promise.then((data) => {
    
    //list of country names from the keys of the data
    let countryNames = Object.keys(data);
    
    //adding country names to datalist
    for (let country of countryNames) {
        let option = document.createElement("option");
        option.value = country;
        
        //pushes country name into totalNameArray
        totalNameArray.push(country);
        
        //append option to datalist
        datalist.appendChild(option);
    }
   
});

//the "Add country" button in DOM
let button = document.querySelector("#countryButton");

//event listener for the "Add country" button
button.addEventListener("click", (event) => {
    
   //current choice chosen in datalist
   let currentChoice = document.querySelector("#countryChoice");
    
   //console.log(currentChoice.value);
   
   //name of country that is the current choice in datalist 
   let countryName = currentChoice.value;
   
   //if country name not added to list yet, then add to the list
   if (validCountry(countryName)) { 
       
       //creating listItem, span, and delete button for the list item
       let listItem = document.createElement("li");
       let span = document.createElement("span");
       let deleteCountryButton = document.createElement("button");

       
       span.textContent = countryName;
       deleteCountryButton.textContent = "delete";

       //event listener for delete country button. removes the name from countryArray and deletes the listItem from the unordered list
       deleteCountryButton.addEventListener("click", (event) => {
          countryArray = countryArray.filter((name) => name != countryName);
          listItem.remove(); 
          
          //console.log(countryArray);
           
       }); 

       //appends the span and delete button to the list item
       listItem.appendChild(span);
       listItem.appendChild(deleteCountryButton);
        
       //adds listItem to the unordered list in DOM
       countryList.appendChild(listItem);
       
       //adds name to countryArray
       countryArray.push(countryName);
       //console.log(countryArray);
   
   }
   
   //clears the datalist's textbox after a user clicks "Add country" so then they can choose another one without manually erasing textbox
   currentChoice.value = "";
    
});


