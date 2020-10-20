// TASKS GOTTEN FROM LOCAL STORAGE
const Tasks = JSON.parse(localStorage.getItem("tasks"));

var data = Tasks.map((task) => {
  return {
    title: task.taskName,
    start: task.startDate,
    end: task.endDate,
  };
});

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2020-10-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: data,
  });

  calendar.render();
});
