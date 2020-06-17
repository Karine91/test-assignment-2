import "./assets/styles/main.scss";

import "./utils/firebase";

import App from "./components/App";
import Event from "./utils/Event";

export const addColumnEvent = new Event();
export const addTaskEvent = new Event();

document.addEventListener("DOMContentLoaded", async () => {
  new App().init();
});
