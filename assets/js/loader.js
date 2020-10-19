window.addEventListener("load", function (event) {
  const loaderHolder = document.querySelector(".loader-holder");
  const content = document.querySelector("#contentLoaded");
  if (event.target.readyState === "complete") {
    setTimeout(function () {
      // loaderHolder.classList.add("loaded");
      loaderHolder.style.transition = "all 0.4s ease-in-out 0.1s";
      loaderHolder.style.opacity = "0";
      loaderHolder.style.display = "none";
      setTimeout(function name(params) {
        fadeIn(content);
      }, 1000);
    }, 3000);
  }
});

function fadeIn(element, duration = 600) {
  element.style.display = "";
  element.style.opacity = 0;
  var last = +new Date();
  var tick = function () {
    element.style.opacity =
      +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}
