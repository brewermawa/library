let myLibrary = [];
const books = document.querySelector("#book-grid");
let addBookButton = document.querySelector("#show-form");
let saveBookButton = document.querySelector("#save-book");
let addBookForm = document.querySelector(".add-book");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleRead = function() {
        this.read = !this.read;
    }
}

//Temporary book instances, this will be removed
const book1 = new Book("Fair Warning", "Michael Connelly", 396, true);
const book2 = new Book("Winter of the World", "Ken Follett", 1027, false)
const book3 = new Book("The Boy from the Woods", "Harlan Coben", 405, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function addLibaryToGrid() {
    books.innerHTML = "";
    for (let b = 0; b < myLibrary.length; b++) {
        let card = document.createElement("div");
        card.className = "card";

        for (const key in myLibrary[b]) {
            let bookInfo = document.createElement("div");
            let info = document.createElement("div");
            let data = document.createElement("div");

            if (typeof(myLibrary[b][key]) === "function") {
                continue;
            }
            else if (typeof(myLibrary[b][key]) === "boolean") {
                bookInfo.className = "book-read";
                info.innerHTML = key.charAt(0).toUpperCase() + key.slice(1) + " (click to toggle): ";
                info.className = "info";
                data = document.createElement("span");
                data.className = "material-icons";

                bookInfo.style.cursor = "pointer";

                bookInfo.addEventListener("click", function() {
                    toggleRead(b);
                });
                
                if (myLibrary[b][key]) {
                    data.textContent = "done";
                }
                else {
                    data.textContent = "close";
                }
            }
            else {
                bookInfo.className = "book-info";
                info.className = "info"; 
                data.className = "data";

                info.innerHTML = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
                data.innerHTML = myLibrary[b][key];
            }
            
            bookInfo.appendChild(info);
            bookInfo.appendChild(data);
            card.appendChild(bookInfo);
        }

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function() {
            deteleBook(b);
        });
        card.appendChild(deleteButton);

        books.appendChild(card);
    }
}

function addBookToLibrary(book) {
    let newBook = new Book;
    let bookTitle = document.querySelector("#book-title");
    let bookAuthor = document.querySelector("#book-author");
    let bookPages = document.querySelector("#book-pages");

    newBook.title = bookTitle.value;
    newBook.author = bookAuthor.value;
    newBook.pages = bookPages.value;
    newBook.read = false;

    console.log(newBook)

    myLibrary.push(newBook);
    console.log(myLibrary);

    addLibaryToGrid();

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";

    addBookForm.style.display = "none";
    addBookButton.style.display = "block";
    saveBookButton.style.display = "none";
}

function toggleRead(bookIndex) {
    let book = myLibrary[bookIndex];
    book.read = !book.read;

    addLibaryToGrid();
}

function deteleBook(bookIndex) {
    console.log(bookIndex);
    console.log(myLibrary);
    myLibrary.splice(bookIndex, 1);
    console.log(myLibrary);
    addLibaryToGrid();
}

addLibaryToGrid();

addBookButton.addEventListener("click", () => {
    addBookForm.style.display = "block";
    addBookButton.style.display = "none";
    saveBookButton.style.display = "block";
});

saveBookButton.addEventListener("click", addBookToLibrary);

