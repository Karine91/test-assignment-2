import "../assets/styles/task.scss";
import Task from "./Task";

import { addTaskEvent } from "../app";

class Tasks {
  constructor(tasks = [], columnId) {
    this.tasks = tasks;
    this.columnId = columnId;

    this.tasksListElement = document.createElement("div");
    this.tasksListElement.className = "tasks-list";
    this.addTask = this.addTask.bind(this);

    this.subId = addTaskEvent.subscribe(this.addTask);
  }

  addTask(task) {
    if (this.columnId === task.columnId) {
      this.tasks.push(task);
      this.tasksListElement.appendChild(
        new Task(task).render()
      );
    }
  }

  render() {
    this.tasks.forEach((task) => {
      this.tasksListElement.appendChild(
        new Task(task).render()
      );
    });

    return this.tasksListElement;
  }
}

export default Tasks;
