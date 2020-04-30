const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const startButton = document.querySelector('.btn__reset');
const winresetButton = document.querySelector('.winreset');
const loseresetButton = document.querySelector('.losereset');
const startScreen = document.querySelector('.start');
const winScreen = document.querySelector('.win');
const loseScreen = document.querySelector('.lose');
const phrases = ["java", "comp", "javascript"];
const ul = document.getElementById('phrase').firstElementChild;
const phraseArray = getRandomPhraseAsArray(phrases);

startButton.addEventListener('click', ()=> {
    startScreen.style.display = 'none';
});

function getRandomPhraseAsArray(arr){
    const randomWord = arr[Math.floor(Math.random() * arr.length)].split("");
    return randomWord;
}

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

addPhraseToDisplay(phraseArray); 

function checkLetter(letter){
    const letterLi = document.querySelectorAll('.letter');
    let matched = null;
    for(let i = 0; i < letterLi.length; i++){
        if(letter === letterLi[i].textContent) {
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

function phraseLengthFunction() {
    phraseLength = phraseArray.length;
    for(i = 0; i < phraseArray.length; i += 1) {
        if (phraseArray[i] === ' ') {
            phraseLength -= 1;
            }
    }
}


function checkWin(){
    const letters = document.getElementsByClassName('letter');
    let lettersShown = 0;
    for (let i = 0; i < letters.length; i += 1){
        if (letters[i].classList.contains("show")) {
            lettersShown += 1;
        }
    }
    phraseLengthFunction();
    
    if (phraseLength === lettersShown) {
        winScreen.style.removeProperty('display');
    } else if (missed >= 5) {
        loseScreen.style.removeProperty('display');
    }
}

keyboard.addEventListener('click', (e) => {
    if(event.target.tagName === 'BUTTON'){
    const clickedLetter = e.target.textContent;
    e.target.classList.add('chosen');
    e.target.setAttribute("disabled", true);
    let letterFound = checkLetter(clickedLetter);
    if (letterFound === null) {
        const hearts = document.getElementsByTagName('ol')[0];
        hearts.removeChild(hearts.firstElementChild);
        missed += 1;
    }
    checkWin();
}
})

winresetButton.addEventListener('click', ()=> {
    winScreen.style.display = 'none';
    const newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
    let clickedLetters = document.getElementsByTagName('button');
    console.log(clickedLetters);
    for(let i = 0; i < clickedLetters.length; i += 1) {
        if(clickedLetters[i].classList.contains('chosen')){
        clickedLetters[i].removeAttribute("class");
        clickedLetters[i].removeAttribute("disabled");
        }
    }

    missed = 0;
})

loseresetButton.addEventListener('click', ()=> {
    
})