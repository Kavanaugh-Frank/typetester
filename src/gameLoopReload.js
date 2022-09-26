//this files needs to handle restarting the game loop
//making sure to readd the eventlistener that gets removed when someone wins
//restart the counter for checks
    //this can be taken care of from making the counter 0 inside the keypress function
//clear the typedTextDiv
//and make a new sample text

export default function reset(){
    //this is the container that holds the samples text
    let containerForSample = document.querySelector("#sampleTextDiv")
    containerForSample.innerHTML = ""
    //this is the container that holds all the user input from the keyboard
    let containerForInput = document.querySelector("#typedTextDiv")
    containerForInput.innerHTML = ""

    let containerForCurrent = document.querySelector("#currentLetter")
    containerForCurrent.innerHTML = ""

    let button = document.querySelector("#reset")
    button.innerHTML = ""

    let timer = document.querySelector("#timer")
    timer.innerHTML = ""
}