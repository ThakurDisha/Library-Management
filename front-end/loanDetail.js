/*jshint esversion: 6 */
/*jslint browser:true */

const base1_url = "http://127.0.0.1:3000";
var url = base1_url + "/loans";


//DISPLAY LOAN DETAILS//
function displayLoanDetail(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, txt = "";
      console.table(response);
      txt += "<tr><th>" + "Loan ID" + "</th>";
      txt += "<th>" + "Due Date" + "</th>";
      txt += "<th>" + "User ID" + "</th>";
      txt += "<th>" + "Book ID" + "</th></tr>";
      for (x in response) {
        //Formatting the dates using moment.js
        var date = response[x].dueDate;
        var moment_dt = moment(date, "YYYYMMDD").fromNow();
        txt += "<tr><td>" + response[x].id + "</td>";
        txt += "<td>" + moment_dt + "</td>";
        txt += "<td>" + response[x].UserId + "</td>";
        txt += "<td>" + response[x].BookId + "</td></tr>";
      }
      // Displaying the response from server in table form
      document.getElementById("myLoanTable").innerHTML = txt;
    }

  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
displayLoanDetail();



//Search Loan Details By User ID
function searchLoanDetail(){
  var getuserid= document.querySelector('#getuID').value;
  var url = base1_url + "/users/" + getuserid + "/loans";
  if (getuserid === "") {
    alert("Enter Valid User ID!");
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, txt = "";
      console.table(response);
      //Displaying the response in table form
      txt += "<tr><th>" + "User ID" + "</th>";
      txt += "<th>" + "Book ID" + "</th>";
      txt += "<th>" + "Due Date" + "</th>";
      txt += "<th>" + "Loan ID" + "</th></tr>";
      for (x in response) {
        //Formatting Dates using moment.js
        var date = response[x].dueDate;
        var moment_dt = moment(date, "YYYYMMDD").fromNow();
        txt += "<tr><td>" + response[x].UserId + "</td>";
        txt += "<td>" + response[x].BookId + "</td>";
        txt += "<td>" + moment_dt + "</td>";
        txt += "<td>" + response[x].id + "</td></tr>";
      }
      document.getElementById("myLoanTable").innerHTML = txt;
    }
    //Clearing the form input after button click
    document.getElementById("getLoan").reset();

  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


//Give Loan
document.querySelector('#addloan').addEventListener('click', function(){
  var getuserid = document.querySelector('#userid').value;
  var getbookid = document.querySelector('#bookid').value;
  var user_1_url = base1_url + "/users/" + getuserid + "/loans/" + getbookid;
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", user_1_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');
  //Request Parameters
  var due = document.querySelector("#duedate").value;
  var params={
    dueDate: due,
  };
  xhttp.addEventListener('load', function(){
    displayLoanDetail();
  });
  //Clearing the form input after button click
  document.getElementById("giveLoan").reset();

  xhttp.send(JSON.stringify(params));
});


//UPDATE LOAN DUE DATE
document.querySelector('#updateLoan').addEventListener('click', function(){
  var xhttp = new XMLHttpRequest();
  var getloanID = document.querySelector('#putLoanid').value;
  var user_2_url = base1_url + "/loans/" + getloanID ;

  xhttp.open("PUT", user_2_url);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  let duedate = document.querySelector("#putduedate").value;
  let params={
    dueDate: duedate,
  };
  //After the request is finished display the updated loans in database
  xhttp.addEventListener('load', function(){
    displayLoanDetail();
  });
  document.getElementById("putLoan").reset();
  xhttp.send(JSON.stringify(params));
});


//Get the Details of User's Currently Borrowing a Book by entering book ID//
function searchLoanbyid(){
  var xhttp = new XMLHttpRequest();
  var getloan_bookID = document.querySelector('#searchuserLoan').value;
  var query_url = url + "/books/" + getloan_bookID ;

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, y, txt = "";
      console.table(response);
      txt += "<tr><th>" + "Book ID" + "</th>";
      txt += "<th>" + "User ID" + "</th>";
      txt += "<th>" + "Due Date" + "</th></tr>";
      response.forEach(function(loan){
        //Formatting the dates using moment.js
        var date = loan.Loan.dueDate;
        var moment_dt = moment(date, "YYYYMMDD").fromNow();
        txt += "<tr><td>" + loan.id + "</td>";
        txt += "<td>" + loan.Loan.UserId + "</td>";
        txt += "<td>" + moment_dt + "</td></tr>";
      });
      // Displaying the response in table form
      document.getElementById("myLoanTable").innerHTML = txt;
      //Clearing form input after button click
      document.getElementById("searchLoan").reset();
    }
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}


//DELETE LOAN//
window.onload=function(){
  document.getElementById('deleteLoan').addEventListener('click', function(){
    var xhttp = new XMLHttpRequest();
    var getloanId= document.querySelector('#getLoanId').value;
    var url3= url + '/' + getloanId;

    xhttp.open("DELETE", url3);
    var alertMsg;
    //Alerting the user to confirm data deletion
    if (confirm("Are You Sure You want to Remove this Loan?")){
      xhttp.addEventListener('load', function(){
        displayLoanDetail();
      });
      xhttp.send();
    }
    else{
      alertMsg = alert("Loan Not removed");
    }
    document.getElementById("deleteLoanDetails").reset();
  });
};



//Toggle Button Functions//

function myLoanFunction() {
  var x = document.getElementById("getLoan");
  var b = document.getElementById("toggleLoanDetails");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Loan Details";
  }
}
function allLoanFunction() {
  var x = document.getElementById("getallLoan");
  var b = document.getElementById("toggleallLoanDetails");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "All Loans";
  }
}
function myLoanFunction2() {
  var x = document.getElementById("giveLoan");
  var b = document.getElementById("toggleCreateLoan");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Create New Loan";
  }
}
function myLoanFunction3() {
  var x = document.getElementById("putLoan");
  var b = document.getElementById("toggleUpdateLoan");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Update Loan";
  }
}
function myLoanFunction4() {
  var x = document.getElementById("searchLoan");
  var b = document.getElementById("toggleSearchLoan");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Search Loan";
  }
}
function myLoanFunction5() {
  var x = document.getElementById("deleteLoanDetails");
  var b = document.getElementById("toggleDeleteLoan");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Delete Loan";
  }
}
