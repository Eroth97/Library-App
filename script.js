let myLibrary = [new Book('book1', 'J.R.R.Tolkien', 100, true), new Book('book2', 'J.R.R.Tolkien', 100, false), new Book('book3', 'J.R.R.Tolkien', 100, false)];

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
let numberOfBooks = 0;

let author = document.getElementById('author');
let title = document.getElementById('title');
let numberPages = document.getElementById('number-pages');
let yes = document.getElementById('yes');
let no = document.getElementById('no');

let textInputs = document.querySelectorAll('.options');
let buttonInputs = document.querySelectorAll('.buttons-options')

let library = document.getElementById('library');
let formBookMaker = document.getElementById('form-book-maker');
let submitButton = document.getElementById('submit-button');


//This chunk of code prints all the books on screen.
window.addEventListener('load', () => displayBooks());


//This chunk of code creates a book, using the information provided by the user.
submitButton.addEventListener('click', () =>{
  if (isValid(author.value, title.value, numberPages.value)){
    let readStatus = yes.checked === true? true: false;

    let newBook = new Book(title.value, author.value, numberPages.value, readStatus);
  
    addBookToLibrary(newBook);
    eraseBooks();
    displayBooks();
    cleanForm();
  } else{
    let label_inputs = document.querySelectorAll('.label-input');
    printInfoEmptyPlaces(label_inputs);
  }
})

//This function returns false if the form is incomplete.

function isValid(a, t, numP){
  return a === ''? false: 
         t === ''? false:
         numP === ''? false: true; 
}

//This function iterates over all form elements and prints the invalid message where needed.

function printInfoEmptyPlaces(iterator){
  iterator.forEach((element) =>{
    if (element.children[1].value === ''){
      let newParagraph = document.createElement('p');
      newParagraph.textContent = 'This space is needed';
      newParagraph.setAttribute('style', 'color: var(--red);');
      newParagraph.setAttribute('class', 'special-paragraph');
      element.insertBefore(newParagraph, element.children[1]);
    }
  }) 
}

//Functionality behind the pseudo-submission system.

function addBookToLibrary(book){
  myLibrary.push(book);
};

function eraseBooks(){
  numberOfBooks = 0;
  let bookCards = document.querySelectorAll('.book');
  bookCards.forEach(element => library.removeChild(element));
}

function displayBooks(){
  myLibrary.forEach((element) =>{
    numberOfBooks++;
    let bookCard = document.createElement('div');

    bookCard.setAttribute('id', `book ${numberOfBooks}`);

    // let eraseButton = createEraseButton(numberOfBooks);
    // let readButton = createReadButton(numberOfBooks);

    let buttonsDiv = createButtonsDiv(numberOfBooks);

    bookCard.classList.add('book');
    for (key in element){
      let prop = document.createElement('p');
      if (key === 'read'){
        let bookReadStatus = element[key] === false? 'No': 'Yes';
        prop.textContent = `${capitalizeFirstWord(key)}:  ${bookReadStatus}`;
      }
      else prop.textContent = `${capitalizeFirstWord(key)}:  ${element[key]}`;
      
      bookCard.appendChild(prop);
      // let buttonsDiv = document.createElement('div');
      // buttonsDiv.setAttribute('class', 'buttons');

      // buttonsDiv.appendChild(eraseButton);
      // buttonsDiv.appendChild(readButton);

      bookCard.appendChild(buttonsDiv);
    }
    library.appendChild(bookCard);
  })
};


function cleanForm(){
  textInputs.forEach(element => element.value = '');
  buttonInputs.forEach(element => element.checked = false);
}

//Functionality behind display Books function.

//Functionality behind buttons div. 

function createButtonsDiv(num){
  let buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('class', 'buttons');

  let eraseButton = createEraseButton(num);
  let readButton = createReadButton(num);
  
  buttonsDiv.appendChild(eraseButton);
  buttonsDiv.appendChild(readButton);

  return buttonsDiv;
}

//Functionality Erase Buttons
function createEraseButton(num){
  let button = document.createElement('button');
  button.textContent = 'Erase';
  button.setAttribute('class', 'erase-button');
  button.setAttribute('id', `erase-book-${num}`);
  button.addEventListener('click', () => {
    updateLibrary(num);
    updateBookCardsIDs();        
  });
  return button;
}

function updateLibrary(num){
  let bookCard = document.getElementById(`book ${num}`);
  library.removeChild(bookCard);
  num === myLibrary.length? myLibrary = myLibrary.slice(0, num-1): 
                              myLibrary = myLibrary.slice(0, num).concat(myLibrary.slice(num + 1));
}

function updateBookCardsIDs(){
  numberOfBooks = 0;
  let books = document.querySelectorAll('.book');
  books.forEach((book) => {
    numberOfBooks++;
    book.setAttribute('id', `book ${numberOfBooks}`);

    let button = book.children[4].children[0];
    button.setAttribute('id', `erase-book-${numberOfBooks}`);
    })
}

//Functionality Read Buttons
function createReadButton(num){
  let button = document.createElement('button');
  button.textContent = 'Now Read';
  button.setAttribute('class', 'read-button');
  myLibrary[num - 1].read === false? button.disabled = false: button.disabled = true; 
  button.addEventListener('click', () => {
    myLibrary[num - 1].read = true;
    button.disabled = true;
    
    let bookCard = document.getElementById(`book ${num}`);
    bookCard.children[3].textContent = 'Read: Yes';
  });
  return button;
}


//Non native Functions
function capitalizeFirstWord(word){
  return word[0].toUpperCase() + word.slice(1);
}

