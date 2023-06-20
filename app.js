// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createGhost() {
  // Step 1: Create the ghost container element
  const personContainer = document.createElement('div');
  personContainer.classList.add('ghost-container');

  // Step 2: Add event listeners for dragging
  personContainer.addEventListener('dragstart', dragStart);
  personContainer.addEventListener('dragover', dragOver);
  personContainer.addEventListener('drop', dragDrop);

  // Step 3: Enable dragging for the ghost container element
  personContainer.draggable = true;

  // Step 4: Create the delete button
  const ghostDeleteButton = document.createElement('button');
  ghostDeleteButton.classList.add('ghost-delete-button', 'no-print');
  ghostDeleteButton.setAttribute('data-print', 'exclude');
  ghostDeleteButton.textContent = 'Delete';

  // Step 5: Add event listener for delete button click
  ghostDeleteButton.addEventListener('click', deleteGhost);

  // Step 6: Append the delete button to the ghost container
  personContainer.appendChild(ghostDeleteButton);

  // Step 7: Return the ghost container element
  return personContainer;
}

// deleteGhost function
function deleteGhost(event) {
  // Step 1: Find the closest ghost container element
  const ghostContainer = event.target.closest('.ghost-container');

  // Step 2: Remove the ghost container element if found
  if (ghostContainer) {
    ghostContainer.remove();
  }
}

//Creating the ghost cards
// Define an array of ghost button IDs
var ghostButtonIds = ['ghost-button-1', 'ghost-button-2', 'ghost-button-3', 'ghost-button-4'];

// Loop through the ghost buttons
ghostButtonIds.forEach(function(buttonId) {
  var ghostButton = document.getElementById(buttonId);
  var grandparentsContainer = ghostButton.parentNode.parentNode.querySelector('.level-container');

  ghostButton.addEventListener('click', function() {
    var ghostContainer = createGhost();
    grandparentsContainer.appendChild(ghostContainer);
  });
});

// Define organization title editing functionality
function toggleEdit() {
  const inputField = document.getElementById('university-name');
  const heading = document.getElementById('university-name-heading');
  const button = document.getElementById('university-name-button');

  if (inputField.style.display === 'none') {
    // Editing mode
    inputField.style.display = 'inline';
    heading.style.display = 'none';
    button.textContent = 'Save';
  } else {
    // Saving mode
    inputField.style.display = 'none';
    heading.textContent = inputField.value.trim();
    heading.style.display = 'block';
    button.textContent = 'Edit';
  }
}

function preparePrint() {
  var ghostContainer = document.querySelector('.ghost-container');

  if (ghostContainer) {
    ghostContainer.style.opacity = 0;
    setTimeout(function() {
      window.print();
      ghostContainer.style.opacity = 1; // Restore original opacity after printing
    }, 100);
  } else {
    window.print();
  }
}

function editLevelName(level) {
  var titleElement = document.getElementById(`level-${level}-name-title`);
  var inputElement = document.getElementById(`level-${level}-name-input`);
  var editButton = document.getElementById(`level-${level}-edit-button`);
  var saveButton = document.getElementById(`level-${level}-save-button`);

  inputElement.value = titleElement.innerText;
  titleElement.classList.add("hidden");
  inputElement.classList.remove("hidden");
  editButton.classList.add("hidden");
  saveButton.classList.remove("hidden");
}

function saveLevelName(level) {
  var titleElement = document.getElementById(`level-${level}-name-title`);
  var inputElement = document.getElementById(`level-${level}-name-input`);
  var editButton = document.getElementById(`level-${level}-edit-button`);
  var saveButton = document.getElementById(`level-${level}-save-button`);

  titleElement.innerText = inputElement.value;
  titleElement.classList.remove("hidden");
  inputElement.classList.add("hidden");
  editButton.classList.remove("hidden");
  saveButton.classList.add("hidden");
  saveButton.classList.remove("no-print");
}

// Definig variables
const levelContainers = Array.from(document.querySelectorAll(".level-container"));
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const departmentInput = document.querySelector("#department");
const responsibilitiesInput = document.querySelector("#responsibilities");
const errorContainer = document.querySelector(".error-container");

// Defining starting cards personas
let persons = [
{
  id: 0,
  name: "Bianca Rossi",
  title: "Rector",
  department: "University Management",
  responsibilities: "Overall Lead of the University"
},
{
  id: 1, name: "Louis Durand",
    title: "Vice-Rector for International Affairs",
      department: "University Management",
        responsibilities: "Overall Lead International Affairs"
},
{
  id: 2, name: "Sami Virtanen",
    title: "Head of International Relations Office",
      department: "International Relations Office",
        responsibilities: "Head Coordinator International Relations"
},
{
  id: 3, name: "Sabine Weber",
    title: "Mobility Specialist",
      department: "International Relations Office",
        responsibilities: "Incoming Erasmus+ mobility"
},
];

// add event listeners to all level-container
levelContainers.forEach((levelContainer) => {
  levelContainer.addEventListener("dragover", dragOver);
  levelContainer.addEventListener("drop", dragDrop);
});



function createPerson(personId, name, title, department, responsibilities) {
  var personCard = document.createElement("div");
  var personInfoContainer = document.createElement("div");
  var personNameContainer = document.createElement("div");
  var personName = document.createElement("p");
  var personTitleContainer = document.createElement("div");
  var personTitle = document.createElement("p");
  var personDepartmentContainer = document.createElement("div");
  var personDepartment = document.createElement("p");
  var personResponsibilitiesContainer = document.createElement("div");
  var personResponsibilities = document.createElement("p");
  var personFooterContainer = document.createElement("div");
  var copyButton = document.createElement('button');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');

  personCard.classList.add("person-container");
  personInfoContainer.classList.add("person-info-container");
  personNameContainer.classList.add("person-name-container");
  personTitleContainer.classList.add("person-title-container");
  personDepartmentContainer.classList.add("person-department-container");
  personResponsibilitiesContainer.classList.add("person-responsibilities-container");
  personFooterContainer.classList.add("person-footer-container", "no-print");
  personFooterContainer.setAttribute("data-print", "exclude");
  copyButton.classList.add('copy-button', "no-print");
  copyButton.setAttribute("data-print", "exclude");
  editButton.classList.add('edit-button', "no-print");
  editButton.setAttribute("data-print", "exclude");
  deleteButton.classList.add('delete-button', "no-print");
  deleteButton.setAttribute("data-print", "exclude");

  personName.textContent = name;
  personTitle.textContent = title;
  personDepartment.textContent = department;
  personResponsibilities.textContent = responsibilities;
  copyButton.textContent = 'Copy';
  editButton.textContent = "Edit";
  deleteButton.textContent = 'Delete';

  personCard.setAttribute("draggable", true);
  personCard.setAttribute("person-id", personId);
  copyButton.setAttribute('type', 'button');
  editButton.setAttribute('type', 'button');
  deleteButton.setAttribute('type', 'button');

  personCard.addEventListener("dragstart", dragStart);
  personCard.addEventListener("dragover", dragOver);
  personCard.addEventListener("drop", dragDrop);

  copyButton.addEventListener("click", function() {
    copyPerson.bind(personCard)();
  });

  editButton.addEventListener("click", function() {
    editPerson.call(personCard);
  });

  deleteButton.addEventListener("click", deletePerson);

  personInfoContainer.appendChild(personNameContainer);
  personInfoContainer.appendChild(personTitleContainer);
  personInfoContainer.appendChild(personDepartmentContainer);
  personInfoContainer.appendChild(personResponsibilitiesContainer);

  personNameContainer.appendChild(personName);
  personTitleContainer.appendChild(personTitle);
  personDepartmentContainer.appendChild(personDepartment);
  personResponsibilitiesContainer.appendChild(personResponsibilities);

  personFooterContainer.appendChild(copyButton);
  personFooterContainer.appendChild(editButton);
  personFooterContainer.appendChild(deleteButton);

  personCard.appendChild(personInfoContainer);
  personCard.appendChild(personFooterContainer);

  console.log('personCard created!');
  return personCard;
}

// create a getNextPersonId function for copyPerson function to use
function getNextPersonId() {
  let maxId = 0;
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].id > maxId) {
      maxId = persons[i].id;
    }
  }
  return maxId + 1;
}

function copyPerson() {
  const personCard = this;
  const personId = getNextPersonId();
  const personName = personCard.querySelector(".person-name-container p").textContent;
  const personTitle = personCard.querySelector(".person-title-container p").textContent;
  const personDepartment = personCard.querySelector(".person-department-container p").textContent;
  const personResponsibilities = personCard.querySelector(".person-responsibilities-container p").textContent;

  const copyCard = createPerson(personId, personName + " copy", personTitle, personDepartment, personResponsibilities);
  const parentCard = personCard.parentElement;
  parentCard.insertBefore(copyCard, personCard.nextSibling);

  const newPerson = {
    id: personId,
    name: personName + " copy",
    title: personTitle,
    department: personDepartment,
    responsibilities: personResponsibilities
  };
  console.log('person copied!');
  persons.push(newPerson);
}



function addPersons() {
  persons.forEach((person, index) => {
    const levelContainer = levelContainers[index % levelContainers.length];
    const personCard = createPerson(
      person.id,
      person.name,
      person.title,
      person.department,
      person.responsibilities
    );
    levelContainer.appendChild(personCard);
  });
}

addPersons();


//edit person funtion
function editPerson() {

  const personCard = this;
  const personId = personCard.getAttribute("person-id");
  const personNameContainer = personCard.querySelector(".person-name-container");
  const personTitleContainer = personCard.querySelector(".person-title-container");
  const personDepartmentContainer = personCard.querySelector(".person-department-container");
  const personResponsibilitiesContainer = personCard.querySelector(".person-responsibilities-container");
  const editButton = personCard.querySelector(".edit-button");
  const deleteButton = personCard.querySelector(".delete-button");
  const copyButton = personCard.querySelector(".copy-button");
  const personNameText = personNameContainer.textContent.trim();
  const personTitleText = personTitleContainer.textContent.trim();
  const personDepartmentText = personDepartmentContainer.textContent.trim();
  const personResponsibilitiesText = personResponsibilitiesContainer.textContent.trim();
  const personNameInput = document.createElement("input");
  personNameInput.classList.add("person-input");
  personNameInput.value = personNameText;
  const personTitleInput = document.createElement("input");
  personTitleInput.classList.add("person-input");
  personTitleInput.value = personTitleText;
  const personDepartmentInput = document.createElement("input");
  personDepartmentInput.classList.add("person-input");
  personDepartmentInput.value = personDepartmentText;
  const personResponsibilitiesInput = document.createElement("input");
  personResponsibilitiesInput.classList.add("person-input");
  personResponsibilitiesInput.value = personResponsibilitiesText;
  const saveButton = document.createElement("button");
  saveButton.classList.add("save-button", "no-print");
  saveButton.textContent = "Save";
  saveButton.type = "button";
  saveButton.addEventListener("click", savePerson.bind(personCard, parseInt(personCard.getAttribute("person-id"))));
  personNameContainer.innerHTML = "";
  personNameContainer.appendChild(personNameInput);
  personTitleContainer.innerHTML = "";
  personTitleContainer.appendChild(personTitleInput);
  personDepartmentContainer.innerHTML = "";
  personDepartmentContainer.appendChild(personDepartmentInput);
  personResponsibilitiesContainer.innerHTML = "";
  personResponsibilitiesContainer.appendChild(personResponsibilitiesInput);
  editButton.style.display = "none";
  deleteButton.style.display = "none";
  copyButton.style.display = "none";
  personCard.appendChild(saveButton);
}

function savePerson(personId) {

  const personCard = this;
  const personNameInput = personCard.querySelector(".person-name-container input");
  const personTitleInput = personCard.querySelector(".person-title-container input");
  const personDepartmentInput = personCard.querySelector(".person-department-container input");
  const personResponsibilitiesInput = personCard.querySelector(".person-responsibilities-container input");
  const personName = personNameInput.value.trim();
  const personTitle = personTitleInput.value.trim();
  const personDepartment = personDepartmentInput.value.trim();
  const personResponsibilities = personResponsibilitiesInput.value.trim();

  const personNameP = document.createElement('p');
  const personTitleP = document.createElement('p');
  const personDepartmentP = document.createElement('p');
  const personResponsibilitiesP = document.createElement('p');

  personNameP.textContent = personName;
  personTitleP.textContent = personTitle;
  personDepartmentP.textContent = personDepartment;
  personResponsibilitiesP.textContent = personResponsibilities;

  const personNameContainer = personCard.querySelector('.person-name-container');
  const personTitleContainer = personCard.querySelector('.person-title-container');
  const personDepartmentContainer = personCard.querySelector('.person-department-container');
  const personResponsibilitiesContainer = personCard.querySelector('.person-responsibilities-container');
  const editButton = personCard.querySelector('.edit-button');
  const deleteButton = personCard.querySelector('.delete-button');
  const copyButton = personCard.querySelector('.copy-button');
  const saveButton = personCard.querySelector('.save-button');

  personNameContainer.innerHTML = "";
  personNameContainer.appendChild(personNameP);
  personTitleContainer.innerHTML = "";
  personTitleContainer.appendChild(personTitleP);
  personDepartmentContainer.innerHTML = "";
  personDepartmentContainer.appendChild(personDepartmentP);
  personResponsibilitiesContainer.innerHTML = "";
  personResponsibilitiesContainer.appendChild(personResponsibilitiesP);

  editButton.style.display = "inline";
  deleteButton.style.display = "inline";
  copyButton.style.display = "inline";
  saveButton.remove();

  const person = persons.find((p) => p.id === personId);
  if (person) {
    person.name = personName;
    person.title = personTitle;
    person.department = personDepartment;
    person.responsibilities = personResponsibilities;
  }

}



let elementBeingDragged;

function dragStart() {
  elementBeingDragged = this;
  elementBeingDragged.classList.add("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const levelId = this.parentNode.getAttribute("id");
  if (elementBeingDragged !== this) {
    this.append(elementBeingDragged);
  }

  elementBeingDragged.classList.remove("dragging");
}

function showError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message");
  errorContainer.append(errorMessage);

  setTimeout(() => {
    errorContainer.removeChild(errorMessage);
  }, 2000);
}


function addPerson(e) {
  e.preventDefault();

  // Check if any input element is missing content
  if (!nameInput.value.trim() || !titleInput.value.trim() || !departmentInput.value.trim() || !responsibilitiesInput.value.trim()) {
    showError("One or more input elements are missing."); // Show error message
    return; // Exit early
  }

  // Check if person with the same name already exists in the persons array
  const hasDuplicate = persons.some(({ name }) => name === nameInput.value);

  if (hasDuplicate) { // If duplicate person exists, show error message and exit early
    showError("Name must be unique!");
    return;
  }

  // Hide error container
  errorContainer.classList.add("hidden");

  // Calculate ID of the new person object
  const newId = persons.length;

  // Create new person object ???
  const newPerson = {
    id: newId,
    name: nameInput.value,
    title: titleInput.value,
    department: departmentInput.value,
    responsibilities: responsibilitiesInput.value,
  };

  // Add new person object to the persons array
  persons.push(newPerson);

  // Determine the target level container for the new person card
  const levelContainer = levelContainers[newId % levelContainers.length];

  // Create new person card element and pass in the properties of the new person object
  const personCard = createPerson(
    newId,
    nameInput.value,
    titleInput.value,
    departmentInput.value,
    responsibilitiesInput.value
  );

  // Add the new person card element to the target level container
  levelContainer.append(personCard);

  // Clear input values
  nameInput.value = "";
  titleInput.value = "";
  departmentInput.value = "";
  responsibilitiesInput.value = "";
}

const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", addPerson);

function deletePerson() {
  const personCard = this.parentNode.parentNode;
  const personId = personCard.getAttribute("person-id");

  persons = persons.filter((person) => person.id !== parseInt(personId));
  personCard.remove();
}

// Export button event listener
document.getElementById('exportBtn').addEventListener('click', exportChart);

// Import button event listener
document.getElementById('importBtn').addEventListener('click', importChart);


// Export chart function
function exportChart() {
  // Get the HTML content of the levels-container
  var levelsDiv = document.getElementById('levels-container');
  if (levelsDiv) {
    var levelsDivHTML = levelsDiv.outerHTML;
    // Serialize the persons array
    var personsSerialized = JSON.stringify(persons);

    // Combine the HTML content and the serialized persons array with the custom delimiter
    var combinedData = levelsDivHTML + 'EXPORT_LEVELS' + personsSerialized;

    // Create a Blob object with the combined data
    var blob = new Blob([combinedData], { type: 'text/plain' });

    // Create a temporary URL for the Blob object
    var url = URL.createObjectURL(blob);

    // Create a link element for downloading the file
    var link = document.createElement('a');
    link.href = url;
    link.download = 'chart-data.txt';

    // Trigger a click event on the link element to initiate the download
    link.click();

    // Clean up the temporary URL and link element
    URL.revokeObjectURL(url);
    link.remove();

    console.log('Chart exported successfully!');
    console.log(persons);
  } else {
    console.log('Error: levels-container element not found!');
  }
}



// // Import chart function
// function importChart() {
//   // Create an input element for file upload
//   var fileInput = document.createElement('input');
//   fileInput.type = 'file';

//   // Add an event listener for file selection
//   fileInput.addEventListener('change', function(event) {
//     var file = event.target.files[0];

//     // Create a FileReader to read the file contents
//     var reader = new FileReader();

//     // Add an event listener for when the file has been loaded
//     reader.addEventListener('load', function(loadEvent) {
//       var fileContents = loadEvent.target.result;

//       // Split the file contents based on the custom delimiter
//       var dataParts = fileContents.split('EXPORT_LEVELS');
//       var levelsDivHTML = dataParts[0];
//       var personsSerialized = dataParts[1];

//       // Create a temporary container element
//       var tempContainer = document.createElement('div');
//       tempContainer.innerHTML = levelsDivHTML;

//       // Get the imported levels-container div
//       var importedLevelsDiv = tempContainer.querySelector('#levels-container');

//       // Restore the DOM
//       var currentLevelsDiv = document.getElementById('levels-container');
//       currentLevelsDiv.parentNode.replaceChild(importedLevelsDiv, currentLevelsDiv);

//       // Parse the serialized persons array
//       var persons = JSON.parse(personsSerialized);

//       // Use the restored DOM and persons array to update the chart
//       // ...

//       console.log('Chart imported successfully!');

//     });

//     // Read the file as text
//     reader.readAsText(file);
//   });

//   // Simulate a click on the file input element to trigger file selection
//   fileInput.click();
// }

// // Function to attach event listeners
// function attachEventListeners() {
//   // Get the buttons and attach event listeners
//   var buttons = document.querySelectorAll('.copy-button');
//   buttons.forEach(function(button) {
//     button.addEventListener('click', function(event) {
//       // Perform the copy operation
//       copyPerson(event.target.dataset.personId);
//     });
//   });
// }


// Import chart function
function importChart() {
  return new Promise(function(resolve, reject) {
    // Create an input element for file upload
    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    // Add an event listener for file selection
    fileInput.addEventListener('change', function(event) {
      var file = event.target.files[0];

      // Create a FileReader to read the file contents
      var reader = new FileReader();

      // Add an event listener for when the file has been loaded
      reader.addEventListener('load', function(loadEvent) {
        var fileContents = loadEvent.target.result;

        // Split the file contents based on the custom delimiter
        var dataParts = fileContents.split('EXPORT_LEVELS');
        var levelsDivHTML = dataParts[0];
        var personsSerialized = dataParts[1];

        // Create a temporary container element
        var tempContainer = document.createElement('div');
        tempContainer.innerHTML = levelsDivHTML;

        // Get the imported levels-container div
        var importedLevelsDiv = tempContainer.querySelector('#levels-container');

        // Restore the DOM
        var currentLevelsDiv = document.getElementById('levels-container');
        currentLevelsDiv.parentNode.replaceChild(importedLevelsDiv, currentLevelsDiv);

        // Parse the serialized persons array
        var persons = JSON.parse(personsSerialized);

        // Use the restored DOM and persons array to update the chart
        // ...

        console.log('Chart imported successfully!');

        // Resolve the promise
        resolve();

      });

      // Add an event listener for error handling
      reader.addEventListener('error', function(errorEvent) {
        // Reject the promise with the error
        reject(errorEvent.error);
      });

      // Read the file as text
      reader.readAsText(file);
    });

    // Simulate a click on the file input element to trigger file selection
    fileInput.click();
  });
}
