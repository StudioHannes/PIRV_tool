// Main drag and drop
var options = {
    group: 'share',
    animation: 100,
};

Sortable.create(level_container_1, options);
Sortable.create(level_container_2, options);
Sortable.create(level_container_3, options);
Sortable.create(level_container_4, options);

// Organization title editing function for header
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
        heading.style.display = 'flex';
        button.textContent = 'Edit';
    }
}

// Editing management level names
function editLevelName(level) {
    var titleElement = document.getElementById(`level-${level}-name-title`);
    var inputElement = document.getElementById(`level-${level}-name-input`);
    var editButton = document.getElementById(`level-${level}-edit-button`);
    var saveButton = document.getElementById(`level-${level}-save-button`);

    inputElement.value = titleElement.innerText;
    titleElement.classList.add('hidden');
    inputElement.classList.remove('hidden');
    editButton.classList.add('hidden');
    saveButton.classList.remove('hidden');
}

function saveLevelName(level) {
    var titleElement = document.getElementById(`level-${level}-name-title`);
    var inputElement = document.getElementById(`level-${level}-name-input`);
    var editButton = document.getElementById(`level-${level}-edit-button`);
    var saveButton = document.getElementById(`level-${level}-save-button`);

    titleElement.innerText = inputElement.value.trim();
    titleElement.classList.remove('hidden');
    inputElement.classList.add('hidden');
    editButton.classList.remove('hidden');
    saveButton.classList.add('hidden');
}

// Create cards with form
function createCard(levelContainer, name, title, department, responsibilities) {
    // Create the necessary DOM elements for the card
    const personContainer = document.createElement('div');
    personContainer.classList.add('person-container');

    const personInfoContainer = document.createElement('div');
    personInfoContainer.classList.add('person-info-container');

    const personNameContainer = document.createElement('div');
    personNameContainer.classList.add('person-name-container');
    personNameContainer.innerHTML = `<p>${name}</p>`;

    const personTitleContainer = document.createElement('div');
    personTitleContainer.classList.add('person-title-container');
    personTitleContainer.innerHTML = `<p>${title}</p>`;

    const personDepartmentContainer = document.createElement('div');
    personDepartmentContainer.classList.add('person-department-container');
    personDepartmentContainer.innerHTML = `<p>${department}</p>`;

    const personResponsibilitiesContainer = document.createElement('div');
    personResponsibilitiesContainer.classList.add(
        'person-responsibilities-container'
    );
    personResponsibilitiesContainer.innerHTML = `<p>${responsibilities}</p>`;

    const personFooterContainer = document.createElement('div');
    personFooterContainer.classList.add('person-footer-container', 'no-print');

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button', 'no-print');
    copyButton.setAttribute('type', 'button');
    copyButton.textContent = 'Copy';

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button', 'no-print');
    editButton.setAttribute('type', 'button');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button', 'no-print');
    deleteButton.setAttribute('type', 'button');
    deleteButton.textContent = 'Delete';

    // Append the elements to build the card structure
    personInfoContainer.appendChild(personNameContainer);
    personInfoContainer.appendChild(personTitleContainer);
    personInfoContainer.appendChild(personDepartmentContainer);
    personInfoContainer.appendChild(personResponsibilitiesContainer);

    personFooterContainer.appendChild(copyButton);
    personFooterContainer.appendChild(editButton);
    personFooterContainer.appendChild(deleteButton);

    personContainer.appendChild(personInfoContainer);
    personContainer.appendChild(personFooterContainer);

    levelContainer.appendChild(personContainer);

    // Add event listeners to the buttons in the created card
    copyButton.addEventListener('click', handleCopyButtonClick);
    editButton.addEventListener('click', handleEditButtonClick);
    deleteButton.addEventListener('click', handleDeleteButtonClick);
}

// Get a reference to the form element
const form = document.getElementById('input-form');

// Function to handle form submission
function addNewPerson(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form input values
    const nameInput = document.getElementById('name');
    const titleInput = document.getElementById('title');
    const departmentInput = document.getElementById('department');
    const responsibilitiesInput = document.getElementById('responsibilities');

    const name = nameInput.value;
    const title = titleInput.value;
    const department = departmentInput.value;
    const responsibilities = responsibilitiesInput.value;

    // Check if all the required form fields are filled
    if (name && title) {
        const levelContainer = document.querySelector('.level-container');

        // Call the createCard function to create a new card with the form data
        createCard(levelContainer, name, title, department, responsibilities);

        // Reset the form input fields
        nameInput.value = '';
        titleInput.value = '';
        departmentInput.value = '';
        responsibilitiesInput.value = '';
    }
}

// Function to handle the copy button click
function handleCopyButtonClick(event) {
    const cardElement = event.target.closest('.person-container');
    copyCard(cardElement);
}

// Function to handle the edit button click
function handleEditButtonClick(event) {
    const cardElement = event.target.closest('.person-container');
    editPerson(cardElement);
}

// Function to handle card deletion
function deleteCard(cardElement) {
    if (cardElement.parentNode) {
        // Get the parent container of the card
        const levelContainer = cardElement.parentNode;

        // Remove the card from the parent container
        levelContainer.removeChild(cardElement);
    }
}

// Function to handle the delete button click
function handleDeleteButtonClick(event) {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
        const cardElement = deleteButton.closest('.person-container');
        deleteCard(cardElement);
    }
}






// Function to copy a card
function copyCard(cardElement) {
    // Get the parent container of the card
    const levelContainer = cardElement.parentNode;

    // Create a copy of the card element
    const copiedCard = cardElement.cloneNode(true);

    // Modify the name of the copied card
    const nameElement = copiedCard.querySelector('.person-name-container p');
    const originalName = nameElement.textContent;
    const copiedName = `${originalName} - copy`;
    nameElement.textContent = copiedName;

    // Get the copy button, edit button, and delete button of the copied card
    const copyButton = copiedCard.querySelector('.copy-button');
    const editButton = copiedCard.querySelector('.edit-button');
    const deleteButton = copiedCard.querySelector('.delete-button');

    // Add event listeners to the buttons in the copied card
    copyButton.addEventListener('click', handleCopyButtonClick);
    editButton.addEventListener('click', handleEditButtonClick);
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    // Append the copied card next to the original card
    levelContainer.insertBefore(copiedCard, cardElement.nextElementSibling);
}

// Function to handle the edit button click
function editPerson(personContainer) {
    const personNameContainer = personContainer.querySelector(
        '.person-name-container'
    );
    const personTitleContainer = personContainer.querySelector(
        '.person-title-container'
    );
    const personDepartmentContainer = personContainer.querySelector(
        '.person-department-container'
    );
    const personResponsibilitiesContainer = personContainer.querySelector(
        '.person-responsibilities-container'
    );
    const editButton = personContainer.querySelector('.edit-button');
    const deleteButton = personContainer.querySelector('.delete-button');
    const copyButton = personContainer.querySelector('.copy-button');
    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button', 'no-print');
    saveButton.textContent = 'Save';
    saveButton.type = 'button';
    saveButton.addEventListener('click', function () {
        savePerson(personContainer);
    });
    const personNameInput = document.createElement('input');
    personNameInput.classList.add('person-input');
    personNameInput.value = personNameContainer.textContent.trim();
    const personTitleInput = document.createElement('input');
    personTitleInput.classList.add('person-input');
    personTitleInput.value = personTitleContainer.textContent.trim();
    const personDepartmentInput = document.createElement('input');
    personDepartmentInput.classList.add('person-input');
    personDepartmentInput.value = personDepartmentContainer.textContent.trim();
    const personResponsibilitiesInput = document.createElement('input');
    personResponsibilitiesInput.classList.add('person-input');
    personResponsibilitiesInput.value = personResponsibilitiesContainer.textContent.trim();

    // Replace the elements with the input fields
    personNameContainer.innerHTML = '';
    personNameContainer.appendChild(personNameInput);
    personTitleContainer.innerHTML = '';
    personTitleContainer.appendChild(personTitleInput);
    personDepartmentContainer.innerHTML = '';
    personDepartmentContainer.appendChild(personDepartmentInput);
    personResponsibilitiesContainer.innerHTML = '';
    personResponsibilitiesContainer.appendChild(personResponsibilitiesInput);

    // Hide buttons
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';
    copyButton.style.display = 'none';

    // Append the save button
    personContainer.appendChild(saveButton);
}

// Function to save the edited person
function savePerson(personContainer) {
    const personNameContainer = personContainer.querySelector(
        '.person-name-container'
    );
    const personTitleContainer = personContainer.querySelector(
        '.person-title-container'
    );
    const personDepartmentContainer = personContainer.querySelector(
        '.person-department-container'
    );
    const personResponsibilitiesContainer = personContainer.querySelector(
        '.person-responsibilities-container'
    );
    const editButton = personContainer.querySelector('.edit-button');
    const deleteButton = personContainer.querySelector('.delete-button');
    const copyButton = personContainer.querySelector('.copy-button');
    const saveButton = personContainer.querySelector('.save-button');
    const personNameInput = personContainer.querySelector(
        '.person-name-container input'
    );
    const personTitleInput = personContainer.querySelector(
        '.person-title-container input'
    );
    const personDepartmentInput = personContainer.querySelector(
        '.person-department-container input'
    );
    const personResponsibilitiesInput = personContainer.querySelector(
        '.person-responsibilities-container input'
    );
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

    // Replace the input fields with the new elements
    personNameContainer.innerHTML = '';
    personNameContainer.appendChild(personNameP);
    personTitleContainer.innerHTML = '';
    personTitleContainer.appendChild(personTitleP);
    personDepartmentContainer.innerHTML = '';
    personDepartmentContainer.appendChild(personDepartmentP);
    personResponsibilitiesContainer.innerHTML = '';
    personResponsibilitiesContainer.appendChild(personResponsibilitiesP);

    // Show buttons
    editButton.style.display = 'inline';
    deleteButton.style.display = 'inline';
    copyButton.style.display = 'inline';

    // Remove the save button
    saveButton.remove();
}

function preparePrint() {
    var ghostContainers = document.querySelectorAll('.ghost-container');

    if (ghostContainers.length > 0) {
        ghostContainers.forEach(function (ghostContainer) {
            ghostContainer.style.opacity = 0;
        });

        setTimeout(function () {
            window.print();

            ghostContainers.forEach(function (ghostContainer) {
                ghostContainer.style.opacity = 1; // Restore original opacity after printing
            });
        }, 100);
    } else {
        window.print();
    }
}

function save() {
    // Get the levels container element
    const levelsContainer = document.getElementById('levels-container');

    // Create a clone of the levels container to preserve its state
    const clone = levelsContainer.cloneNode(true);

    // Convert the cloned levels container to an HTML string
    const htmlString = clone.outerHTML;

    // Create a new Blob object
    const blob = new Blob([htmlString], {
        type: 'text/html',
    });

    // Set the file name
    const fileName = 'export.html';

    // Create a new FileSaver object
    const fileSaver = new FileSaver();

    // Save the file
    fileSaver.save(blob, fileName);
}

function load() {
    // Get the file name
    const fileName = prompt('Enter the file name');

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Handle the onload event
    xhr.onload = function () {
        // Get the response text
        const responseText = xhr.responseText;

        // Parse the response as HTML
        const parsedHTML = new DOMParser().parseFromString(responseText, 'text/html');

        // Get the levels container from the parsed HTML
        const levelsContainer = parsedHTML.getElementById('levels-container');

        // Get the current levels container on the page
        const currentLevelsContainer = document.getElementById('levels-container');

        // Replace the current levels container with the loaded one
        currentLevelsContainer.innerHTML = levelsContainer.innerHTML;
    };

    // Open the file
    xhr.open('GET', fileName, true);

    // Send the request
    xhr.send();
}

// Add event listener to the export button
const exportButton = document.getElementById('exportBtn');
exportButton.addEventListener('click', saveLevelsContainer);

// Add event listener to the import button
const importButton = document.getElementById('importBtn');
importButton.addEventListener('change', loadLevelsContainer);



// Function to add event listeners to the buttons
function setupEventListeners() {
    // Add event listeners to the copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach((button) => {
        button.addEventListener('click', handleCopyButtonClick);
    });

    // Add event listeners to the edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((button) => {
        button.addEventListener('click', handleEditButtonClick);
    });

    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteButtonClick);
    });
}

// Call the function to add event listeners to all the buttons
setupEventListeners();

// Add event listener to the form submit event
form.addEventListener('submit', addNewPerson);

// Add event listener to the "Add empty card" buttons
const emptyButtons = document.querySelectorAll('.add-empty-card-button');
emptyButtons.forEach((button) => {
    button.addEventListener('click', createGhost);
});

// Function to create an empty card (ghost)
function createGhost(event) {
    const levelContainer = event.target.closest('.level-tag').previousElementSibling;

    const ghostContainer = document.createElement('div');
    ghostContainer.classList.add('ghost-container');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('ghost-delete-button');
    deleteButton.textContent = 'Delete';

    ghostContainer.appendChild(deleteButton);
    levelContainer.appendChild(ghostContainer);

    // Add event listener to the delete button of the created empty card
    deleteButton.addEventListener('click', function () {
        levelContainer.removeChild(ghostContainer);
    });

    // Remove the event listener from the "Add empty card" button
    event.target.removeEventListener('click', createGhost);
}


