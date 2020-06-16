import "./src/assets/styles/main.scss";

import Column from "./src/components/Column.js";

const column = new Column();
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(column.render());
});
