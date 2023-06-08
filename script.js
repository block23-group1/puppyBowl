const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-D';
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
    const response = await fetch(`${APIURL}/${playerId}`);
    const result = await response.json();
    const player =  result.data.player;
    console.log(result.data.player);
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// adding new player object by using rest API Post
// think this mean creating a form, so we suppose to fill in the playerobject that is in the api 
// if so need to create another function that create a form from "newPlayerFormContainer"

// const createNewPlayerForm = () => {
//   // create a formHTML variable
//   let formHTML = ``// inside should be player objects 

//   // 
// }

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}/${playerObj}`, {
          method: "POST",
        })

        const player = await response.json();
        console.log(player);
        fetchAllPlayers()

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

// remove player with .remove()
const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}/${playerId}`, {
        method: "DELETE",
      })

      const player = await response.json();
      console.log(player);
      fetchAllPlayers();

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

      playerContainer.innerHTML = "";
      playerList.forEach((player) => {
        const playerElement = document.createElement("div");
        playerElement.classList.add("result");

        // adding html elements, and buttons
        playerElement.innerHTML = `
                      <h2>${player.name}</h2>
                      <p>${player.breed}</p>
                      <p>${player.status}</p>
                      <img src="${player.imageURL}" alt="">
                      <p>${player.time}</p>
                      <p>${player.teamId}</p>
                      <p>${player.cohortId}</p>

                      <button class = "detail-button" data.id= "${player.playerId}">Player detail</button>
                      <button class = "remove-button" data.id= "${player.playerId}">Remove player</button>

        `;

        playerContainer.appendChild(playerElement);

      // single player detail

      const detailButton = playerElement.querySelector(".detail-button");
      detailButton.addEventListener("click", () => {
        // fetch player details
        const playerId = detailButton.getAttribute(player.playerId);
        console.log(playerId);

        const details = fetchSinglePlayer(playerId)
      })

      // remove single player
      const removeButton = playerElement.querySelector(".remove-button");
      removeButton.addEventListener("click", () => {
        removePlayer(player.id);
        playerElement.remove();
      })
      });

      // after adding element, need to appends

      // adding detail button which need to render single player

      // adding the remove player button that remove single player

        console.log(playerList)
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
// const renderNewPlayerForm = () => {
//     try {
//       // fetch detail from API
    
       
//     } catch (err) {
//         console.error('Uh oh, trouble rendering the new player form!', err);
//     }
// }


const init = async () => {

const players = await fetchAllPlayers();
renderAllPlayers(players);
//fetchSinglePlayer(player[1].Id)


}


init();
