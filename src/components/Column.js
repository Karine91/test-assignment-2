import "../assets/styles/column.scss";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

class Column {
  constructor({ id, title, tasks = [] }) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;

    this.root = document.createElement("div");
  }

  createAddNewTaskElement() {
    return new AddTask(this.id).render();
  }

  createHeaderElement() {
    const div = document.createElement("div");
    div.innerText = this.title;
    div.className = "column__title";
    return div;
  }

  render() {
    this.root.classList = "column";
    const header = this.createHeaderElement();
    this.root.appendChild(header);
    const tasks = new Tasks(this.tasks, this.id).render();
    const tasksWrapper = document.createElement("div");
    tasksWrapper.className = "tasks-wrapper";
    tasksWrapper.appendChild(tasks);
    this.root.appendChild(tasksWrapper);

    this.root.appendChild(this.createAddNewTaskElement());

    return this.root;
  }
}

export default Column;
