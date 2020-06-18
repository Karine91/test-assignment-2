import EditFormTask from "./EditFormTask";
import Menu from "./Menu";
import Modal from "./Modal";

import "../assets/styles/task.scss";

import { addTaskEvent } from "../app";

class Task {
  constructor(task) {
    this.task = task;

    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.menuOptions = [
      { name: "Редактировать", handler: this.updateTask },
      { name: "Удалить", handler: this.deleteTask },
    ];

    this.menu = new Menu(this.menuOptions);
    this.wrapper = document.createElement("div");
    this.modal = null;
    this.descriptionElement = null;
  }

  deleteTask() {
    console.log("delete task");
    this.menu.onMenuClose();
  }

  updateTask() {
    console.log("ukpdate task");
    this.menu.onMenuClose();
    this.showModal();
  }

  onEdit(description) {
    this.task.description = description;
    this.descriptionElement.innerText = description;
  }

  showModal() {
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    const form = new EditFormTask({
      onSubmit: this.onEdit,
      onCloseHandler: this.hideModal,
      inputValue: this.task.description,
      columnId: this.task.columnId,
    }).render();
    modalContent.appendChild(form);
    this.modal = new Modal(modalContent).render();
    this.wrapper.appendChild(this.modal);
  }

  hideModal() {
    this.modal.remove();
  }

  createTaskElement() {
    const div = document.createElement("div");
    const textEl = document.createElement("div");
    textEl.innerText = this.task.description;
    textEl.className = "task__text";
    div.appendChild(textEl);
    this.descriptionElement = div;
    const actions = document.createElement("div");
    actions.className = "actions";
    div.appendChild(actions);
    const menu = this.menu.render();
    actions.appendChild(menu);
    div.className = "task__inner";
    return div;
  }

  render() {
    this.wrapper.className = "task";
    this.wrapper.appendChild(this.createTaskElement());

    return this.wrapper;
  }
}

export default Task;
