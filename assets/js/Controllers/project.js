// USERS LIST GOTTEN FROM LOCAL STORAGE
users = JSON.parse(localStorage.getItem("users"));

// CURRENT USER GOTTEN FROM LOCAL STORAGE
currentUser = JSON.parse(localStorage.getItem("currentUser"));

// PROJECTS LIST GOTTEN FROM LOCAL STORAGE
projects = JSON.parse(localStorage.getItem("projects"));
if (projects == null || projects == undefined) {
  projects = [];
}


// TEAMS GOTTEN FROM LOCAL STORAGE
teams = JSON.parse(localStorage.getItem("teams"));
if (teams == null || teams == undefined) {
  teams = [];
}

// CURRENT USER GOTTEN FROM LOCAL STORAGE
currentProject = JSON.parse(localStorage.getItem("currentProject"));
if (currentProject == null || currentProject == undefined) {
  currentProject = {};
}

// TASKS LIST GOTTEN FROM LOCAL STORAGE
tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == null || tasks == undefined) {
  tasks = [];
}

// Display all projects of current user
function displayProjects() {
  projectsPlaceholder = "";
  projectsSidebarPlaceholder = "";
  teamsSidebarPlaceholder = "";
  // if (projects == null || projects == undefined) {
  //   projects = [];
  // }
  
  // This will append the team list to the modal of create project so that you can add team to project
  teamsPlaceholder = "";
  // console.log(teams)
    for(i=0;i < teams.length; ++i){
        teamsPlaceholder += `
            <option id="${i}"  value="${teams[i].teamId}">${teams[i].teamName}</option>
        `;
        
        teamsSidebarPlaceholder += `
        <li class="nav-item" >
            <a class="nav-link active text-white" href="#"><img src="../../assets/img/project-icon.svg" alt="Project Image" class="project-image my-1">${teams[i].teamName}</a>
        </li>
      `;
    }
    
    document.getElementById('teamsListModal').innerHTML = teamsPlaceholder
    // console.log(document.getElementById('teamsSidebar'))
    document.getElementById('teamsSidebar').innerHTML = teamsSidebarPlaceholder

  // This displays all projects in the home of the dashboard(temp.html file)
  for (i = 0; i < projects.length; i++) {
    project = projects[i];
    if (project.userId == currentUser.id) {
      projectsPlaceholder += `
      <div class="card m-3 py-1 bg-grey pr-1 cursor-pointer"  onclick=openProject(${project.projectId}) style="width: 13.5rem; border: none">
        <div class="card-body pt-0 pl-2 pr-1">
          <h6 class="text-default-color">${project.projectName}</h6>
          <div class="card-img my-0">
            <img
              src="../../assets/img/image.png"
              alt=""
              style="height: 90px"
            />
          </div>
        </div>

        </div>
      <div>
             <br>
        </div>`;

      // This populates the sidebar of the home dashboard(check temp.html)
      projectsSidebarPlaceholder += `
        <li class="nav-item" onclick=openProject(${project.projectId})>
            <a class="nav-link active text-white" href="#"><img src="../../assets/img/project-icon.svg" alt="Project Image" class="project-image my-1">${project.projectName}</a>
        </li>
      `;
    }
    document.getElementById("showAllProjects").innerHTML = projectsPlaceholder;
    document.getElementById('projectsSidebar').innerHTML = projectsSidebarPlaceholder;
  }
  document.getElementById("theAvatar").src = `${currentUser.image}` || "../../assets/img/Sophia.jpg";
}

// creates new projects
function addProject() {
  let projectId;

  for (let i = 0; i <= projects.length; i++) {
    projectId = i;
  }

  newProject = {
    projectId: projectId,
    projectName: document.getElementById("projectName").value,
    projectTeamId:document.getElementById('teamsListModal').value,
    projectDescription: document.getElementById("projectDescription").value,
    userId: currentUser.id,
    teamsId:document.getElementById("teamsListModal").value
  };
  

  projects.push(newProject);

  localStorage.setItem("projects", JSON.stringify(projects));
  currentProject = localStorage.setItem(
    "currentProject",
    JSON.stringify(newProject)
  );

  users[currentUser.id].projectsIdList.push(newProject.projectId);
  localStorage.setItem('users', JSON.stringify(users));
  location.href = "temp.html";
}

// Open selected project
function openProject(id) {
  localStorage.setItem("currentProject", JSON.stringify(projects[id]));

  location.href = "taskoverview.html";
}

function displayName(params) {}

 //This will append images of registered users to the navigation bar

 function displayTeamImages() {
  

  teamImagesPlaceholder= "";

  for(i=0; i< users.length; i++){
    if(users[i]!=null || users[i]!=undefined ){
      
      if(users.length===3)
      {
        teamImagesPlaceholder +=`

        <img  src="${users[i].image}" alt="Team member" class="picture" id=${i}> `;
      }
      else{

        teamImagesPlaceholder +=`

        <img  src="${users[0].image}" alt="Team member" class="picture" id=${0}> 
        <img  src="${users[1].image}" alt="Team member" class="picture" id=${1}> 
        <img  src="${users[2].image}" alt="Team member" class="picture" id=${2}> 
        <div class="picture circle" >${users.length-3}</div>`;

      }
    }
   
  }
  
  document.getElementById("team-images").innerHTML=teamImagesPlaceholder; 

}

document.addEventListener("DOMContentLoaded", ()=>{ displayTeamImages()})




