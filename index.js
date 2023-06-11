// document.createElement("form");
//       form.id = "newPlayerEntry";
  
//       const nameDiv = document.createElement("div");
//       nameDiv.className = "newPlayerEntry";
//       const nameLabel = document.createElement("label");
//       nameLabel.textContent = "Enter player's name: ";
//       const nameInput = document.createElement("input");
//       nameInput.type = "text";
//       nameInput.name = "name";
//       nameInput.id = "name";
//       nameDiv.appendChild(nameLabel);
//       nameDiv.appendChild(nameInput);
  
//       const breedDiv = document.createElement("div");
//       breedDiv.className = "playerBreed";
//       const breedLabel = document.createElement("label");
//       breedLabel.textContent = "Enter player's breed: ";
//       const breedInput = document.createElement("input");
//       breedInput.type = "text";
//       breedInput.name = "breed";
//       breedInput.id = "breed";
//       breedDiv.appendChild(breedLabel);
//       breedDiv.appendChild(breedInput);
  
//       const ageDiv = document.createElement("div");
//       ageDiv.className = "playerAge";
//       const ageLabel = document.createElement("label");
//       ageLabel.textContent = "Enter player's age: ";
//       const ageInput = document.createElement("input");
//       ageInput.type = "text";
//       ageInput.name = "age";
//       ageInput.id = "age";
//       ageDiv.appendChild(ageLabel);
//       ageDiv.appendChild(ageInput);
  
//       const positionDiv = document.createElement("div");
//       positionDiv.className = "playerPosition";
//       const positionLabel = document.createElement("label");
//       positionLabel.textContent = "Enter player's position: ";
//       const positionInput = document.createElement("input");
//       positionInput.type = "text";
//       positionInput.name = "position";
//       positionInput.id = "position";
//       positionDiv.appendChild(positionLabel);
//       positionDiv.appendChild(positionInput);
  
//       const addButton = document.createElement("button");
//       addButton.textContent = "Add Player";
//       addButton.type = "submit"; // Set the button type to "submit"
//       addButton.addEventListener("click", addNewPlayer); // Attach event listener to the button
  
//       form.appendChild(nameDiv);
//       form.appendChild(breedDiv);
//       form.appendChild(ageDiv);
//       form.appendChild(positionDiv);
//       form.appendChild(addButton);
  
//       const newForm = document.getElementById("new-player-form");
//       newForm.innerHTML = ""; // Clear any existing content
//       newForm.appendChild(form);
//     } catch (err) {
//       console.error("Uh oh, trouble rendering the new player form!", err);
//     }
//   };
