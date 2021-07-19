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
let guessCount = 1;
let resetButton;


userSubmit.addEventListener('click', evaluateUserGuess);

userInput.focus();
generateNumberToGuess();
console.log({randomNumber});

function evaluateUserGuess(){
    let userGuess = Number(userInput.value);
   
    console.log({userGuess});

    if(userGuess < 1 || userGuess > 100){
        //alert("Please enter a number between 1 and 100.");
        lastResult.textContent = 'Please enter a number between 1 and 100!!!'
        lastResult.style.backgroundColor = 'tomato';
        userInput.value =  ''
        userInput.focus();
    }
    else{
        if(guessCount === 1) {
            //previousInputs.textContent = 'Previous Guesses: ';
            previousInputs.innerHTML = 'Previous Guesses: '; //just to show use of innerHTML. But prefer tectContent which is more fast and secure
        }
        previousInputs.textContent += userGuess + ' ';
        if(userGuess === randomNumber){
            lastResult.textContent = `Congrats!! Your guess was ${userGuess} and picked number was ${randomNumber} too. You win...`;
            lastResult.style.backgroundColor = 'green';
            adjustYourGuess.textContent = '';
            console.log('başarılı');
            setGameOver();
    
        } else if (guessCount === 5) {
            lastResult.textContent = 'Game Over'
            lastResult.style.backgroundColor = 'tomato';
            adjustYourGuess.textContent = '';
            console.log('başarısız');
            setGameOver();
        } else {
            lastResult.textContent = 'Your Guess is WRONG!!!'
            lastResult.style.backgroundColor = 'yellow';
    
            if(userGuess < randomNumber){
                adjustYourGuess.textContent = 'Last guess was low. Adjust your guess up';
            } else if(userGuess > randomNumber) {
                adjustYourGuess.textContent = 'Last guess was high. Adjust your guess down';
            }
        }
        console.log({guessCount})
        guessCount ++;
        userInput.value =  ''
        userInput.focus();
    }


    
}

function generateNumberToGuess(){
    randomNumber = Math.floor(Math.random() * 100) +1 ;
}
function setGameOver(){
    inputsDisabled();
    resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again!';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame(){
    guessCount = 1;
    // let resetInfoPanel = document.querySelectorAll('.resultsPanel');
    // console.log({resetInfoPanel})
    // for (let i = 0; i < resetInfoPanel.length; i++) {
    //     resetInfoPanel[i].textContent = '';
    // }
    cleanInfoPanel();

    resetButton.parentNode.removeChild(resetButton);
    inputsEnbled();
    getCleanFocus()
    //randomNumber = Math.floor(Math.random() * 100) +1 ;
    generateNumberToGuess();
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




