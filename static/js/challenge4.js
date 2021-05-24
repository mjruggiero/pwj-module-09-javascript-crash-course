// Challenge 4: Change the Color of All Buttons

const allButtons = document.getElementsByTagName('button');

const buttonClasses = [];

// saves all specific button classes
for (let i = 0; i < allButtons.length; ++i) {
    buttonClasses.push(allButtons[i].classList[1]);
}

/**
 * Changes all button colors on the page depending on the given user selection.
 * @param {string} buttonSelect the selected option in the drop-down menu
 */
function buttonColorChange(buttonSelect) {
    const selectedValue = buttonSelect.value;
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

/**
 * Sets all buttons to a random color.
 */
function buttonsRandom() {
    const buttonClasses = ["btn-danger", "btn-primary", "btn-success", "btn-warning"];
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(buttonClasses[Math.floor(Math.random() * buttonClasses.length)]);
    }
}

/**
 * Sets all buttons red.
 */
function buttonsRed() {
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}

/**
 * Sets all buttons green.
 */
function buttonsGreen() {
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}

/**
 * Resets all buttons to their original colors.
 */
function buttonsReset() {
    for (let i = 0; i < allButtons.length; ++i) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(buttonClasses[i]);
    }
}