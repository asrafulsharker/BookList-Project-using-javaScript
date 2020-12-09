// Get UI Element
let form = document.querySelector("#book-form");
let booklist = document.querySelector("#book-list");

class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

// UI Class
class UI {
  static addToBooklist(book) {
    let list = document.querySelector("#book-list");
    let row = document.createElement("tr");
    row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td> <a href="#" class="delete">Delete</a> </td>`;
    list.appendChild(row);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  static deleteFromBook(target) {
    if (target.hasAttribute("href")) {
      target.parentElement.parentElement.remove();
      Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
      UI.showAlert("Delete Book!", "success");
    }
  }
}

//localstorage class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    let books = Store.getBooks();
    books.forEach(book => {
      UI.addToBooklist(book);
    });
  }
  static removeBook(isbn){
      let books = Store.getBooks();
      books.forEach((book,index) => {
          if(book.isbn === isbn){
              books.splice(index,1);
          }

      })
      localStorage.setItem('books',JSON.stringify(books));

  }
}



// Add Event Listener

form.addEventListener("submit", NewBook);
booklist.addEventListener("click", removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());
//function

function NewBook(e) {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please Fill all the Fields!", "error");
  } else {
    let book = new Book(title, author, isbn);
    UI.addToBooklist(book);
    UI.clearFields();
    UI.showAlert("Added Book!", "success");
    Store.addBook(book);
  }

  e.preventDefault();
}

function removeBook(e) {
  UI.deleteFromBook(e.target);
  e.preventDefault();
}
