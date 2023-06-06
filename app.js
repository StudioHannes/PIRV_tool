const levelContainers = Array.from(document.querySelectorAll(".level-container"));
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const departmentInput = document.querySelector("#department");
const responsibilitiesInput = document.querySelector("#responsibilities");
const errorContainer = document.querySelector(".error-container");

let persons = [
  {
    id: 0,
    status: 0,
    name: "Michael Scott",
    title: "Regional Manager",
    department: "Management",
    responsibilities: "Managing the branch"
  },
  {
    id: 1,
    status: 0,
    name: "Dwight Schrute",
    title: "Assistant to the Regional Manager",
    department: "Sales",
    responsibilities: "Selling paper"
  },
  {
    id: 2,
    status: 0,
    name: "Jim Halpert",
    title: "Sales Representative",
    department: "Sales",
    responsibilities: "Playing pranks on Dwight"
  },
  {
    id: 3,
    status: 0,
    name: "Pam Beesly",
    title: "Receptionist",
    department: "Reception",
    responsibilities: "Answering phones and welcoming visitors"
  }
];

// add event listeners to all level-container
levelContainers.forEach((levelContainer) => {
  levelContainer.addEventListener("dragover", dragOver);
  levelContainer.addEventListener("drop", dragDrop);
});

// create a person card
function createPerson(personId, name, title, department, responsibilities) {
  const personCard = document.createElement("div");
  const personInfoContainer = document.createElement("div");
  const personNameContainer = document.createElement("div");
  const personName = document.createElement("p");
  const personTitleContainer = document.createElement("div");
  const personTitle = document.createElement("p");
  const personDepartmentContainer = document.createElement("div");
  const personDepartment = document.createElement("p");
  const personResponsibilitiesContainer = document.createElement("div");
  const personResponsibilities = document.createElement("p");
  const personFooterContainer = document.createElement("div");
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');

  personCard.classList.add("person-container");
  personInfoContainer.classList.add("person-info-container");
  personNameContainer.classList.add("person-name-container");
  personTitleContainer.classList.add("person-title-container");
  personDepartmentContainer.classList.add("person-department-container");
  personResponsibilitiesContainer.classList.add("person-responsibilities-container");
  personFooterContainer.classList.add("person-footer-container", "no-print");
  personFooterContainer.setAttribute("data-print", "exclude");
  editButton.classList.add('edit-button', "no-print");
  editButton.setAttribute("data-print", "exclude");
  deleteButton.classList.add('delete-button', "no-print");
  deleteButton.setAttribute("data-print", "exclude");

  personName.textContent = name;
  personTitle.textContent = title;
  personDepartment.textContent = department;
  personResponsibilities.textContent = responsibilities;
  deleteButton.textContent = 'Delete';
  editButton.textContent = "Edit";


  personCard.setAttribute("draggable", true);
  personCard.setAttribute("person-id", personId);
  deleteButton.setAttribute('type', 'button');
  editButton.setAttribute('type', 'button');

  personCard.addEventListener("dragstart", dragStart);
  personCard.addEventListener("dragover", dragOver);
  personCard.addEventListener("drop", dragDrop);

  editButton.addEventListener("click", editPerson.bind(personCard));
  deleteButton.addEventListener("click", deletePerson);

  personInfoContainer.append(personNameContainer, personTitleContainer, personDepartmentContainer, personResponsibilitiesContainer);
  personNameContainer.append(personName);
  personTitleContainer.append(personTitle);
  personDepartmentContainer.append(personDepartment);
  personResponsibilitiesContainer.append(personResponsibilities);
  personFooterContainer.append(editButton, deleteButton);

  personCard.append(
    personInfoContainer,
    personFooterContainer
  );

  return personCard;
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
    levelContainer.append(personCard);
  });
}

addPersons();

function editPerson() {
  const personCard = this.parentNode.parentNode;
  const personId = personCard.getAttribute("person-id");

  const personName = personCard.querySelector(".person-name");
  const personTitle = personCard.querySelector(".person-title");
  const personDepartment = personCard.querySelector(".person-department");
  const personResponsibilities = personCard.querySelector(".person-responsibilities");

  personName.innerHTML = `<input type="text" class="edit-input" value="${personName.textContent}" autofocus>`;
  personTitle.innerHTML = `<input type="text" class="edit-input" value="${personTitle.textContent}">`;
  personDepartment.innerHTML = `<input type="text" class="edit-input" value="${personDepartment.textContent}">`;
  personResponsibilities.innerHTML = `<input type="text" class="edit-input" value="${personResponsibilities.textContent}">`;

  const editInputs = personCard.querySelectorAll(".edit-input");
  editInputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        savePerson(personCard, personId);
      }
    });
    input.addEventListener("blur", () => {
      savePerson(personCard, personId);
    });
  });

  // Disable edit button while editing
  this.disabled = true;
}

function savePerson(personCard, personId) {
  const personNameInput = personCard.querySelector(".person-name input");
  const personTitleInput = personCard.querySelector(".person-title input");
  const personDepartmentInput = personCard.querySelector(".person-department input");
  const personResponsibilitiesInput = personCard.querySelector(".person-responsibilities input");

  const updatedPerson = {
    id: parseInt(personId),
    name: personNameInput.value,
    title: personTitleInput.value,
    department: personDepartmentInput.value,
    responsibilities: personResponsibilitiesInput.value
  };

  persons = persons.map((person) => {
    if (person.id === updatedPerson.id) {
      return updatedPerson;
    }
    return person;
  });

  // Update the card with the updated details
  personCard.querySelector(".person-name").innerHTML = updatedPerson.name;
  personCard.querySelector(".person-title").innerHTML = updatedPerson.title;
  personCard.querySelector(".person-department").innerHTML = updatedPerson.department;
  personCard.querySelector(".person-responsibilities").innerHTML = updatedPerson.responsibilities;

  // Enable edit button after saving
  const editIcon = personCard.querySelector(".edit-icon");
  if (editIcon) {
    editIcon.disabled = false;
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
  // Prevent default form submission behavior
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

  // Create new person object with default `status` of `0`
  const newPerson = {
    id: newId,
    name: nameInput.value,
    title: titleInput.value,
    department: departmentInput.value,
    responsibilities: responsibilitiesInput.value,
    status: 0,
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

if (navigator.userAgentData) {
  // Use navigator.userAgentData instead of navigator.userAgent
} else {
  // Fallback to navigator.userAgent
}
