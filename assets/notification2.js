
// displayProject
let project = [
    {
      ProjectName: "web house",
      projectTeam: "Chi",
      projectDescription: "build a web house",
    
    },
    {
        ProjectName: "nav bar",
      projectTeam: "Chi",
      projectDescription: "create a nav bar",
      }
  ];
  displayTasks();
  // Display profile function
  function displayTasks() {
    content = "";
    for (i = 0; i < project.length; i++) {
      if (project != null || project != undefined) {
        content += `<div class = "projectName">
      <strong>Project Name</strong> : ${project[i].ProjectName}
      <strong>Project Team</strong> : ${project[i]. projectTeam}
      <strong>Project Description</strong> : ${project[i]. projectDescription}
      <a href "#"  class="view" >View</a>
      </div><hr>`;
      }
    }
    document.getElementById("projectName").innerHTML = content;
    project = JSON.parse(localStorage.getItem("project"));
    
  }