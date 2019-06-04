/*jshint esversion: 6 */
const basex_url = "http://127.0.0.1:3000";
var url= basex_url + "/authors";


// Display Author Details//
function displayAuthorDetail() {
  var xhttp = new XMLHttpRequest();
  var row = document.getElementById("myAuthorTable");
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      console.table(response);
      var x, txt = "";
      // https://stackoverflow.com/questions/18395976/how-to-display-a-json-array-in-table-format
      //learnt to put JSON response in table format from above link
      txt += "<tr><th>" + "Author ID" + "</th>";
      txt += "<th>" + "Author Name" + "</th>";
      txt += "<th>" + "Author Website" + "</th></tr>";
      for (x in response) {
        txt += "<tr><td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].name + "</td>";
        txt += "<td>" + response[x].website + "</td>";
      }
      // Displaying the reponse from the server in table format
      document.getElementById("myAuthorTable").innerHTML = txt;
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}
displayAuthorDetail();



//ADD AUTHOR//
// when the user clicks the button, make a POST request to add user
document.querySelector('#addAuthor').addEventListener('click', function(){
  var user_1_url = url;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", user_1_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');

  // Taking the request parameters value from the user
  var name = document.querySelector("#newAuthor").value;
  var website = document.querySelector("#newAuthorWebsite").value;
  var params={
    name: name,
    website: website,
  };
  // Loading the author table after the request is finished
  xhttp.addEventListener('load', function(){
    displayAuthorDetail();
  });
  // Clearing form input after the button is clicked
  document.getElementById("createAuthor").reset();
  xhttp.send(JSON.stringify(params));
});



//ADD Author's BOOK//

// learnt to send post request parameters from server_test.html file of server code
// when the user clicks the button, make a POST request to add book title and isbn
document.querySelector('#addBook').addEventListener('click', function(){
  // Taking the input from user for the value of author ID and adding it to url
  var getAuthorid = document.querySelector('#Author_ID').value;
  var book_url = url + "/" + getAuthorid + "/books";
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", book_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');

  // Taking the input value from user as request parameters
  var book = document.querySelector("#newBook").value;
  var isbn = document.querySelector("#bookIsbn").value;
  var b_quantity = document.querySelector("#bookquant").value;
  var params={
    bookTitle: book,
    bookISBN: isbn,
    bookQuantity: b_quantity,
  };
  // Loading the author table after request is finished
  xhttp.addEventListener('load', function(){
    displayAuthorDetail();
  });
  // Clearing the form input after the button is clicked
  document.getElementById("createAuthor").reset();
  xhttp.send(JSON.stringify(params));
});



//DELETE AUTHOR//
window.onload=function(){
  document.getElementById('deleteAuthor').addEventListener('click', function(){
    var xhttp = new XMLHttpRequest();
    // Taking input from user for author ID value and adding it to url
    var getId= document.querySelector('#getAuthorId').value;
    var url3= url + '/' + getId;
    xhttp.open("DELETE", url3);
    var alertMsg;

    // Alerting the user to confirm author deletion
    if (confirm("Are you sure you want to Delete this Author?")){

      xhttp.addEventListener('load', function(){
        displayAuthorDetail();
      });
      xhttp.send();
    }
    else{
      alertMsg = alert("Author not Deleted!");
    }
    // Clearing the form input after button click
    document.getElementById("deleteAuthorDetails").reset();
  });
};


//UPDATE AUTHOR//
document.querySelector('#update_author').addEventListener('click', function(){
  var xhttp = new XMLHttpRequest();
  // Taking the input from user for Author ID value and adding it to the url
  var getauthorID = document.querySelector('#renameAuthorID').value;
  var user_2_url = url +"/" + getauthorID ;

  xhttp.open("PUT", user_2_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');
  // Taking the values of request parameters from the user
  let name = document.querySelector("#renameAuthor").value;
  let website_author = document.querySelector("#re-enter_website").value;
  let params={
    name: name,
    website: website_author
  };
  // Loading the updated author table after request is finished
  xhttp.addEventListener('load', function(){
    displayAuthorDetail();
  });
  // Clearing form input after button click
  document.getElementById("updateAuthor").reset();
  xhttp.send(JSON.stringify(params));
});




//SEARCH AUTHOR BY NAME//
function searchDetailbyName(){
  var xhttp = new XMLHttpRequest();
  // Taking the value of author name from user and adding it to url
  var getName = document.querySelector('#searchAuthorName').value;
  var query_url = basex_url + "/search?type=author&name=" + getName ;

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, y, txt = "";
      txt += "<tr><th>" + "Author ID" + "</th>";
      txt += "<th>" + "Author Name" + "</th>";
      txt += "<th>" + "Author Website" + "</th></tr>";
      for (x in response) {
        txt += "<tr><td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].name + "</td>";
        txt += "<td>" + response[x].website + "</td>";
      }
      document.getElementById("myAuthorTable").innerHTML = txt;
    }
    // Clearing form input after button is clicked
    document.getElementById("searchAuthor").reset();
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}


//Search Author by Book ID
function searchBookbyBookID(){
  var xhttp = new XMLHttpRequest();
  // Taking the value of book ID from user and adding it to the url
  var getbook_id = document.querySelector('#searchbookbyBook_id').value;
  var query_url = basex_url + "/books/authors/" + getbook_id ;
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, y, txt = "";
      console.table(response);
      txt += "<tr><th>" + "Book ID" + "</th>";
      txt += "<th>" + "Book Title" + "</th>";
      txt += "<th>" + "Author ID" + "</th>";
      txt += "<th>" + "Author Name" + "</th>";
      txt += "<th>" + "Author Website" + "</th></tr>";
      response.forEach(function(book){
        book.Authors.forEach(function(detail){
          // Looping through Json response array
          txt += "<tr><td>" + book.id + "</td>";
          txt += "<td>" + book.title + "</td>";
          txt += "<td>" + detail.id + "</td>";
          txt += "<td>" + detail.name + "</td>";
          txt += "<td>" + detail.website + "</td></tr>";
        });
      });
      document.getElementById("myAuthorTable").innerHTML = txt;
      // Clearing the form input after the button is clicked
      document.getElementById("searchAuthor").reset();

    }
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}


//Toggle Button Functions//

function myAuthorFunction() {
  var x = document.getElementById("getAuthor");
  var b = document.getElementById("toggleAuthorDetails");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Author Details";
  }
}

function myAuthorFunction2() {
  var x = document.getElementById("createAuthor");
  var b = document.getElementById("toggleCreateAuthor");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Create New Author";
  }
}

function deleteAuthorFunction() {
  var x = document.getElementById("deleteAuthorDetails");
  var b = document.getElementById("toggleDeleteAuthor");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Delete Author";
  }
}

function update_Author_detail() {
  var x = document.getElementById("updateAuthor");
  var b = document.getElementById("toggleUpdateAuthor");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Update Author";
  }
}

function search_author_name() {
  var x = document.getElementById("searchAuthor");
  var b = document.getElementById("toggleSearchAuthor");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Search Author";
  }
}
