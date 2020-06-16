import "./src/assets/styles/main.scss";

import AddColumn from "./src/components/AddColumn.js";

const addColumnBuilder = new AddColumn();
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(addColumnBuilder.render());
});
