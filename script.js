const plusButtons = document.querySelectorAll('.add-card-button');
plusButtons.forEach(button => {
  button.addEventListener('click', () => {
    const content = document.querySelector('.content');
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.position = 'absolute';
    card.style.top = `${button.parentElement.offsetTop + button.parentElement.offsetHeight + 50}px`;
    card.style.left = `${button.parentElement.offsetLeft}px`;
    content.appendChild(card);

    const cardContent = `
      <div class="background"></div>
      <div class="info">
        <label>Department:</label>
        <input type="text" placeholder="Enter department">
      </div>
      <div class="info">
        <label>Title:</label>
        <input type="text" placeholder="Enter title">
      </div>
      <div class="buttons">
        <div class="left">
          <button>Save</button>
          <button>Cancel</button>
        </div>
        <div class="right">
          <button>Delete</button>
        </div>
      </div>
    `;
    card.innerHTML = cardContent;

    const inputFields = card.querySelectorAll('input');
    inputFields.forEach(input => input.value = '');
  });
});
