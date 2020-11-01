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

document.getElementById('profileName').innerHTML = internalUsers.firstName;
document.getElementById('profileRole').innerHTML = internalUsers.category;

// Users Gotten from local storage
localStorage.setItem("internalUsers", JSON.stringify(internalUsers))
// PROJECTS LIST GOTTEN FROM LOCAL STORAGE
projects = JSON.parse(localStorage.getItem("projects"));

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
document.getElementById('projectsCreatedNumber').innerHTML = projects.length;

async function displayUsers() {
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
            <th scope="col">Status</th>
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
                <td>${user.status}</td>
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
    document.getElementById('status').value = userRecord.status;
    document.getElementById('index').value = id;
    
}
// alert(document.getElementById('status').value)

function update() {
    // userRecord = users[id];
    i = document.getElementById("index").value;
    // status = document.getElementById('status')
    // alert(status.options[status.selectedIndex].text)
    
    let updatedRecord = {
        firstName: document.getElementById("editfirstName").value,
        lastName: document.getElementById("editlastName").value,
        image: users[i].image,
        email: document.getElementById("editemail").value,
        password: document.getElementById("editpassword").value,
        role:  document.getElementById("editrole").value,
        status: document.getElementById('editstatus').value,
        teamIdList: users[i].teamIdList,
        tasksIdList: users[i].taskIdList,
        projectsIdList: users[i].projectsIdList
    }
    
    alert(users.teamIdList)
    users[i] = updatedRecord;
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
// alert(JSON.stringify(users[5].teamIdList))
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
    let userStatus = document.getElementById("status").value;

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
        status: userStatus,
        teamIdList: [],
        taskIdList: [],
        projectsIdList: [],
    }
    users.push(addUser);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
}


function search() {

}

// function statusEdit(id) {
//     userStatus = users[id];
//     changeStatus = document.getElementById('status').value;
//     alert(changeStatus)
//     // localStorage.setItem("users", JSON.stringify(users.status))
//     // location.reload()
// }