import "../assets/styles/column.scss";
import "../assets/styles/task.scss";

import AddTask from "./AddTask";

import { addTaskEvent } from "../app";
class Column {
  constructor({ id, title, tasks = [] }) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;

    this.root = document.createElement("div");
    this.tasksListElement = null;

    this.addTask = this.addTask.bind(this);
    this.subId = addTaskEvent.subscribe(this.addTask);
  }

  addTask(task) {
    if (this.id === task.columnId) {
      this.tasks.push(task);
      this.tasksListElement.appendChild(
        this.createTaskElement(task)
      );
    }
  }

  createHeaderElement() {
    const div = document.createElement("div");
    div.innerText = this.title;
    div.className = "column__title";
    return div;
  }

  createAddNewTaskElement() {
    return new AddTask(this.id).render();
  }

  createTaskElement(task) {
    const div = document.createElement("div");
    div.innerText = task.description;
    div.className = "task";
    return div;
  }

  render() {
    this.root.classList = "column";
    const header = this.createHeaderElement();
    this.root.appendChild(header);

    this.tasksListElement = document.createElement("div");
    this.tasksListElement.className = "tasks-list";

    this.tasks.forEach((task) => {
      this.tasksListElement.appendChild(
        this.createTaskElement(task)
      );
    });

    this.root.appendChild(this.tasksListElement);

    this.root.appendChild(this.createAddNewTaskElement());
    return this.root;
  }
}

export default Column;
