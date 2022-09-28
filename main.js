const word = document.querySelector('.word')
const wrongLettersEl = document.querySelector('.wrong-letters')
const replayBtn = document.querySelector('.play-btn')
const toast = document.querySelector('.toast-notif')
const letterToast = document.querySelector('.letter-notif')
const gameOverPopup = document.querySelector('.game-over-popup')
const finalVerdict = document.querySelector('.final-verdict')
const pressLetterDisplay = document.querySelector('.letter-display')
const man = document.querySelectorAll('.man')

const wordsArr = ["javascript", "rust", "vue", "programming", "fan", "popcorn", "escape", "lmao", "rocket", "basketball"]

let currentWord = wordsArr[Math.floor(Math.random() * wordsArr.length)]

const guessedCorrectLetters = [];
const guessedWrongLetters = [];

const displayWord = () => {
    word.innerHTML = `
        ${currentWord
            .split('')
            .map(letter => `
                <span class='letter'>${guessedCorrectLetters.includes(letter) ? letter : ''}</span>`
                )
            .join('')}
    `;

    const innerWord = word.innerText.replace(/\n/g, '')

    if (innerWord === currentWord) {
        finalVerdict.innerText = `Congrats! You Won 🎊`;
        gameOverPopup.style.display = 'flex'
        disableNotif()
    } 
}

const addWrongLetter = () => {
    wrongLettersEl.innerHTML =`
    ${guessedWrongLetters.length > 0 ? '<p>Wrong Guesses</p>' : ''} <span>
    ${guessedWrongLetters.map(letter => letter).join('</br>')}</span>
    `
    man.forEach((part,idx) => {
        const wrongGuesses = guessedWrongLetters.length;

        if (idx < wrongGuesses) {
            part.style.display = `block`
        } else {
            part.style.display = `none`
        }
    })

    if(guessedWrongLetters.length === man.length) {
        finalVerdict.innerText =  `You Lose, Try Again? 😕`
        gameOverPopup.style.display = 'flex'
        disableNotif()
    }
}

const toastNotif = () => {
    toast.classList.add('visible')

    setTimeout(() => {
        toast.classList.remove('visible')
    }, 1500)
}

const letterNotif = () => {
    letterToast.classList.add('visible')

    setTimeout(() => {
        letterToast.classList.remove('visible')
    }, 1000)
}

window.actionToast = toastNotif
window.actionToast2 = letterNotif

const disableNotif = () => {
if (gameOverPopup.style.display == 'flex') {
    window.actionToast = null;
    window.actionToast2 = null;
} else if (gameOverPopup.style.display == 'none') {
    window.actionToast = toastNotif;
    window.actionToast2 = letterNotif;
} 

}



window.addEventListener('keyup', event => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const letterPressed = event.key
        pressLetterDisplay.innerText = letterPressed
        
        if (currentWord.includes(letterPressed)) {
            if (!guessedCorrectLetters.includes(letterPressed)) {
               
                guessedCorrectLetters.push(letterPressed)
                actionToast2()
                displayWord() 
            } else {
    
                actionToast()
            }
        } else {
            if (!guessedWrongLetters.includes(letterPressed)) {
                guessedWrongLetters.push(letterPressed)
                actionToast2()
                addWrongLetter()
            } else {
                actionToast()
            }
        }
    }
});

replayBtn.addEventListener('click', () => {
    guessedCorrectLetters.splice(0)
    guessedWrongLetters.splice(0)

    currentWord = wordsArr[Math.floor(Math.random() * wordsArr.length)]

    displayWord()

    addWrongLetter()
    

    gameOverPopup.style.display = 'none'
    disableNotif()
})


displayWord()