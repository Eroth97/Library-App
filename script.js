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

//Variables
let author = document.getElementById('author');
let title = document.getElementById('title');
let numberPages = document.getElementById('number-pages');
let yes = document.getElementById('yes');
let no = document.getElementById('no');

let textInputs = document.querySelectorAll('.options');
let buttonInputs = document.querySelectorAll('.buttons-options')

let library = document.getElementById('library');
let bookMaker = document.getElementById('book-maker');
let formBookMaker = document.getElementById('form-book-maker');
let submitButton = document.getElementById('submit-button');

//Functions
function capitalizeFirstWord(word){
  return word[0].toUpperCase() + word.slice(1);
}

function addBookToLibrary(book){
  myLibrary.push(book);
};

function displayBooks(){
  myLibrary.forEach((element) =>{
    let bookCard = document.createElement('div');
    bookCard.classList.add('book');
    for (key in element){
      let prop = document.createElement('p');
      let newKey = capitalizeFirstWord(key).bold();
      if (key === 'read'){
        let bookReadStatus = element[key] === false? 'No': 'Yes';
        prop.textContent = `${capitalizeFirstWord(key)}:  ${bookReadStatus}`;
      }
      else prop.textContent = `${capitalizeFirstWord(key)}:  ${element[key]}`;
      
      bookCard.appendChild(prop);
    }
    library.appendChild(bookCard);
  })
};

function eraseBooks(){
  let bookCards = document.querySelectorAll('.book');
  console.log(bookCards);
  bookCards.forEach(element => library.removeChild(element));
}

function cleanForm(){
  textInputs.forEach(element => element.value = '');
  buttonInputs.forEach(element => element.checked = false);
}

//This chunk of code prints all the books on screen.
window.addEventListener('load', () => displayBooks());


// With this chunk of code, we make it possible for the form that creates books,
// to appear and disappear at will.

window.addEventListener('load', () => formBookMaker.style.display='none');

bookMaker.addEventListener('click', () => formBookMaker.style.display = 'block');

submitButton.addEventListener('click', () => formBookMaker.style.display = 'none');


//This chunk of code creates a book, using the form provided in the form.
submitButton.addEventListener('click', () =>{
  let readStatus = yes.checked === true? true: false;

  let newBook = new Book(title.value, author.value, numberPages.value, readStatus);
  
  addBookToLibrary(newBook);
  eraseBooks();
  displayBooks();
  cleanForm();
})


