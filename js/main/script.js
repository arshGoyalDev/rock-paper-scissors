// --------------------------- rules -------------------------- //
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn');
const rulesContainer = document.querySelector('.rules-container');

rulesBtn.addEventListener('click', () => {
  rulesContainer.classList.remove('display-none');
  document.body.classList.add('scroll-stop');
})

closeBtn.addEventListener('click', () => {
  rulesContainer.classList.add('display-none');
  document.body.classList.remove('scroll-stop');
})


// -------------------------- making the game work -------------------------- //
const userChoicesContainer = document.querySelector('.user-choices-container');
const userChoicesBtn = userChoicesContainer.childNodes;
const playingContainer = document.querySelector('.playing-container');
const userSelection = document.querySelector('.user-selection-div');
const computerSelection = document.querySelector('.house-selection-div');
const playAgainBtn = document.querySelectorAll('.play-again');
const resultSection = document.querySelectorAll('.result');

let score = 0;
let computerChoice;
const results = {
  'rock' : {
    'rock' : 'draw',
    'paper' : 'lose',
    'scissors' : 'win'
  },
  'paper' : {
    'rock' : 'win',
    'paper' : 'draw',
    'scissors': 'lose',
  },
  'scissors' : {
    'rock' : 'lose',
    'paper' : 'win',
    'scissors' : 'draw'
  }
};


// ------------- getting user's input (choice) -------------- //
for (let i = 3; i < userChoicesBtn.length; i += 2) {
  userChoicesBtn[i].addEventListener('click', () => {
    userChoicesContainer.classList.add('display-none');
    playingContainer.classList.remove('display-none');

    userSelection.classList.add(userChoicesBtn[i].className);
    result(userChoicesBtn[i].className);
  })
}

// ---------------- play again button ---------------- //
playAgainBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    resultSection.forEach(result => {
      result.classList.add('display-none');
    })

    playingContainer.classList.add('display-none');
    userChoicesContainer.classList.remove('display-none');
    userSelection.classList.remove('rock', 'paper', 'scissors');
    computerSelection.classList.remove('rock', 'paper', 'scissors');
    computerSelection.style.cssText = '';

    let x = document.querySelector('.user-box').childNodes;
    for (let i = 1; i < x.length ; i += 2) {
      x[i].style.opacity = "0";
    }
    let y = document.querySelector('.house-box').childNodes;
    for (let i = 1; i < y.length ; i += 2) {
      y[i].style.opacity = "0";
    }
  })
})


// ------------------------ result function -------------------- //
function result(input) {
  compChoices = ['rock', 'paper', 'scissors'];
  randomNum = Math.floor(Math.random() * 3);
  let computerChoice = compChoices[randomNum];

  setTimeout(() => {
    computerSelection.classList.add(computerChoice);
    computerSelection.style.cssText = 'animation: wining-effect 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;';

    setTimeout(() => {
      resultSection[0].classList.remove('display-none');
      resultSection[1].classList.remove('display-none');
      let resultText = document.querySelectorAll('.result-text');

      switch (results[input][computerChoice]) {
        case 'win' :
          resultText[0].innerText = 'You win';
          resultText[1].innerText = 'You win';
          score ++;

          let x = document.querySelector('.user-box').childNodes;
          for (let i = 1; i < x.length ; i += 2) {
            x[i].style.opacity = "1";
          }
          break;

        case 'lose' :
          resultText[0].innerText = 'You lose';
          resultText[1].innerText = 'You lose';
          score --;

          let y = document.querySelector('.house-box').childNodes;
          for (let i = 1; i < y.length ; i += 2) {
            y[i].style.opacity = "1";
          }        
          break;

        case 'draw' :
          resultText[0].innerText = 'Draw';
          resultText[1].innerText = 'Draw';
          break;
      }

      if (score < 0) {
        score = 0;
      }  
      document.querySelector('.score-text').innerHTML = score;
    }, 550);
  }, 1000);
}