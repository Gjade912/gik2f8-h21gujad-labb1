'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));

  const item = document.getElementById("item");
  item.addEventListener("mouseover", (event) => {
    event.target.insertAdjacentHTML('beforeend', `<div class="book-list rounded-md border-2 border-blue-400 bg-white w-full mx-auto" id="item"></div>`);
  }, false);

  item.addEventListener('mouseleave', (event) => {
    event.target.nextSibling.remove()
  });
}



function renderBookDetails(element) {

}
