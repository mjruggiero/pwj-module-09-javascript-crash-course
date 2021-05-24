// Challenge 6: AJAX APIs - Random User Generator

/**
 * Calls the random user API and requests 10 random users.
 */
function generateRandomUsers() {

    fetch('https://randomuser.me/api/?results=10')
        .then(response => response.json())
        .then(data => {
            showData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

/**
 * Function that receives the list of users and displays them on the page.
 * @param {object} data the JSON object with the users
 */
const showData = (data) => {

    const divResult = document.querySelector("#flex-box-random-user-div");

    // Remove all child nodes
    divResult.innerHTML = "";

    data.results.forEach(user => {
        const html = `<div>
            <img src=${user.picture.large}>
            <p>${user.name.first} ${user.name.last}</p>
            </div>`;

        divResult.insertAdjacentHTML('beforeend', html);

    });
}