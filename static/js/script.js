// Challenge 1: Your Age in Days

function getAgeInDays() {
    var birthYear = prompt("What year were you born... Good Friend?");
    var ageInDays = (new Date().getFullYear() - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
    var image = document.createElement('img');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    document.getElementById("flex-cat-gen").append(image);
}

// Challenge 3: Rock. Paper, Scissors

var choices = ["rock", "paper", "scissors"];

var rpsDatabase = {
    "rock": { "scissors": 1, "rock": 0.5, "paper": 0 },
    "paper": { "rock": 1, "paper": 0.5, "scissors": 0 },
    "scissors": { "paper": 1, "scissors": 0.5, "rock": 0 },
};

var imagesDatabase = {
    "rock": document.getElementById("rock").src,
    "paper": document.getElementById("paper").src,
    "scissors": document.getElementById("scissors").src,
}

function rpsGame(yourChoice) {
    console.log("Your choice: " + yourChoice.id);
    var humanChoice = yourChoice.id;
    var botChoice = randomChoice(choices);
    console.log("Computer choice: " + botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function decideWinner(humanChoice, botChoice) {
    var humanScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [humanScore, botScore];
}

function finalMessage([humanScore, botScore]) {
    var message, color;
    if (humanScore == 1) {
        message = "You Won!";
        color = "green";
    } else if (botScore == 1) {
        message = "You Lost!";
        color = "red";
    } else {
        message = "It's a tie!";
        color = "yellow";
    }
    return { message, color };
}

function rpsFrontEnd(humanChoice, botChoice, message) {
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img class='blue-box-shadow' src='" + imagesDatabase[humanChoice] + "' alt='' width='150' height='150'>";
    botDiv.innerHTML = "<img class='red-box-shadow' src='" + imagesDatabase[botChoice] + "' alt='' width='150' height='150'>";
    messageDiv.innerHTML = "<h1 style='color: " + message.color + "; font-size: 60px; padding: 30px;'>" + message.message + "</h1>";

    document.getElementById("flex-box-rps-div").append(humanDiv);
    document.getElementById("flex-box-rps-div").append(messageDiv);
    document.getElementById("flex-box-rps-div").append(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var allButtons = document.getElementsByTagName('button');

var buttonClasses = [];

for (let i = 0; i < allButtons.length; ++i) {
    buttonClasses.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonSelect) {
    var selectedValue = buttonSelect.value;
    console.log(selectedValue);

    switch (selectedValue) {
        case "random":
            buttonsRandom();
            break;
        case "red":
            buttonsRed();
            break;
        case "green":
            buttonsGreen();
            break;
        case "reset":
            buttonsReset();
            break;
    }
}

function buttonsRandom() {
    let buttonClasses = ["btn-danger", "btn-primary", "btn-success", "btn-warning"];
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(buttonClasses[Math.floor(Math.random() * buttonClasses.length)]);
    }
}

function buttonsRed() {
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}

function buttonsGreen() {
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}

function buttonsReset() {
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(buttonClasses[i]);
    }
}

// Challenge 5: Blackjack

let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardValues': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = getRandomCard();
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU);
    }
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; ++i) {
            yourImages[i].remove();
        }

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < dealerImages.length; ++i) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';

        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = false;
    }
}

function getRandomCard() {
    let cards = blackjackGame['cards'];
    let index = Math.floor(Math.random() * cards.length);
    return cards[index];
}

function updateScore(activePlayer, card) {
    // If adding 11 keeps me below 21, add 11. Otherwise, add 1.
    let cardValue = blackjackGame['cardValues'][card];
    if (card === 'A') {
        if (activePlayer['score'] + cardValue[1] <= 21) {
            activePlayer['score'] += cardValue[1];
        } else {
            activePlayer['score'] += cardValue[0];
        }
    } else {
        activePlayer['score'] += cardValue;
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = getRandomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResults(winner);
}

// compute winner and return who just won
// update the wins, draws, and losses
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you're under 21
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] == DEALER['score']) {
            blackjackGame['draws']++;
        }

        // condition: when user busts but dealer doesn't 
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

        // condition: you AND the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    console.log('Winner is', winner);
    return winner;
}

function showResults(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

        if (winner == YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You won!";
            messageColor = "green";
            winSound.play();
        } else if (winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You lost!";
            messageColor = "red";
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "You drew!";
            messageColor = "black";
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}