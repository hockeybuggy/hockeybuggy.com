(function () {
  "use strict";

  var button = document.getElementById("menu-button");
  var menu = document.getElementById("menu-inner");
  if (!button || !menu) return;

  function isOpen() {
    return menu.getAttribute("data-expanded") === "true";
  }

  function open() {
    menu.setAttribute("data-expanded", "true");
    button.setAttribute("aria-expanded", "true");
  }

  function close() {
    menu.setAttribute("data-expanded", "false");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", function () {
    isOpen() ? close() : open();
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape" && isOpen()) close();
  });

  document.addEventListener("mousedown", function (e) {
    if (isOpen() && !menu.contains(e.target) && !button.contains(e.target)) {
      close();
    }
  });

  document.addEventListener("focusin", function (e) {
    if (isOpen() && !menu.contains(e.target) && !button.contains(e.target)) {
      close();
    }
  });
})();
