let myLibrary = [new Book('book1', 'J.R.R.Tolkien', 100, false), new Book('book2', 'J.R.R.Tolkien', 100, false), new Book('book3', 'J.R.R.Tolkien', 100, false)];

function Book(title, author, numberPages, read){
  this.title = title;
  this.author = author;
  this.pages = numberPages;
  this.read = read;
}

// Book.prototype.info = function(){
//   let returnS = `${this.title} by ${this.author}, ${this.pages} pages, `;
//   return this.read === true? returnS + 'read.': returnS + 'not read yet.';
// }

function addBookToLibrary(book){
  myLibrary.push(book);
}

let library = document.getElementById('library');

window.addEventListener('load', () =>{
  myLibrary.forEach((element) =>{
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    for (key in element){
      let prop = document.createElement('p');
      prop.textContent = `${key}: ${element[key]}`;
      newBook.appendChild(prop);
    }
    library.appendChild(newBook);
  })
});
