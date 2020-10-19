let tasks = [
    {
      taskName: "web house",
      assignTo: "Chi",
      taskDescription: "build a web house",
      dueDate: "2 April",
    },
    {
        taskName: "Footer-bar",
        assignTo: "Chi",
        taskDescription: "Build a footer-bar",
        dueDate: "22nd April",
      },

  ];
  displayTasks();
  // Display profile function
  function displayTasks() {
    content = "";
    for (i = 0; i < tasks.length; i++) {
      if (tasks != null || tasks != undefined) {
        content += `<div class = "view-task">
      <strong>Task Name</strong> : ${tasks[i].taskName}
      <strong>Assign To</strong> : ${tasks[i].assignTo}
      <strong>Due Date </strong> : ${tasks[i]. dueDate}
      <a href "#"  class="view" >View</a>
      </div><hr>`;
      }
    }
    document.getElementById("view-tasks").innerHTML = content;

    tasks = JSON.parse(localStorage.getItem("tasks"));
    
  }