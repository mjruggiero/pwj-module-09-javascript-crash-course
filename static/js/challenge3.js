// Challenge 3: Rock. Paper, Scissors

const choices = ["rock", "paper", "scissors"];

const rpsDatabase = {
    "rock": { "scissors": 1, "rock": 0.5, "paper": 0 },
    "paper": { "rock": 1, "paper": 0.5, "scissors": 0 },
    "scissors": { "paper": 1, "scissors": 0.5, "rock": 0 },
};

const imagesDatabase = {
    "rock": document.getElementById("rock").src,
    "paper": document.getElementById("paper").src,
    "scissors": document.getElementById("scissors").src,
}

/**
 * Runs the rock, paper, scissors game.
 * @param {string} yourChoice the players choice (rock, paper or scissors) 
 */
function rpsGame(yourChoice) {
    console.log("Your choice: " + yourChoice.id);
    const humanChoice = yourChoice.id;
    const botChoice = randomChoice(choices);
    console.log("Computer choice: " + botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}

/**
 * Picks a random item from the given array.
 * @param {object[]} arr the array of choices 
 * @returns a random item from the given array
 */
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

/**
 * Given the human and bot choices, returns an array containing the human score
 * and bot score.
 * @param {string} humanChoice the human choice (rock, paper, or scissors) 
 * @param {string} botChoice the bot choice (rock, paper, or scissors)
 * @returns an array containing the human score and bot score
 */
function decideWinner(humanChoice, botChoice) {
    const humanScore = rpsDatabase[humanChoice][botChoice];
    const botScore = rpsDatabase[botChoice][humanChoice];

    return [humanScore, botScore];
}

/**
 * Returns the final message and color given the human and bot scores.
 * @param {array} param0 an array containing the human and bot scores
 * @returns an object containing the final message and color 
 */
function finalMessage([humanScore, botScore]) {
    let message, color;
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

/**
 * Updates the HTML page with the results of the game.
 * @param {string} humanChoice the human choice (rock, paper, or scissors) 
 * @param {string} botChoice the bot choice (rock, paper, or scissors)
 * @param {object} message an object containing the message and color 
 */
function rpsFrontEnd(humanChoice, botChoice, message) {
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    const humanDiv = document.createElement("div");
    const botDiv = document.createElement("div");
    const messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img class='blue-box-shadow' src='" + imagesDatabase[humanChoice] + "' alt='' width='150' height='150'>";
    botDiv.innerHTML = "<img class='red-box-shadow' src='" + imagesDatabase[botChoice] + "' alt='' width='150' height='150'>";
    messageDiv.innerHTML = "<h1 style='color: " + message.color + "; font-size: 60px; padding: 30px;'>" + message.message + "</h1>";

    document.getElementById("flex-box-rps-div").append(humanDiv);
    document.getElementById("flex-box-rps-div").append(messageDiv);
    document.getElementById("flex-box-rps-div").append(botDiv);
}