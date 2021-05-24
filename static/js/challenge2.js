// Challenge 2: Cat Generator

/**
 * Calls the cat api to get a random cat image and appends it to the 
 * flex-cat-gen element.
 */
function generateCat() {
    const image = document.createElement('img');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    document.getElementById("flex-cat-gen").append(image);
}