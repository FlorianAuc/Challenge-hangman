const wordsEl = document.getElementById("word");
const badLetters = document.getElementById("bad-letters");
const replayBtn = document.getElementById("replay-btn");
const popup = document.getElementById("popup-content");
const notification = document.getElementById("notif-content");
const messageFinal = document.getElementById("message-final");
const input_button = document.getElementById("keyboard");
const Bonhomme = document.querySelectorAll(".figure-part");
const compteur = document.getElementById('life')

const words = [
  "rythme",
  "immersion",
  "rondelle",
  "visite",
  "cabine",
  "lettre",
  "horloge",
  "cannibale",
  "bibliotheque",
  "censure",
  "diplomate",
  "tailleur",
  "frisson",
  "inclinaison",
  "personne",
  "document",
  "application",
  "programmation",
  "interface",
  "javascript",
  "iceberg",
  "verdict",
  "extracteur",
  "ballon",
  "casque",
  "centre",
  "prairie",
  "peur",
  "boulloire",
  "photographie",
  "reste",
  "europe",
  "belgique",
  "france",
  "allemagne",
  "suisse",
  "espagne",
  "turquie",
  "loin",
];

//mot random de mon tableau
let selectWord = words[Math.floor(Math.random() * words.length)];

const goodLettersArr = [""];
const badLettersArr = [];

//le mot cacher

function showWord() {
  wordsEl.innerHTML = `
    ${selectWord
      .split("")
      .map(
        (letter) => `
            <span class = 'letters'>
            ${goodLettersArr.includes(letter) ? letter : ""}
            </span>
            `
      )
      .join("")}
    
    `;
  //enlever les espaces (ecrire sur la meme ligne popup)
  const internWord = wordsEl.innerText.replace(/\n/g, "");

  //popup
  if (internWord === selectWord) {
    messageFinal.innerText = "Congratulations, you saved stick man !";
    popup.style.display = "flex";
  }
}

//Ajout fonction si c'est une mauvaise lettres
function updateBadLetterEl() {
  //affiche des mauvaises lettres
  badLetters.innerHTML = `
        ${badLettersArr.map((letter) => `<span>${letter}</span>`)}
    `;
  
    //affiche bonhomme
  Bonhomme.forEach((part, index) => {
    const error = badLettersArr.length;

    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //affiche le popup de defaite

  if (badLettersArr.length === Bonhomme.length) {
    messageFinal.innerText = "Oh no, you didn't manage to save the stick man !";
    popup.style.display = "flex";
  }
}

//Ajout de la fonction pour la notification
function showNotification() {
  notification.classList.add("affiche");

  setTimeout(() => {
    notification.classList.remove("affiche");
  }, 1500);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectWord.includes(letter)) {
      
        //bonnes lettres
      if (!goodLettersArr.includes(letter)) {
        goodLettersArr.push(letter);

        showWord();
      }

      //si la lettre a déjà été rentrer
      else {
        showNotification();
      }
    } else {
      
        //fausses lettres
      if (!badLettersArr.includes(letter)) {
        badLettersArr.push(letter);

        updateBadLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

//clavier 'click'
input_button.innerHTML = ''
for(i = 65; i <= 90; i++){
  let letter = String.fromCharCode(i)
  input_button.innerHTML += `<button id="${letter}" class="input_keyboard">${letter}</button>`
}


//bouton replay
replayBtn.addEventListener("click", () => {
  goodLettersArr.splice(0);
  badLettersArr.splice(0);

  selectWord = words[Math.floor(Math.random() * words.length)];

  showWord();

  updateBadLetterEl();

  popup.style.display = "none";
});

showWord();