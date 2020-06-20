import EditFormTask from "./EditFormTask";
import Menu from "./Menu";
import Modal from "./Modal";

import TaskModel from "../models/Task";

import "../assets/styles/task.scss";

import {
  deleteColumnEvent,
  taskMovedEvent,
  taskStartDragEvent,
} from "../app";

class Task {
  constructor(task) {
    this.task = task;

    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onDeleteColumn = this.onDeleteColumn.bind(this);
    this.updateColumnId = this.updateColumnId.bind(this);
    this.onTaskStartDrag = this.onTaskStartDrag.bind(this);

    this.menuOptions = [
      { name: "Редактировать", handler: this.updateTask },
      { name: "Удалить", handler: this.deleteTask },
    ];

    this.menu = new Menu(this.menuOptions);
    this.root = document.createElement("div");
    this.modal = null;
    this.descriptionElement = null;

    this.deleteColumnSubId = deleteColumnEvent.subscribe(
      this.onDeleteColumn
    );
    this.onTaskMovedSubId = taskMovedEvent.subscribe(
      this.updateColumnId
    );
    this.onTaskDragStartSubId = taskStartDragEvent.subscribe(
      this.onTaskStartDrag
    );
  }

  onTaskStartDrag(taskId) {
    if (taskId === this.task.id) {
      if (this.menu.isOpen) {
        this.menu.onMenuClose();
      }
    }
  }

  updateColumnId(columnId) {
    if (columnId === this.task.columnId) {
      this.task.columnId = columnId;
    }
  }

  onDeleteColumn(columnId) {
    if (columnId === this.task.columnId) {
      this.deleteTask();
    }
  }

  deleteTask() {
    TaskModel.delete(this.task.id)
      .then(() => {
        this.menu.removeListeners();
        deleteColumnEvent.unsubscribe(
          this.deleteColumnSubId
        );
        taskMovedEvent.unsubscribe(this.onTaskMovedSubId);
        taskStartDragEvent.unsubscribe(
          this.onTaskDragStartSubId
        );
        this.root.remove();
        this.menu.onMenuClose();
      })
      .catch((err) => console.log(err));
  }

  updateTask() {
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
      taskId: this.task.id,
    }).render();
    modalContent.appendChild(form);
    this.modal = new Modal(modalContent).render();
  }

  hideModal() {
    this.modal.remove();
  }

  createTaskElement() {
    const div = document.createElement("div");
    div.className = "task__inner";

    const textEl = document.createElement("div");
    textEl.innerText = this.task.description;
    textEl.className = "task__text";
    this.descriptionElement = textEl;

    div.appendChild(textEl);

    const actions = document.createElement("div");
    actions.className = "task__actions";
    div.appendChild(actions);

    const menu = this.menu.render();
    actions.appendChild(menu);

    return div;
  }

  render() {
    this.root.className = "task";
    this.root.setAttribute("data-id", this.task.id);
    this.root.appendChild(this.createTaskElement());

    return this.root;
  }
}

export default Task;
