// USERS LIST GOTTEN FROM LOCAL STORAGE
users = JSON.parse(localStorage.getItem("users"));

// CURRENT USER GOTTEN FROM LOCAL STORAGE
currentUser = JSON.parse(localStorage.getItem("currentUser"));

// PROJECTS LIST GOTTEN FROM LOCAL STORAGE
projects = JSON.parse(localStorage.getItem("projects"));
if (projects == null || projects == undefined) {
  projects = [];
}

// TEAMS LIST GOTTEN FROM LOCAL STORAGE
teams = JSON.parse(localStorage.getItem("teams"));
if (teams == null || teams == undefined) {
  teams = [];
}

// CURRENT PROJECT GOTTEN FROM LOCAL STORAGE
currentProject = JSON.parse(localStorage.getItem("currentProject"));
if (currentProject == null || currentProject == undefined) {
  currentProject = {};
}

// TASKS GOTTEN FROM LOCAL STORAGE
tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == null || tasks == undefined) {
  tasks = [];
}

// TaskLists GOTTEN FROM LOCAL STORAGE
tasksLists = JSON.parse(localStorage.getItem("tasksLists"));
if (tasksLists == null || tasksLists == undefined) {
  tasksLists = [];
}

// ACTIVE LIST GOTTEN FROM LOCAL STORAGE
activeList = JSON.parse(localStorage.getItem("activeList"));
if (activeList == null || activeList == undefined) {
  activeList = {};
}

// #####################[ function displayTasksLists begins here ]#########################################
//##############[ function to display tasks list   ]###############################################
function displayTasksLists() {
  tasksListsPlaceholder = "";
  projectsSidebarPlaceholder = "";
  teamsSidebarPlaceholder = "";

  for (i = 0; i < teams.length; ++i) {
    teamsSidebarPlaceholder += `
        <li class="nav-item" onclick=openProject(${teams[i].teamId})>
            <a class="nav-link active text-white" href="#"><img src="../../assets/img/project-icon.svg" alt="Project Image" class="project-image my-1">${teams[i].teamName}</a>
        </li>
      `;
  }

  document.getElementById(
    "teamsSidebarTask"
  ).innerHTML = teamsSidebarPlaceholder;

  for (i = 0; i < projects.length; ++i) {
    if (currentUser.id == projects[i].userId) {
      projectsSidebarPlaceholder += `
        <li class="nav-item" onclick=openProject(${projects[i].projectId})>
            <a class="nav-link active text-white" href="#"><img src="../../assets/img/project-icon.svg" alt="Project Image" class="project-image my-1">${projects[i].projectName}</a>
        </li>
      `;
    }
  }

  document.getElementById(
    "projectsSidebarTask"
  ).innerHTML = projectsSidebarPlaceholder;

  for (i = 0; i < tasksLists.length; ++i) {
    if (tasksLists[i].userId == currentUser.id) {
      if (tasksLists[i].projectId == currentProject.projectId) {
        tasksListsPlaceholder += `
            <div class="card task-list-card" style="min-width: 30%; max-width:30%">
            <div class="">
              <div class=" d-flex justify-content-between flex-column">
                  <span class="my-2 card-heading text-center font-weight-normal">${tasksLists[i].name}</span>
                  <div class="d-flex justify-content-around">
                    <button data-toggle="modal" value="${tasksLists[i].listId}" data-target="#staticBackdrop" class="task-addtask-button btn btn-outline-primary p-2" style="font-size: 12px;">+ Add Task</button>
                    <button  class="btn btn-danger  p-2" style="font-size: 12px;" onclick="deleteTasksList(${i})">- Delete List</button>
                  </div>
              </div>
              <div id="${i}list" class="">

              </div>
            </div>
          </div>
        `;
      }
    }
  }
  document.getElementById("showLists").innerHTML = tasksListsPlaceholder;
  // console.log('This is display Tasks List')
  displayTasks();
}
// #####################[ function displayTasksLists ends here ]#########################################

// #####################[ function displayTasks begins here ]#########################################

function displayTasks() {
  teamsPlaceholder = "";
  // console.log(teams)
  for (i = 0; i < teams[currentProject.teamsId].userIdList.length; ++i) {
    // teams[currentProject.teamsId].userIdList[i]
    teamsPlaceholder += `
            <option id="${
              teams[currentProject.teamsId].userIdList[i]
            }" onclick="addUpTeamMember(event)" value="${
      users[teams[currentProject.teamsId].userIdList[i]].firstName
    }">
            ${
              users[teams[currentProject.teamsId].userIdList[i]].firstName
            }</option>
        `;
    // console.log('omo',users[teams[currentProject.teamsId].userIdList[i]])
  }
  document.getElementById("assign-to").innerHTML = teamsPlaceholder;

  for (j = 0; j < tasksLists.length; ++j) {
    tasksPlaceholder = "";
    for (i = 0; i < tasks.length; i++) {
      task = tasks[i];
      if (task.userId == currentUser.id) {
        if (tasksLists[j].listId == task.listId) {
          if (task.projectId == currentProject.projectId) {
            tasksPlaceholder += `<div class=" task-task-card card bg-grey m-3 " >   
                <div class="p-2 my-0 bg-grey">
                    <h6 class="mr-4" >${task.taskName}</h6>
                </div>    
                
                <div>
                  <span class="task-badge-green mx-2 p-1 badge badge-primary"><i class="far fa-clock"></i>  ${
                    task.endDate
                  }</span>
                </div>


                <div>
                ${task.assigneesId.map(
                  (id) =>
                    `<img id="theAvatar" src="${users[id].image}" alt="Avatar" class="avatar my-2 mx-2"></img>`
                )}  
                </div>              
            </div>`;
            document.getElementById(j + "list").innerHTML = tasksPlaceholder;
          }
        }
      }
    }
  }
}
// #####################[ function displayTasks ends here ]#########################################

document
  .getElementById("showLists")
  .addEventListener("click", function (event) {
    activeList = {
      listId: event.target.value,
    };

    localStorage.setItem("activeList", JSON.stringify(activeList));
  });

teamMemberDisplayDiv = document.getElementById("selectedTeamMembers");

// #####################[ function addUpTeamMember begins here ]#########################################
// ############[ this functionss appends selected member to a list a containing div]
function addUpTeamMember(e) {
  displayDivChildren = teamMemberDisplayDiv.children;

  // console.log(e.target.selected,e.target.value)
  if (e.target.selected == true) {
    innerDiv = document.createElement("div");
    button = document.createElement("button");
    button.innerHTML = "X";
    button.onclick = function (e) {
      this.parentElement.parentElement.removeChild(this.parentElement);
    };
    innerDiv.append(e.target.value);
    innerDiv.append(button);
    innerDiv.id = e.target.id;

    teamMemberDisplayDiv.appendChild(innerDiv);
  }
}
// #####################[ function addUpTeamMember ends here ]#########################################

// #####################[ function addList begins here ]#########################################
// #############[ this function creates and adds list to dashboard space ]###########################
let listId;
function addList() {
  for (let i = 0; i <= tasksLists.length; i++) {
    listId = i;
  }

  newList = {
    listId: listId,
    name: document.getElementById("listName").value,
    projectId: currentProject.projectId,
    userId: currentUser.id,
  };

  tasksLists.push(newList);
  localStorage.setItem("tasksLists", JSON.stringify(tasksLists));
  displayTasksLists();
}

// #####################[ function addList ends here ]#########################################

// #####[ function to delete tasks list(works only when list is empty)]######
function deleteTasksList(id) {
  for (i = 0; i < tasks.length; ++i) {
    if (id == tasks[i].listId) {
      alert("Cannot delete Non-Empty List!");
      return;
    }
  }
  tasksLists.splice(id, 1);
  localStorage.setItem("tasksLists", JSON.stringify(tasksLists));
  displayTasksLists();
}

// ######[ Function to create new task ]###############
let taskId;

function addTask() {
  console.log("I was called from addTask");
  for (let i = 0; i <= tasks.length; i++) {
    taskId = i;
  }

  teamMemberDisplayDiv = document.getElementById("selectedTeamMembers");
  displayDivChildren = teamMemberDisplayDiv.children;
  console.log(displayDivChildren);
  assigneesId = [];
  for (i = 0; i < displayDivChildren.length; ++i) {
    assigneesId.push(displayDivChildren[i].id);
    users[displayDivChildren[i].id].tasksIdList.push(taskId);
  }

  newTask = {
    taskId: taskId,
    taskName: document.getElementById("taskName").value,
    taskBody: document.getElementById("taskBody").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    projectId: currentProject.projectId,
    userId: currentUser.id,
    listId: activeList.listId,
    assigneesId: assigneesId,
  };

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("users", JSON.stringify(users));
  saveNotification(
    newTask.taskName,
    currentUser.firstName,
    currentUser.lastName,
    "task"
  );
  location.href = "taskoverview.html";
}

// ######[ Function to delete task ]###############
function deleteTask(id) {
  tasks.splice(id, 1);

  for (i = 0; i < users.length; ++i) {
    for (j = 0; j < users[i].tasksIdList.length; ++j) {
      if (users[i].tasksIdList[j] == id) {
        console.log("hey");
        users[i].tasksIdList.splice(j, 1);
      }
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("users", JSON.stringify(users));
  // displayTasks();
  location.reload();
}
