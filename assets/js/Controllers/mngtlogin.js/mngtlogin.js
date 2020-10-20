var preventDisplay = document.getElementById("mngtLogin");
if (preventDisplay) {
  preventDisplay.addEventListener("click", (e) => {
    //prevent window reload
    e.preventDefault();
  });
}

var internalUsers = [
    {
        "firstName" : "Master Administrator",
        "category" : "admin",
        "email" : "administrator@bascom.com",
        "password" : "admin"
    }
]
localStorage.setItem("internalUsers", JSON.stringify(internalUsers))

var users = JSON.parse(localStorage.getItem('users'))
var internalUsers = JSON.parse(localStorage.getItem("internalUsers"));

// if (internalUsers == null || internalUsers == undefined) {
//   internalUsers = [];
// }

function mngtsLogin() {
    let email = document.getElementById('email1').value;
    let password = document.getElementById('password1').value;

    let internalUserExist = internalUsers.find((internalUser) => email == internalUser.email);
    let internalUserPasswordExist = internalUsers.find((internalUser) => password == internalUser.password);
    

   if(internalUserExist && internalUserPasswordExist) {
        location.href = '../../../../views/internalUser/user_mgt.html'
    }
}
// alert(users.length)
document.getElementById('registeredUsersNumber').innerHTML = users.length;
document.getElementById('projectsCreatedNumber').innerHTML = users.length;

function displayUsers() {
    let usersPlaceholder;
    let tableHolder = `
    <div class="d-flex justify-content-end p-2">
        <input type="text" placeholder="Enter search"><button class="ml-2 mr-2 btn-custom" data-toggle="modal" data-target="#searchOutput">Search</button>
    </div>
    <table class="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email Address</th>
            <th scope="col">Role</th>
            <th scope="col">Password</th>
            <th scope="col"><button class="btn-custom font-size-custom" data-toggle="modal" data-target="#add">Add New User</button></th>
        </tr>
        </thead>
        <tbody id="addToTable">
        </tbody>
    </table>
    `;

    for(let i = 0; i < users.length; i++) {
        user = users[i];
        usersPlaceholder += `
            <tr>
                <th scope="row">${i + 1}</th>
                
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.password}</td>
                <td><img src="https://img.icons8.com/material-rounded/24/000000/delete-forever.png"/ onclick="deleteUser(${i})" style="cursor: pointer"><img src="https://img.icons8.com/material/24/000000/edit-user-female.png" class="mr-2 ml-2" style="cursor: pointer" data-toggle="modal" data-target="#edit" onclick="editUserTrigger(${i})"/>
            </tr>
        `
    }
    document.getElementById('showConsole').innerHTML = tableHolder;
    document.getElementById('addToTable').innerHTML = usersPlaceholder;
}

function editUserTrigger(id) {
    userRecord = users[id];
    // users.userId = id
    document.getElementById("editemail").value = userRecord.email;
    document.getElementById("editpassword").value = userRecord.password;
    document.getElementById("editfirstName").value = userRecord.firstName;
    document.getElementById("editlastName").value = userRecord.lastName;
    document.getElementById("editrole").value = userRecord.role;
    document.getElementById('index').value = id;
}

function update() {
    i = document.getElementById("index").value;
    let updatedRecord = {
        firstName: document.getElementById("editfirstName").value,
        lastName: document.getElementById("editlastName").value,
        image: "../../assets/img/Sophia.jpg",
        email: document.getElementById("editemail").value,
        password: document.getElementById("editpassword").value,
        role:  document.getElementById("editrole").value,
    }
    users[i] = updatedRecord;
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}

function deleteUser(id) {
    let confirmation = confirm('Are you sure you want to delete');
    if(confirmation = true) {
        users.splice(id, 1);
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
    }
}

function addUser() {
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    // let userConfirmPassword = document.getElementById("retypePassword").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let role = document.getElementById("role").value;

    let userId;
    for (let i = 0; i <= users.length; i++) {
      userId = i;
    }

    addUser = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        image: "../../assets/img/Sophia.jpg",
        email: userEmail,
        password: userPassword,
        role: role,
    }
    users.push(addUser);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}


function search() {

}