// Challenge 1: Your Age in Days

/**
 * Prompts the user for the year they were born, calculates the number of days
 * in their age and inserts it into the flex-box-result element. 
 */
function getAgeInDays() {
    const birthYear = prompt("What year were you born, good friend?");
    const ageInDays = (new Date().getFullYear() - birthYear) * 365;
    const h1 = document.createElement('h1');
    const textAnswer = document.createTextNode('You are ' + ageInDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}
