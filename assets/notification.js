// tasks = localStorage.getItem("tasksLists");
// document.getElementById("notify").innerHTML = tasks
// task[0].name
const Task = JSON.parse(localStorage.getItem("tasksLists"));
const Notification = JSON.parse(localStorage.getItem("Notification"));
if (Notification == null || Notification == undefined) {
  Notification = [];
}

// function displayTask() {
//   let  notify = "";
//     for (i = 0; i < task.length; i++) {
//       if (task != null || task != undefined) {
//         notify += `<div>
//             <strong>Name</strong> : ${task[i].name}
//         </div> `;
//       }
//     }
//     document.getElementById("notify").innerHTML = notify

//   }
//   displayTask()

function saveNotification() {}
