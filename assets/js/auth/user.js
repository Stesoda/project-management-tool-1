var preventDisplay = document.getElementById("Register");
if (preventDisplay) {
  preventDisplay.addEventListener("click", (e) => {
    //prevent window reload
    e.preventDefault();
  });
}
// token sytem
var tokeniser = document.getElementById("Token");
var token = {
  token: "eHAiOjE1ODA0NTU3Nzd9.i3rOwqV1Bc-JEAaxT7lHZHUlDuFf9ADVP7qjy50WqT0",
};

// user array
var userExist = new Object();
var users = JSON.parse(localStorage.getItem("users"));

if (users == null || users == undefined) {
  users = [];
}
var saveDetails = JSON.parse(localStorage.getItem("saveDetails"));

if (saveDetails == null || saveDetails == undefined) {
  saveDetails = [];
}

// redirect locations
var dasboardHome = "../views/dashboard/temp.html";
var indexPage = "../../../index.html";

// activeUser
var activeUsers = JSON.parse(localStorage.getItem("activeUsers"));

if (activeUsers == null || activeUsers == undefined) {
  activeUsers = [];
}

var passId = 0;
var passEmail = "";
var passWord = "";
/**
 * Registers a particular user
 */
function register() {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  let userConfirmPassword = document.getElementById("retypePassword").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let role = document.getElementById("role").value;

  // get user email
  let userExist = users.find((user) => user.email == userEmail);

  console.log(userExist);
  // check if email already exists
  if (
    userEmail === "" ||
    userPassword === "" ||
    userConfirmPassword === "" ||
    firstName === "" ||
    lastName === "" ||
    role === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Fields cannot be empty",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    if (userExist == undefined || userExist == null) {
      // check if password matches
      if (userPassword === userConfirmPassword) {
        let userId;
        for (let i = 0; i <= users.length; i++) {
          userId = i;
        }

        newUser = {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          image: "",
          email: userEmail,
          password: userPassword,
          role: role,
          status: "Enable",
        };

        passEmail = userEmail;
        passId = userId;
        password = userPassword;
        //userExist.map();

        //console.log(newUser);

        users.push(newUser);
        activeUsers.push(token);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
        localStorage.setItem("saveDetails", JSON.stringify(activeUsers));
        alert(users.status)
        location.href = dasboardHome;
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        Swal.fire({
          title: "Generating Your experience...",
          footer: "Thank you for choosing Bascom projects",
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 5000,
          onOpen: () => {
            swal.showLoading();
          },
        }).then(() => (location.href = "../views/dashboard/temp.html"));
      } else {
        Swal.fire({
          icon: "error",
          title: "password mismatch",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "user already exist",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}

function continueSignup(e) {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let role = document.getElementById("role").value;

  let addedUser = users.find((user) => user.email == passEmail);
  alert("adderUser");

  addedUser = {
    id: saveDetails.id,
    firstName: firstName,
    lastName: lastName,
    image: "",
    email: saveDetails.email,
    password: saveDetails.password,
    role: role,
  };
  getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  getCurrentUser[saveDetails.id] = addedUser;

  localStorage.setItem("users", JSON.stringify(getCurrentUser));

  localStorage.setItem("currentUser", JSON.stringify(addedUser));
  location.href = dasboardHome;
  // localStorage.removeItem("saveDetails");
}
// email
// password
// role
// firstname
// lastname

/**
 * logs a registered user in
 */
function login() {
  var userEmail = document.getElementById("loginEmail").value;
  let userPassword = document.getElementById("loginPassword").value;
  status = users.status;
  alert(status)

  let userExist = users.find((user) => userEmail == user.email);
  let passwordExist = users.find((user) => userPassword === user.password);
  if (userEmail === "" || userPassword === "") {
    Swal.fire({
      icon: "error",
      title: "Fields cannot be empty",
      showConfirmButton: false,
      timer: 2000,
    });
  } else if (userExist && passwordExist) {
    if(users.status == "Disable") {
      Swal.fire({
        icon: "error",
        title: "Sorry, this account has been deactivated, contact your Administrator.",
        showConfirmButton: false,
        timer: 2000,
      });
    }else {
    activeUsers.push(token);

    Swal.fire({
      icon: "success",
      title: "Please wait...",
      footer: "Thank you for choosing Bascom projects",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 4000,
      onOpen: () => {
        swal.showLoading();
      },
    }).then(() => (location.href = "../views/dashboard/temp.html"));

    localStorage.setItem("activeUsers", JSON.stringify(activeUsers));

    localStorage.setItem("currentUser", JSON.stringify(userExist));
    }
  } else if (userExist == undefined || passwordExist == undefined) {
    let error = "Wrong Email and/or Password";
    Swal.fire({
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function getImage() {}

/**
 * logs out a registered user
 */
function logout() {
  activeUsers.pop();
  Swal.fire({
    title: "Logging Out...",
    footer: "Thank you for choosing Bascom projects",
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 4000,
    onOpen: () => {
      swal.showLoading();
    },
  }).then(() => (location.href = "../../index.html"));
  localStorage.setItem("activeUsers", JSON.stringify(activeUsers));

  localStorage.removeItem("currentTask");
  localStorage.removeItem("currentProject");
  localStorage.removeItem("currentUser");
}

/**
 *
 * @param {string} alert_id Div Id of alert box
 * @param {string} alert_type type of alert to show
 * @param {string} alert_message message to display
 * @example alertBox("alert_id", "danger", "danger alert")
 */
function alertBox(alert_id, alert_type, alert_message) {
  alerts = document.getElementById(alert_id);
  if (alerts != null) {
    alerts.innerHTML = alert_message;
  }
  alerts.classList.add(`alert-${alert_type}`);
}

var userName = document.getElementById("userName");
var userRole = document.getElementById("userRole");

// document.onload = () => {
var getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

// };

//edit trigger

function editTrigger() {
  // let currentUser = users.find((user) => {
  let editUsers = users.find((user) => getCurrentUser.email == user.email);
  // });
  let firstname = document.getElementById("editFirstName");
  let lastname = document.getElementById("editLastName");
  let role = document.getElementById("editRole");
  let email = document.getElementById("exampleInputEmail1");

  $("#exampleModalLong").on("shown.bs.modal", function () {
    // alert("The modal is fully shown.");
    firstname.value = editUsers.firstName;
    lastname.value = editUsers.lastName;
    role.value = editUsers.role;
    email.value = editUsers.email;
  });
}

function editUser() {
  // let currentUser = users.find((user) => {
  let editUsers = users.find((user) => getCurrentUser.email == user.email);
  let editUserIndex = users.indexOf(editUsers);
  // // });

  let firstname = document.getElementById("editFirstName").value;
  let lastname = document.getElementById("editLastName").value;
  let role = document.getElementById("editRole").value;
  let email = document.getElementById("exampleInputEmail1").value;

  editUsers.firstName = firstname;
  editUsers.lastName = lastname;
  editUsers.role = role;
  editUsers.email = email;

  let edittedUser = {
    id: editUserIndex,
    firstName: firstname,
    lastName: lastname,
    image: "",
    email: email,
    password: editUsers.password,
    role: role,
  };

  users.splice(editUserIndex, 1, edittedUser);

  // getCurrentUser.firstName = firstname;
  // getCurrentUser.lastName = lastname;
  // getCurrentUser.role = role;
  // getCurrentUser.email = email;
  $("#exampleModalLong").modal("hide");
  Swal.fire({
    icon: "success",
    title: "Your details have been updated",
    showConfirmButton: false,
    timer: 2000,
  });
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", JSON.stringify(edittedUser));
}

function deleteUser() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-secondary mx-2",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      position: "top-end",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $("#exampleModalLong").modal("hide");
        Swal.fire({
          title: "Deleting Account...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 4000,
          onOpen: () => {
            swal.showLoading();
          },
        }).then(() => {
          location.href = "../signup.html";

          let Users = users.find((user) => getCurrentUser.email == user.email);
          let UserIndex = users.indexOf(Users);
          users.splice(UserIndex, 1);
          localStorage.removeItem("currentTask");
          localStorage.removeItem("currentProject");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("activeUsers");
        });
      }
    });
}
// console.log(editUser().id);

// CURRENT USER GOTTEN FROM LOCAL STORAGE
currentUser = JSON.parse(localStorage.getItem("currentUser"));
showUserName = currentUser.firstName;
showLastName = currentUser.lastName;
userRole = currentUser.role
document.getElementById('userName').innerHTML = showUserName +  " " + showLastName;
document.getElementById('userRole').innerHTML = userRole;
document.getElementById('helloUserName').innerHTML = showUserName;