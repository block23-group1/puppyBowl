const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-D";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const result = await response.json();
    const players = result.data.players;
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

// get single player by id
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const result = await response.json();
    const player = result.data.player;
    console.log(result.data.player);
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// adding new player object by using REST API Post

const addNewPlayer = async () => {
  const playerNameInput = document.getElementById("name");
  const playerBreedInput = document.getElementById("breed");
  const playerAgeInput = document.getElementById("age");
  const playerPositionInput = document.getElementById("position");

  // Perform validation and add player logic here

  const newPlayer = {
    name: playerNameInput.value,
    breed: playerBreedInput.value,
    age: playerAgeInput.value,
    position: playerPositionInput.value,
  };

  await addNewPlayer(newPlayer);
  playerNameInput.value = "";
  playerBreedInput.value = "";
  playerAgeInput.value = "";
  playerPositionInput.value = "";

  const players = await fetchAllPlayers();
  renderAllPlayers(players);
};

// remove player with .remove()
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
    });

    const player = await response.json();

    fetchAllPlayers();

    // reload
    window.location.reload();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
    playerContainer.innerHTML = ""; // Clear previous content

    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("result");

      // adding html elements, and buttons
      playerElement.innerHTML = `
        <h2>${player.name}</h2>
        <p>${player.breed}</p>
        <p>${player.status}</p>
        <img src="${player.imageURL}" alt="">
        <p>${player.cohortId}</p>
        <button class="detail-button" data-id="${player.id}">Player detail</button>
        <button class="remove-button" data-id="${player.id}">Remove player</button>
      `;

      playerContainer.appendChild(playerElement);

      // single player detail
      const detailButton = playerElement.querySelector(".detail-button");
      const removeButton = playerElement.querySelector(".remove-button");

      detailButton.addEventListener("click", async (e) => {
        const playerId = e.target.dataset.id;
        const player = await fetchSinglePlayer(playerId);
        expandPlayerDetails(player, playerElement);
        disableButton(detailButton);
      });

      removeButton.addEventListener("click", async (e) => {
        const playerId = e.target.dataset.id;
        removePlayer(playerId);
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * Expands the player details and displays them in the player card.
 * @param player - The player object containing the details.
 * @param playerElement - The DOM element of the player card.
 */
const expandPlayerDetails = (player, playerElement) => {
  const detailsElement = document.createElement("div");
  detailsElement.classList.add("player-details");

  detailsElement.innerHTML = `
    <p><strong>ID:</strong> ${player.id}</p>
    <p><strong>Name:</strong> ${player.name}</p>
    <p><strong>Breed:</strong> ${player.breed}</p>
    <p><strong>Status:</strong> ${player.status}</p>
    <img src="${player.imageURL}" alt="">
    <button class="done-button">Done</button>
  `;

  playerElement.appendChild(detailsElement);

  const doneButton = detailsElement.querySelector(".done-button");
  doneButton.addEventListener("click", () => {
    detailsElement.remove();
    enableButton(playerElement.querySelector(".detail-button"));
  });
};

/**
 * Disables a button element.
 * @param button - The button element to disable.
 */
const disableButton = (button) => {
  button.disabled = true;
};

/**
 * Enables a button element.
 * @param button - The button element to enable.
 */
const enableButton = (button) => {
  button.disabled = false;
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    const form = document.createElement("form");
    form.id = "newPlayerEntry";

    const nameDiv = document.createElement("div");
    nameDiv.className = "newPlayerEntry";
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Enter player's name: ";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.id = "name";
    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameInput);

    const breedDiv = document.createElement("div");
    breedDiv.className = "playerBreed";
    const breedLabel = document.createElement("label");
    breedLabel.textContent = "Enter player's breed: ";
    const breedInput = document.createElement("input");
    breedInput.type = "text";
    breedInput.name = "breed";
    breedInput.id = "breed";
    breedDiv.appendChild(breedLabel);
    breedDiv.appendChild(breedInput);

    const ageDiv = document.createElement("div");
    ageDiv.className = "playerAge";
    const ageLabel = document.createElement("label");
    ageLabel.textContent = "Enter player's age: ";
    const ageInput = document.createElement("input");
    ageInput.type = "text";
    ageInput.name = "age";
    ageInput.id = "age";
    ageDiv.appendChild(ageLabel);
    ageDiv.appendChild(ageInput);

    const positionDiv = document.createElement("div");
    positionDiv.className = "playerPosition";
    const positionLabel = document.createElement("label");
    positionLabel.textContent = "Enter player's position: ";
    const positionInput = document.createElement("input");
    positionInput.type = "text";
    positionInput.name = "position";
    positionInput.id = "position";
    positionDiv.appendChild(positionLabel);
    positionDiv.appendChild(positionInput);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Player";
    addButton.type = "submit"; // Set the button type to "submit"
    addButton.addEventListener("click", addNewPlayer); // Attach event listener to the button

    form.appendChild(nameDiv);
    form.appendChild(breedDiv);
    form.appendChild(ageDiv);
    form.appendChild(positionDiv);
    form.appendChild(addButton);

    const newForm = document.getElementById("new-player-form");
    newForm.innerHTML = ""; // Clear any existing content
    newForm.appendChild(form);
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

// Initialize the application
const initializeApp = async () => {
  try {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    renderNewPlayerForm();
  } catch (err) {
    console.error("Oops, trouble initializing the app!", err);
  }
};

// Call the initializeApp function to start the application
initializeApp();