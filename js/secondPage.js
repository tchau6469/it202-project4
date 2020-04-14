
let button1 = document.querySelector("#createDatatableButton");

button1.addEventListener("click", (event) => {
    let selectedCountriesArr = document.querySelectorAll(".countrySpan");
    
    console.log(selectedCountriesArr);
    
    for (let val of selectedCountriesArr) {
        console.log(val.textContent);
    }
});