// *** VARIABLES
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
let lettersShown = 0;
const startButton = document.querySelector('.btn__reset');
const winResetButton = document.querySelector('.winreset');
const loseResetButton = document.querySelector('.losereset');
const startScreen = document.querySelector('.start');
const winScreen = document.querySelector('.win');
const loseScreen = document.querySelector('.lose');
const ul = document.getElementById('phrase').firstElementChild;
const phrases = ["On the Road", "Tristessa", "The Subterraneans", "Moby Dick", "Tropic of Cancer", "Tropic of Capricorn", "Mexico City Blues", "The Colossus of Maroussi", "The Dharma Bums"];
let phraseArray = getRandomPhraseAsArray(phrases);


// *** FUNCTIONS
// take a random phrase and break it into a new array
function getRandomPhraseAsArray(arr){
    const randomWord = arr[Math.floor(Math.random() * arr.length)].split("");
    return randomWord;
}

// break the array into list item and add them to the display
function addPhraseToDisplay(arr){
    for(let i = 0; i < arr.length; i += 1){
        const li = document.createElement("li");
        let liContent = arr[i];
        if (liContent === " ") {
            li.classList.add("space");
        } else {
            li.classList.add("letter");
        }
        li.textContent = liContent;
        ul.appendChild(li);
    }
}

// check if chosen letter is contained in the phrase
function checkLetter(letter){
    const letterLi = document.querySelectorAll('.letter');
    let matched = null;
    for(let i = 0; i < letterLi.length; i++){
        if(letter === letterLi[i].textContent.toLowerCase()) {
            letterLi[i].classList.add("show");
            matched = true;
        } 
    }
    if (matched === true) { 
        return letter; 
    } else {
        return matched;
    }
}

// remove spaces as counting for phraselength
function phraseLengthFunction() {
    phraseLength = document.querySelectorAll('.letter').length;
    console.log(phraseLength);
}

// function to check if the game has been won or lost
function checkWin(){
    const letters = document.getElementsByClassName('letter');
    lettersShown = document.querySelectorAll('.show').length;
    phraseLengthFunction();
    if (phraseLength === lettersShown) {
        winScreen.style.removeProperty('display');
    } else if (missed >= 5) {
        loseScreen.style.removeProperty('display');
    }
}

// listener that fires for for every click on one of the keyboard buttons
keyboard.addEventListener('click', (e) => {
    if(event.target.tagName === 'BUTTON'){
    const clickedLetter = e.target.textContent;
    e.target.classList.add('chosen');
    e.target.setAttribute("disabled", true);
    let letterFound = checkLetter(clickedLetter);
    if (letterFound === null) {
        const hearts = document.getElementsByTagName('ol')[0].children;
        hearts[4-missed].children[0].src = "images/lostHeart.png";
        missed += 1;
    }
    checkWin();
}
})

// reset the game when the play again button is clicked
function resetGame() {
    phraseArray = getRandomPhraseAsArray(phrases);
    let clickedLetters = document.getElementsByTagName('button');
    resetKeyboard(clickedLetters);
    resetHearts();
    removePreviousWord();
    lettersShown = 0;
    missed = 0;
    addPhraseToDisplay(phraseArray);
    phraseLength = phraseArray.length;
    phraseLengthFunction();
}

// clear chosen letters from the keyboard
function resetKeyboard(clickedLetters) {
    for(let i = 0; i < clickedLetters.length; i += 1) {
        if(clickedLetters[i].classList.contains('chosen')){
        clickedLetters[i].removeAttribute("class");
        clickedLetters[i].removeAttribute("disabled");
        }
    }
}

// remove the word from the previous game from the display
function removePreviousWord() {
    const getAllLetters = document.getElementsByTagName('ul')[0];
    getAllLetters.innerHTML = '';
}

// reset the hearts back to 5 hearts. 
function resetHearts() {
    const clearHearts = document.getElementsByTagName('ol')[0];
    clearHearts.innerHTML = " ";
    for(let i = 0; i < 5; i += 1) {
        const newHeart = document.createElement("li");
        newHeart.classList.add("tries")
        newHeart.innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
        clearHearts.appendChild(newHeart);
    }
}

// *** EVENT LISTENERS
// listen for clicks on the start button and make the start overlay dissappear
startButton.addEventListener('click', ()=> {
    startScreen.style.display = 'none';
});

// Listener on the reset button at the win screen
winResetButton.addEventListener('click', ()=> {
    winScreen.style.display = 'none';
    resetGame();
})


// Listener for the reset button at the lose screen
loseResetButton.addEventListener('click', ()=> {
    loseScreen.style.display = 'none';
    resetGame();
})

// *** call functions to START GAME
addPhraseToDisplay(phraseArray); 
phraseLengthFunction();
