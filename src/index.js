import { setupCardWidget } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-widget");
  setupCardWidget(container);
});
