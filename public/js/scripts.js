const deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const confirmation = confirm('Are you sure you want to delete this item?');

    if (!confirmation) {
      event.preventDefault();
    }
  });
});
