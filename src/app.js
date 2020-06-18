import "./assets/styles/main.scss";

import "./utils/firebase";

import App from "./components/App";
import Event from "./utils/Event";

export const addColumnEvent = new Event();
export const addTaskEvent = new Event();
export const deleteColumnEvent = new Event();

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init().then((data) => {
    app.render(data);
  });
});
