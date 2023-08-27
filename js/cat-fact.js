const fact = document.getElementById("catfact");

const  generateNewFact = async () =>  
{
    // START COLOUR GENERATION ////////////////////////////////////////
    var randColour = getRandomBgColor();
    // synching all the colors to the same random hex value
    $("#catfact").css("color", randColour);
    $("#factButton").css("background-color", randColour);
    $("#date").css("color", randColour);
    $("#timerSection").css("color", randColour);
    $("#timerSection").css("background-color", randColour);

    var borderTopCSS = "solid 3px " + randColour; 
    $(".playerButton").css("border-top", borderTopCSS);
 
    // END COLOUR GENERATION ////////////////////////////////////////////

    
    // api for fun facts!
    // free cat api referenced from: https://alexwohlbruck.github.io/cat-facts/docs/
    var url ="https://cat-fact.herokuapp.com/facts";

    // fetch the data from api 
    const response = await fetch(url);

    // convert the response to JSON format 
    // since the api call returns a promise we need to await keyword to handle it 
    const allFacts = await response.json(); 

    // randomly choose the index at which the fact is located at
    const indexOfFact = Math.floor( Math.random() * allFacts.length);
    // retrieve the fact
    const catfact = allFacts[indexOfFact].text;

    const catFactText = document.getElementById("catfact");

    catFactText.innerHTML = catfact;

}

// taken from https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomBgColor() {
    let color = "#";
    // this will give all options to curate a hex value since 
    // the numbers are from [0-9] inclusive
    // and [A-F] inclusive
    let hexValue = '0123456789ABCDEF';

    // Math.floor(Math.random() * 16) is generating a random index between 
    // 0 and 15 that corresponds to the indices of the 'hexValue' array
    for(var i = 0; i < 6; i++) {
        color += hexValue[Math.floor(Math.random() * 16)];
    }
    return color;
}

generateNewFact();

// ///////////////////////////////////////////////////////////////////////////////////


