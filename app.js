let randomNumber; // = Math.floor(Math.random() * 100) +1 ;
console.log({randomNumber});
let previousInputs = document.querySelector('.previousInputs');
console.log({previousInputs})
let lastResult = document.querySelector('.lastResult');
//let adjustYourGuess = document.querySelector('.adjustYourGuess');
//let adjustYourGuess = document.getElementsByClassName('adjustYourGuess') // this returns an array. to reach use adjustYourGuess[0].textContent
let adjustYourGuess = document.getElementById("up-down");
let userSubmit = document.querySelector('.userSubmit');
//let userSubmit = document.getElementById('btnSubmit'); // this does the same job as above, only difference is to use id instead of class name
let userInput = document.querySelector('.userInput');
let hintText = document.querySelector('.hintText');
let hint = document.querySelector('.hint');
let remainingAttemptsText =document.querySelector('#remainingAttempts');
let remainingAttempts = 5;
let guessCount = 1;
let resetButton;


userSubmit.addEventListener('click', evaluateUserGuess);

setRemainingAttemptsText();

userInput.focus();
generateNumberToGuess();
setHintText();
console.log({randomNumber});

function evaluateUserGuess(){
    let userGuess = Number(userInput.value);
    // console.log({userGuess});

    if(userGuess < 1 || userGuess > 100){
        //alert("Please enter a number between 1 and 100.");
        lastResult.textContent = 'Please enter a number between 1 and 100!!!'
        lastResult.style.backgroundColor = 'red';
        lastResult.style.paddingTop = '5px';
        userInput.value =  ''
        userInput.focus();
    }
    else{
        if(guessCount === 1) {
            //previousInputs.textContent = 'Previous Guesses: ';
            previousInputs.innerHTML = 'Previous Guesses: '; //just to show use of innerHTML. But prefer tectContent which is more fast and secure
            previousInputs.style.backgroundColor = '#4285F4';
            
        }
        previousInputs.textContent += userGuess + ' ';
        if(userGuess === randomNumber){
            
            lastResult.textContent = `Congrats!!  You win...`;
            var partyFace = document.createTextNode("🥳");					
            lastResult.appendChild(partyFace); 
            lastResult.style.backgroundColor = 'green';
            
            adjustYourGuess.textContent = `Your guess was ${userGuess} and picked number was ${randomNumber} too.`;
            // console.log('başarılı');

            setGameOver();
    
        } else if (guessCount === 5) {
            lastResult.textContent = `Game Over. You lost!!!  `
            lastResult.style.backgroundColor = 'tomato';
            adjustYourGuess.textContent = `My number was ${randomNumber} UR Looser..`;
            // console.log('başarısız');
            setGameOver();
        } else {
            lastResult.textContent = 'Your Guess is WRONG!!!'
            lastResult.style.backgroundColor = 'tomato';
    
            if(userGuess < randomNumber){
                adjustYourGuess.textContent = 'Last guess was low. Adjust your guess up';
                var upArrow = document.createTextNode("▲");					
                adjustYourGuess.appendChild(upArrow); 

            } else if(userGuess > randomNumber) {
                adjustYourGuess.textContent = `Last guess was high. Adjust your guess down `
                var downArrow = document.createTextNode("▼");					
                adjustYourGuess.appendChild(downArrow); 
            }
            setHintText();
            adjustYourGuess.style.backgroundColor = 'blueviolet';
        }
        console.log({guessCount})
        guessCount ++;
        remainingAttempts--;
        setRemainingAttemptsText();
        getCleanFocus();
    }


    
}

function generateNumberToGuess(){
    randomNumber = Math.floor(Math.random() * 100) +1 ;
}
function setGameOver(){
    inputsDisabled();
    setHintText();
    resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again!';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame(){
    guessCount = 1;
    remainingAttempts = 5;
    
    cleanInfoPanel();

    resetButton.parentNode.removeChild(resetButton);
    inputsEnbled();
    getCleanFocus()
    generateNumberToGuess();
    setHintText();
    setRemainingAttemptsText();
    console.log({randomNumber})
}

function inputsDisabled(){
    userInput.disabled = true;
    userSubmit.disabled = true;
}

function inputsEnbled(){
    userInput.disabled = false;
    userSubmit.disabled = false;
}

function getCleanFocus() {
    userInput.value = ''
    userInput.focus();
}

function cleanInfoPanel(){
    previousInputs.textContent = 'Previous Guesses: ';
    lastResult.textContent = '';
    adjustYourGuess.textContent = '';
}

function setRemainingAttemptsText(){
    if(remainingAttempts === 0){
        remainingAttemptsText.style.backgroundColor= 'red';
    }
    remainingAttemptsText.textContent = remainingAttempts.toString();
    
    
}

function setHintText(){
    if(remainingAttempts < 3){
        hintText.textContent = randomNumber.toString();
        hint.style.backgroundColor= 'green';
        return;
    }
    hint.style.backgroundColor= 'goldenrod';
    hintText.textContent = 'No hints at this stage.'
}




