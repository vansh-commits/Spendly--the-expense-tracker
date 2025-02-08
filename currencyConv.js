const rateListDiv = document.querySelector(".rate");
const api_key = `22d591d090004ff783e010827ab4bba9`
const api_url = `https://openexchangerates.org/api/latest.json?app_id=${api_key}`

async function getRateData() {
    try{

        let rateData = await fetch(api_url);
        let rateDataResult = await rateData.json();
    
        return rateDataResult.rates;
    }
    catch(err){
        console.log(err)
    }
}

async function appendRateDataToBar(params) {
    try{
        let rates = await getRateData();
        Object.keys(rates).forEach(key =>{
            let val = Math.round(rates[key] * 100) / 100
            rateListDiv.innerHTML += `<p id="code">${key}</p> <p id="price">${val}</p>`;
            
        })
    }catch(err){
        console.log(err)
    }
    
    
}
appendRateDataToBar();

async function convert(){
    let fromVal = parseFloat(document.getElementById("from").value)
    let fromcurr = document.getElementById("currency-select-from").value
    let tocurr = document.getElementById("currency-select-to").value
    let toElem = document.getElementById("to")
    if(fromVal){

        let rates = await getRateData();
        let fromrate =  Math.round(rates[fromcurr] * 100) / 100
        let torate = Math.round(rates[tocurr] * 100) / 100
        let val = (fromVal/fromrate) * torate;
        let ans = Math.round(val * 100) / 100
        toElem.value = "" + ans;
    }else{
        toElem.value = "Enter some valid value";
    }

}

function swap(){
    let fromcurr = document.getElementById("currency-select-from")
    let tocurr = document.getElementById("currency-select-to")
    const selectedValue1 = fromcurr.value;
    const selectedValue2 = tocurr.value;

    fromcurr.value = selectedValue2;
    tocurr.value = selectedValue1;
    convert();


}





