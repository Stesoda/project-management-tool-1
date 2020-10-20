// USERS LIST GOTTEN FROM LOCAL STORAGE
users = JSON.parse(localStorage.getItem("users"));
teams = JSON.parse(localStorage.getItem('teams'));
if (teams == null || teams == undefined) {
    teams = [];
}


function displayUsers(){
    usersPlaceholder = "";

    for(i=0;i < users.length; ++i){
        usersPlaceholder += `
            <option id="${i}" onclick="addUp(event)" value="${users[i].firstName}">${users[i].firstName}</option>
        `
    }
    document.getElementById('usersList').innerHTML = usersPlaceholder
}

// function listSelected(){
//     console.log(document.getElementById("usersList").value)
//     // selectedValue = []
//     // selectedValue.push(document.getElementById(id).value)
//     // usersPlaceholder = `<div>
//     //                         ${document.getElementById(id).value}
//     //                     </div>`;

//     // document.getElementById('showSelected').append(usersPlaceholder)
// }
teamDisplayDiv =  document.getElementById("showSelected")

function addUp(e){
    
    displayDivChildren = teamDisplayDiv.children 
    console.log(displayDivChildren)
// console.log(e.target.selected,e.target.value)
    if(e.target.selected == true){
            innerDiv = document.createElement('div')
            innerDiv.append(e.target.value)
            innerDiv.id = e.target.id
            teamDisplayDiv.appendChild(innerDiv)
    }
    else{
        toRemove = document.getElementById(e.target.id)
        teamDisplayDiv.removeChild(toRemove)       
    }
}

let teamId;
function createTeam(){
    for (let i = 0; i <= teams.length; i++) {
        teamId = i;
    }

    teamDisplayDiv =  document.getElementById("showSelected")
    displayDivChildren = teamDisplayDiv.children
    teamName = document.getElementById("teamName").value
    teamList = []

    for(i=0;i<displayDivChildren.length;++i){
        teamList.push(displayDivChildren[i].id)
    }

    let newTeam ={
        teamId:teamId,
        teamName:teamName,
        userIdList:teamList
    }

    teams.push(newTeam)
    localStorage.setItem('teams', JSON.stringify(teams))
    location.href="taskoverview.html"
}


function displayTeamMembers() {
  let usersPlaceholder = "";

  for (let i = 0; i < users.length; ++i) {
    usersPlaceholder += `
            <option id="${i}" onclick="addUp(event)" value="${users[i].firstName}">${users[i].firstName}</option>
        `;
  }
  document.getElementById("assign-to").innerHTML = usersPlaceholder;
}

document.addEventListener("DOMContentLoaded", () => {
  displayTeamMembers();
});

// displaying selected users
// var teamDisplayDiv = document.getElementById("selectedUsers");
// function addUp(e) {
//   let displayDivChildren = teamDisplayDiv.children;
//   console.log(displayDivChildren);
//   // console.log(e.target.selected,e.target.value)
//   if (e.target.selected == true) {
//     let innerDiv = document.createElement("span");
//     innerDiv.id = "badge";
//     document
//       .getElementById("badge")
//       .classList.add("badge badge-pill badge-secondary");
//     console.log(e.target.selected);
//     innerDiv.append(e.target.value);
//     innerDiv.id = e.target.id;
//     teamDisplayDiv.appendChild(innerDiv);
//   } else {
//     let toRemove = document.getElementById(e.target.id);
//     teamDisplayDiv.removeChild(toRemove);
//   }
// }