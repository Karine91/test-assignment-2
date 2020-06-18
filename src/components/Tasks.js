import "../assets/styles/task.scss";
import Task from "./Task";

import { addTaskEvent, deleteColumnEvent } from "../app";

class Tasks {
  constructor(tasks = [], columnId) {
    this.tasks = tasks;
    this.columnId = columnId;

    this.tasksListElement = document.createElement("div");
    this.tasksListElement.className = "tasks-list";
    this.addTask = this.addTask.bind(this);
    this.onDeleteColumn = this.onDeleteColumn.bind(this);

    this.addTaskEventSubId = addTaskEvent.subscribe(
      this.addTask
    );
    this.deleteColumnEventSubId = deleteColumnEvent.subscribe(
      this.onDeleteColumn
    );
  }

  onDeleteColumn(columnId) {
    if (this.columnId === columnId) {
      addTaskEvent.unsubscribe(this.addTaskEventSubId);
      deleteColumnEvent.unsubscribe(
        this.deleteColumnEventSubId
      );
    }
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
