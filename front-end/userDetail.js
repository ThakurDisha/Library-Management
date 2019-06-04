/*jshint esversion: 6 */


const base1_url = "http://127.0.0.1:3000";
var url= base1_url + "/users";


//DISPLAY USER DETAILS//
function displayDetail(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, txt = "";
      console.table(response);
      txt += "<tr><th>" + "User" + "</th>";
      txt += "<th>" + "User ID" + "</th>";
      txt += "<th>" + "User Barcode" + "</th>";
      txt += "<th>" + "User Member Type" + "</th></tr>";
      for (x in response) {
        txt += "<tr><td>" + response[x].name + "</td>";
        txt += "<td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].barcode + "</td>";
        txt += "<td>" + response[x].memberType + "</td></tr>";
      }
      document.getElementById("myTable").innerHTML = txt;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
displayDetail();




//SEARCH USER//

//SEARCH USER BY NAME//
function searchDetailbyName(){
  var xhttp = new XMLHttpRequest();
  // Taking value for user name from the user and adding it to the url
  var getName = document.querySelector('#searchUserName').value;
  var query_url = base1_url + "/search?type=user&name=" + getName ;

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, y, txt = "";
      console.table(response);
      txt += "<tr><th>" + "User" + "</th>";
      txt += "<th>" + "User ID" + "</th>";
      txt += "<th>" + "User Barcode" + "</th>";
      txt += "<th>" + "User Member Type" + "</th></tr>";
      for (x in response) {
        txt += "<tr><td>" + response[x].name + "</td>";
        txt += "<td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].barcode + "</td>";
        txt += "<td>" + response[x].memberType + "</td></tr>";
      }
      document.getElementById("myTable").innerHTML = txt;
      // Clearing the form input after the button is clicked
      document.getElementById("searchUser").reset();
    }
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}


//SEARCH USER BY BARCODE//
function searchDetailbyBarcode(){
  var xhttp = new XMLHttpRequest();
  // Taking the user barcode valye from user and adding it to the url
  var getBarcode = document.querySelector('#searchUserBarcode').value;
  var query_url = base1_url + "/search?type=user&barcode=" + getBarcode ;

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var response = JSON.parse(this.responseText);
      var x, txt = "";
      console.table(response);
      txt += "<tr><th>" + "User" + "</th>";
      txt += "<th>" + "User ID" + "</th>";
      txt += "<th>" + "User Barcode" + "</th>";
      txt += "<th>" + "User Member Type" + "</th></tr>";
      for (x in response) {
        txt += "<tr><td>" + response[x].name + "</td>";
        txt += "<td>" + response[x].id + "</td>";
        txt += "<td>" + response[x].barcode + "</td>";
        txt += "<td>" + response[x].memberType + "</td></tr>";
      }
      document.getElementById("myTable").innerHTML = txt;
      // Clearing the form input after button is clicked
      document.getElementById("searchUser").reset();
    }
  };
  xhttp.open("GET", query_url, true);
  xhttp.send();
}



//ADD USER//
// when the user clicks the button, make a POST request to add user
document.querySelector('#addUser').addEventListener('click', function(){
  var user_1_url = base1_url + "/users/";
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", user_1_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');

  // Taking the request parameters value fro the user
  var name = document.querySelector("#newUser").value;
  var barcode = document.querySelector("#newUserBarcode").value;
  var member_type = document.querySelector("#newUserType").value;
  var params={
    name: name,
    barcode: barcode,
    memberType: member_type,
  };
  // Loading the user table after the request is finished
  xhttp.addEventListener('load', function(){
    displayDetail();
  });
  document.getElementById("createUser").reset();
  xhttp.send(JSON.stringify(params));
});



//UPDATE USER//
document.querySelector('#updateUserName').addEventListener('click', function(){
  var xhttp = new XMLHttpRequest();
  // Taking the user ID vale from the user and adding it to the url
  var getuserID = document.querySelector('#renameUserID').value;
  var user_2_url = base1_url + "/users/" + getuserID ;

  xhttp.open("PUT", user_2_url);

  xhttp.setRequestHeader('Content-Type', 'application/json');
  // Takng the update request parameters from the user
  let name = document.querySelector("#renameUser").value;
  let barcode = document.querySelector("#re-enter_barcode").value;
  let member_type = document.querySelector("#re-enter_membertype").value;
  let params={
    name: name,
    barcode: barcode,
    memberType: member_type,
  };
  // Loading the updated user table after the request is finished
  xhttp.addEventListener('load', function(){
    displayDetail();
  });
  document.getElementById("updateUser").reset();
  xhttp.send(JSON.stringify(params));

});



//DELETE USER//
window.onload=function(){
  document.getElementById('deleteUser').addEventListener('click', function(){
    var xhttp = new XMLHttpRequest();
    // Taking the User ID from the user and adding it to the url
    var getId= document.querySelector('#getUserId').value;
    var url3= url + '/' + getId;

    xhttp.open("DELETE", url3);
    var alertMsg;
    // Alerting the user to confirm User details deletion
    if (confirm("Are You Sure You want to Delete the User?")){
      xhttp.addEventListener('load', function(){
        displayDetail();
      });
      xhttp.send();
    }
    else{
      alertMsg = alert("User Not deleted");
    }
    // Clearing the form input after the button is clicked
    document.getElementById("deleteUserDetails").reset();
  });
};


//Toggle Button Functions//

function myFunction() {
  var x = document.getElementById("get");
  var b = document.getElementById("toggleUserDetails");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "User Details";
  }
}
function myFunction2() {
  var x = document.getElementById("createUser");
  var b = document.getElementById("toggleCreateUser");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Create New User";
  }
}
function myFunction3() {
  var x = document.getElementById("updateUser");
  var b = document.getElementById("toggleUpdateUser");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Update User";
  }
}
function myFunction4() {
  var x = document.getElementById("searchUser");
  var b = document.getElementById("toggleSearchUser");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Search User";
  }
}
function myFunction5() {
  var x = document.getElementById("deleteUserDetails");
  var b = document.getElementById("toggleDeleteUser");
  if (x.style.display !== "block") {
    x.style.display = "block";
    b.childNodes[0].nodeValue = "Hide Content";
  } else {
    x.style.display = "none";
    b.childNodes[0].nodeValue = "Delete User";
  }
}
