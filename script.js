'use strict';

let bookList = [];
let book;

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
    event.target.insertAdjacentHTML('beforeend', `<div class="rounded-md border-4 border-blue-400 bg-white w-1/2 mx-auto z-10 absolute" id="info"></div>`);
    const id = event.target.id; // Id found.
    fetchBook(id);

    let box = document.getElementById('info');
    const onMouseMove = (e) =>{
      box.style.left = (e.pageX + 10) + 'px';
      box.style.top = e.pageY + 'px';
    }
    document.addEventListener('mousemove', onMouseMove);
  }, false);

  item.addEventListener('mouseout', (event) => {
    let node = document.getElementById("info");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

async function fetchBook(id){
  const book = await getOne(id);
  renderBook(book);
}

function renderBook(book) {
  let html = `<p>Title: ${book.title}</p>`
  info.insertAdjacentHTML('beforeend', html);

  html = `<p>Author: ${book.author}</p>`
  info.insertAdjacentHTML('beforeend', html);

  if (book.coverImage != '') {
    const img = new Image(100, 200);
    img.src = book.coverImage;
    info.appendChild(img);
    img.className += "float-right";
  }
  html = `<p>Number of pages: ${book.pages}</p>`
  info.insertAdjacentHTML('beforeend', html);

  if (book.releaseDate != ""){
    html = `<p>Release date: ${book.releaseDate}</p>`
    info.insertAdjacentHTML('beforeend', html);
    html=``;
  }
}