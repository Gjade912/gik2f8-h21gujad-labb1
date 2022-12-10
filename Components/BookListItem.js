const BookListItem = (book) => {
  let html = `<li
                class="book-list__item mb-0 p-3 text-indigo-900 last:border-b-0 border-b border-indigo-700 cursor-pointer z-0" id="${book.id}">
              ${book.author} - ${book.title}    
              </li>`;
  return html;
};
