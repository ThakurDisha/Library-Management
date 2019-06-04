/*jshint esversion: 6 */
const base1_url = "http://127.0.0.1:3000";
var url= base1_url + "/books";



//DISPLAY BOOK DETAILS//
function displayBookDetail(){
  var url= base1_url + "/books";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x , txt = "";
      console.table(response);
      txt += "<tr><th>" + "Book ID" + "</th>";
      txt += "<th>" + "Book Title" + "</th>";
      txt += "<th>" + "Book ISBN" + "</th>";
      txt += "<th>" + "Book Quantity" + "</th></tr>";
      for (x in response) {
        // Displaying the response from server in table format
        txt += "<tr><td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].title + "</td>";
        txt += "<td>" + response[x].isbn + "</td>";
        txt += "<td>" + response[x].quantity + "</td></tr>";
      }
      document.getElementById("myBookTable").innerHTML = txt;
    }
    // Clearing the form input after button click
    document.getElementById("getBook").reset();
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
displayBookDetail();



//ADD BOOK//
// when the user clicks the button, make a POST request to add title,isbn and quantity of book
document.querySelector('#addBook').addEventListener('click', function(){
  var book_url = base1_url + "/books/";
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", book_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');
  // Input taken from user for book title, isbn and quantity
  var book = document.querySelector("#newBook").value;
  var isbn = document.querySelector("#bookIsbn").value;
  var quantity = document.querySelector("#newBooknum").value;
  var params={
    title: book,
    isbn: isbn,
    quantity: quantity
  };
  // After the request is finished display the updated book list in database
  xhttp.addEventListener('load', function(){
    displayBookDetail();
  });
  // Clearing form input after button is clicked
  document.getElementById("Addb").reset();
  xhttp.send(JSON.stringify(params));
});




//ADD BOOK AUTHOR//
// when the user clicks the button, make a POST request to add book author
document.querySelector('#addBookAuthor').addEventListener('click', function(){
  // Taking book ID value from user and adding it to url query
  var getBookAuthor = document.querySelector('#Book_ID').value;
  var book_url = base1_url + "/books/" + getBookAuthor + "/authors";
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", book_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');
  // Taking input from user and sending the value as request parameters
  var book_author = document.querySelector("#bookAuthor").value;
  var authorWebsite = document.querySelector("#Authorwebsite").value;
  var params={
    name: book_author,
    website: authorWebsite
  };
  // Loading the Book list after the request is finished
  xhttp.addEventListener('load', function(){
    displayBookDetail();
  });
  document.getElementById("Addb").reset();
  xhttp.send(JSON.stringify(params));
});



//UPDATE BOOK DETAILS//
document.querySelector('#updatebookDetail').addEventListener('click', function(){
  var xhttp = new XMLHttpRequest();
  // Taking book ID value from user and adding it to url query
  var getbookID = document.querySelector('#renameBookID').value;
  var user_2_url = url + "/" + getbookID ;
  xhttp.open("PUT", user_2_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');
  var name = document.querySelector("#renameUser").value;
  var isbn = document.querySelector("#re-enter_isbn").value;
  var update_quantity = document.querySelector("#re-enter_quantity").value;
  let params={
    title: name,
    isbn: isbn,
    quantity: update_quantity,
  };
  // Loading the updated book list after the request is finished
  xhttp.addEventListener('load', function(){
    displayBookDetail();
  });
  // Clearing form input after the button is clicked
  document.getElementById("updateBook").reset();
  xhttp.send(JSON.stringify(params));

});



//Search Book//

//Search Book by Title
function searchBookbyTitle(){
  var xhttp = new XMLHttpRequest();
  // Taking book title value from user and adding it to url query for searching
  var getName = document.querySelector('#searchBookTitle').value;
  var query_url = base1_url + "/search?type=book&title=" + getName ;
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, y, txt = "";
      console.table(response);
      txt += "<tr><th>" + "Book ID" + "</th>";
      txt += "<th>" + "Book Title" + "</th>";
      txt += "<th>" + "Book ISBN" + "</th>";
      txt += "<th>" + "Book Quantity" + "</th></tr>";
      for (x in response) {
        txt += "<tr><td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].title + "</td>";
        txt += "<td>" + response[x].isbn + "</td>";
        txt += "<td>" + response[x].quantity + "</td></tr>";
      }
      document.getElementById("myBookTable").innerHTML = txt;
    }
    document.getElementById("searchBook").reset();
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}

//Search Book by Author ID//
function searchBookbyauthorID(){
  var xhttp = new XMLHttpRequest();
  // Taking author ID value from user and adding it to url query
  var getauthor_id = document.querySelector('#searchbookbyAuthor_id').value;
  var query_url = base1_url + "/authors/books/" + getauthor_id ;
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, y, txt = "";
      console.table(response);
      txt += "<tr><th>" + "Author ID" + "</th>";
      txt += "<th>" + "Book ID" + "</th>";
      txt += "<th>" + "Book Title" + "</th>";
      txt += "<th>" + "Book ISBN" + "</th>";
      txt += "<th>" + "Book Quantity" + "</th></tr>";
      response.forEach(function(author){
        author.Books.forEach(function(detail){
          txt += "<tr><td>" + author.id + "</td>";
          txt += "<td>" + detail.id + "</td>";
          txt += "<td>" + detail.title + "</td>";
          txt += "<td>" + detail.isbn + "</td>";
          txt += "<td>" + detail.quantity + "</td></tr>";
        });
      });
      document.getElementById("myBookTable").innerHTML = txt;
      document.getElementById("searchBook").reset();
    }
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}



//REMOVE BOOK//
window.onload=function(){
  document.getElementById('removeB').addEventListener('click', function(){
    var xhttp = new XMLHttpRequest();
    var getId= document.querySelector('#getBookId').value;
    var url3= url + '/' + getId;

    xhttp.open("DELETE", url3);
    var alertMsg;
    // Alerting the user to confirm deletion
    if (confirm("Are You Sure You want to Remove the Book?")){

      xhttp.addEventListener('load', function(){
        displayBookDetail();
      });
      xhttp.send();
    }
    else{
      alertMsg = alert("Book not removed!");
    }
    document.getElementById("removeBook").reset();
  });
};


//Toggle Button Functions//
function myBookFunction() {
  var x = document.getElementById("getBook");
  var b = document.getElementById("toggleBookDetails");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Book Details";
  }
}

function bookAdd() {
  var x = document.getElementById("Addb");
  var b = document.getElementById("toggleAddBook");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Add Book";
  }
}

function updateBookdets() {
  var x = document.getElementById("updateBook");
  var b = document.getElementById("toggleUpdateBook");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Update Book";
  }
}

function bookSearch() {
  var x = document.getElementById("searchBook");
  var b = document.getElementById("toggleSearchBook");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Search Book";
  }
}

function bookRemove() {
  var x = document.getElementById("removeBook");
  var b = document.getElementById("toggleRemoveBook");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Remove Book";
  }
}
