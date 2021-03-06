// 1: Book Class : To Represent a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// for UI class: handle ui task
   class UI{
       static displayBooks(){
           
         const books = Store.getBooks();

         books.forEach((book) => UI.addBookToList(book));
       }
      static addBookToList(book) {
          const list = document.querySelector('#book-list');
            
          const row = document.createElement('tr');

          row.innerHTML= `
          <td>${book.title}</td> 
          <td>${book.author}</td> 
          <td>${book.isbn}</td> 
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td> 
          `;

          list.appendChild(row);
      }
      
      // TO remove the saved book list added in #book-list id section

      static deleteBook(el){
          if(el.classList.contains('delete')){
              el.parentElement.parentElement.remove();
          }
      }


    static showAlert(message, className){
        // creating a div and ebedding in dom through javascript
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container  = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // make alert vanish in 3 second
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

// method to clear form data after it got submitted
// Grab each value and clear it and set the value to nothing
   static clearField(){
       document.querySelector('#title').value = '';
       document.querySelector('#author').value = '';
       document.querySelector('#isbn').value = '';
   }
   

   }

   // 2: Store class: Handles Storage
   class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }


   // 3: Event: Display Books
  // As soon as the DOM content loaded we want to call UI.displayBOOks

    document.addEventListener('DOMContentLoaded', UI.displayBooks);

   // 4: Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get form Values

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === ''){
       UI.showAlert('please fill in all fields', 'danger'); 
    }
    else{
        
    //Instatiate Book
    const book = new Book(title, author, isbn);
    //  console.log(book);

    // Add Book to UI

    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    //show success message
    UI.showAlert('Book Added', 'success');

      // clear field method call upon UI class

      UI.clearField();

    }


  });
   

// 5: Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) =>
 {
     // Remove book from UI
 UI.deleteBook(e.target);

 // remove book from store
 Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 UI.showAlert('Book Removed', 'success');

});