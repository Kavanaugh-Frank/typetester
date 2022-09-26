/*

    File : keyPress.js

*/
//last thing to do
//make it look better

import sampleText from "./sampleTextRandom";
import reset from "./gameLoopReload";

//basic global varibles that all the functions can call

//this is the container that holds the samples text
let containerForSample = document.createElement("div");

//this is the container that holds all the user input from the keyboard
let containerForInput = document.createElement("div");

//this is the container for showing the next letter the user must input
let containerForCurrent = document.createElement("div");

let containerForTimer = document.createElement("div");
containerForTimer.id = "timer";

//this is the counter for the sample text check against the inputted keys
let counterForChecks;
//this is run in the index.js
export default function keyPress() {
  // this is set inside this function becuase it automatically resets to 0 without having to call it
  //in the game reset function
  counterForChecks = 0;

  //the sample sentence
  //ill reference it twice so it needs to be the same for both
  let sample = sampleText();

  containerForSample.id = "sampleTextDiv";
  containerForSample.innerHTML = sample;
  document.body.prepend(containerForSample);

  containerForCurrent.id = "currentLetter";
  containerForCurrent.innerHTML = `"${sample[0]}"`;
  document.body.append(containerForCurrent);

  containerForInput.id = "typedTextDiv";
  document.body.append(containerForInput);

  document.body.addEventListener("keydown", keyboard);
}
//this is its own function so that I can remove the event listener easily
function keyboard(e) {
  //allows only characters in this list to be added to the typedTextDiv
  let charlist = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.'"?!:;[]{}`;
  //checks the input for different options
  //backspace deletes the last span tag in the container
  //createSpan() makes a new span tag with color dependent on if it is correct or not
  //the last check has its explanation inside it
  if (e.key == "Backspace") {
    backSpace();
    containerForCurrent.innerHTML = `"${
      containerForSample.innerHTML[counterForChecks + 1]
    }"`;
  } else if (charlist.indexOf(e.key) != -1) {
    //if there is no char in the div for the input then a variable is created at that time
    if (containerForInput.innerHTML == "") {
      //the window prefix is used to make it a global variable so that another
      //another if statement can use it
      window.startTime = Date.now();
    }

    //checks if the input is the same as the sample in the same index position
    if (containerForSample.innerHTML[counterForChecks] == e.key) {
      //since the counterForChecks is there for the current we add one to have the next one showx
      containerForCurrent.innerHTML = `"${
        containerForSample.innerHTML[counterForChecks + 1]
      }"`;
      createSpan(e.key, "correct");
    } else {
      createSpan(e.key, "incorrect");
    }
    if (checkForWin() == true) {
      //reset()
      let containerForButton = document.createElement("div");
      containerForButton.id = "button";
      let button = document.createElement("button");
      button.innerHTML = "New Sentence!";
      button.id = "reset";
      containerForButton.append(button);
      document.body.prepend(containerForButton);
      button.addEventListener("click", function () {
        reset();
        keyPress();
        button.remove();
      });

      let endTime = Date.now();
      timer(startTime, endTime);
      return;
    }
  } else if (charlist.indexOf(e.key) == -1) {
    //if the char is not in the list provided this will take a counter away
    //since they keypress will still add to the counter this contradicts it
    counterForChecks--;
  }
  counterForChecks++;
}

function createSpan(key, name) {
  //if there is no underline dont remove
  //if there is remove it and create the new letter span
  //then the underline is added back to the end of the container
  if (document.querySelector("#underline")) {
    containerForInput.removeChild(document.querySelector("#underline"));
  }

  //creates the span tag that will hold the input key from the user
  let spanTag = document.createElement("span");
  spanTag.innerHTML = key;
  spanTag.classList.add("span");
  spanTag.classList.add(name);
  containerForInput.append(spanTag);

  //created the new underline at the back of the container
  let underline = document.createElement("span");
  underline.id = "underline";
  underline.innerHTML = "_";
  containerForInput.append(underline);
}
function backSpace() {
  //removes the last span tag in the typedTextDiv
  //takes the amount of elements in the span class as a length
  let length = document.querySelectorAll(".span").length;
  //calls the last nth-child in the typedTextDiv
  let removed = document.querySelector(`#typedTextDiv :nth-child(${length})`);
  containerForInput.removeChild(removed); //containerForInput.lastChild
  //removes 2 since the backspace keystroke counts as a +1 for the counter
  counterForChecks = counterForChecks - 2;
}

function checkForWin() {
  //simply put this function checks to see if the number of span tags with the lightgreen
  //class matches with the length of the sample text since the light green class
  //indicates if the char in the span is right or wrong
  let sampleText = document.querySelector("#sampleTextDiv").innerHTML;
  let typedTextChildrenCorrect = document.querySelectorAll(`.correct`);
  //i added a space to each sentence so that when the last letter is the thing needed the current letter div wont cause errors
  //that is why the length of typedChildrenCorrect is +1
  if (typedTextChildrenCorrect.length + 1 == sampleText.length) {
    document.body.removeEventListener("keydown", keyboard);
    //this removes the underline
    //i didnt want to create variables just for that
    document
      .querySelector("#typedTextDiv")
      .removeChild(document.querySelector("#typedTextDiv").lastChild);
    return true;
  }
}

function timer(start, end) {
  console.log(end - start);
  //ms to seconds
  let time = (end - start) / 1000 + "s";
  document.body.append(containerForTimer);
  containerForTimer.innerHTML = time;
}
