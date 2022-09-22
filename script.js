function Book(title, author, numberPages, read){
  this.title = title;
  this.author = author;
  this.pages = numberPages;
  this.read = read;
}

Book.prototype.info = function(){
  let returnS = `${this.title} by ${this.author}, ${this.pages} pages, `;
  return this.read === true? returnS + 'read.': returnS + 'not read yet.';
}