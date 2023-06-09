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
    //console.log(result)
    const players = result.data.players;
    return players;
    // return result;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

// get single player by id
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const result = await response.json();
    console.log(result.data.player);
    return result.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// adding new player object by using rest API Post
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${playerObj.name}`,
        breed: `${playerObj.breed}`,
      }),
    });
    const result = await response.json();
    console.log("Add new player ", result);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

// remove player with .remove()
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(`Deleted ${playerId} `, result);
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

                      <button class="detailBtn" data-id="${player.id}">Player detail</button>
                      <button class="removeBtn" data-id="${player.playerId}">Remove player</button>

        `;

      playerContainer.appendChild(playerElement);
      const detailBtn = playerElement.querySelector(".detailBtn");

      detailBtn.addEventListener("click", async (e) => {
        console.log("hello");
        const playerId = e.target.dataset.id;
        fetchSinglePlayer(playerId);
      });
      const removeBtn = playerElement.querySelector(".removeBtn");
      removeBtn.addEventListener("click", async (e) => {
        // removePlayer(e.target.id);
        // console.log(`Removed ${e.target}`);
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    const submit = document.createElement("input");
    submit.value = "Add Player";
    submit.addEventListener("click", e);
    const form = `<form id="newPlayerEntry">
    <div class="newPlayerEntry">
    <label for="name">Enter player's name: </label>
    <input type="text" name="name" id="name"> 
    </div>
    <div class="playerBreed">
    <label for="breed">Enter player's breed: </label>
    <input type="text" name="breed" id="breed">
    <div>
    </form>`;
    const newForm = document.getElementById("new-player-form");
    newForm.innerHTML = form;
    const playerForm = document.getElementById("newPlayerEntry");
    playerForm.appendChild(input);
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  let players = await fetchAllPlayers();
  renderAllPlayers(players);
  // fetchSinglePlayer(players[1].id);
  // addNewPlayer(players[1]);

  // renderNewPlayerForm();
};

init();
