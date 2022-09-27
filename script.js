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

// With this chunk of code, we make it possible for the form that creates books,
// to appear and disappear
let bookMaker = document.getElementById('book-maker');
let formBookMaker = document.getElementById('form-book-maker');
let submitButton = document.getElementById('submit-button');

window.addEventListener('load', () => formBookMaker.style.display='none');

bookMaker.addEventListener('click', () => formBookMaker.style.display = 'block');

submitButton.addEventListener('click', () => formBookMaker.style.display = 'none');


//This chunk of code prints all the books on screen.
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
