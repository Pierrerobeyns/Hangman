const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

const words = ['igloo', 'ordinateur', 'avion', 'bitcoin', 'telephone', 'ecouteur', 'bouteille', 'pull', 'clavier', 'ville', 'voiture',
                'veste', 'chaise', 'gourde', 'ventilateur', 'pompe', 'etagere', 'table', 'roulette'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Montrer mot caché
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Félicitations BG, tu as trouvé 😃';
        popup.style.display= 'flex';
    }
}

// Mauvaises lettres
function updateWrongLetterE1(){
    //Afficher mauvaises lettres
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Mauvaises lettres</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Verifier si c'est perdu
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'Malheureusement, tu as perdu ! 😕';
        popup.style.display = 'flex';
    }
}

//Montrer Notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//Rejouer
playAgainBtn.addEventListener('click', () => {
    
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();