import "../assets/styles/column.scss";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import EditFormColumn from "./EditFormColumn";
import Modal from "./Modal";

import Menu from "./Menu";
import ColumnModel from "../models/Column";

import Sortable from "sortablejs";

import {
  deleteColumnEvent,
  taskMovedEvent,
  taskStartDragEvent,
} from "../app";

class Column {
  constructor({ id, title, tasks = [] }) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;

    this.updateColumn = this.updateColumn.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.saveColumnPosition = this.saveColumnPosition.bind(
      this
    );

    this.menuOptions = [
      { name: "Редактировать", handler: this.updateColumn },
      { name: "Удалить", handler: this.deleteColumn },
    ];

    this.menu = new Menu(this.menuOptions);
    this.modal = null;
    this.columnTitleElement = null;

    this.root = document.createElement("div");
  }

  updateColumn() {
    this.menu.onMenuClose();
    this.showModal();
  }

  deleteColumn() {
    ColumnModel.delete(this.id).then(() => {
      this.menu.removeListeners();
      deleteColumnEvent.fire(this.id);
      this.root.remove();
      this.menu.onMenuClose();
    });
  }

  onEdit(title) {
    this.columnTitleElement.innerText = title;
  }

  showModal() {
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    const form = new EditFormColumn({
      onSubmit: this.onEdit,
      onCloseHandler: this.hideModal,
      inputValue: this.title,
      columnId: this.id,
    }).render();
    modalContent.appendChild(form);
    this.modal = new Modal(modalContent).render();
  }

  hideModal() {
    this.modal.remove();
  }

  createAddNewTaskElement() {
    return new AddTask(this.id).render();
  }

  createHeaderElement() {
    const header = document.createElement("div");
    header.className = "column__header";
    const div = document.createElement("div");
    div.innerText = this.title;
    div.className = "column__title";
    this.columnTitleElement = div;
    header.appendChild(div);

    const actions = document.createElement("div");
    actions.className = "column__actions";

    const menu = this.menu.render();
    actions.appendChild(menu);
    header.appendChild(actions);

    return header;
  }

  saveColumnPosition(evt) {
    const columnIdFrom = evt.from.dataset.id;
    if (columnIdFrom !== this.id) {
      const taskId = evt.clone.dataset.id;
      taskMovedEvent.fire({
        columnIdTo: this.id,
        taskId,
        columnIdFrom,
      });
    }
  }

  onDragStart(e) {
    const taskId = e.item.dataset.id;
    taskStartDragEvent.fire(taskId);
  }

  render() {
    this.root.className = "column-wrapper";
    const columnElement = document.createElement("div");
    columnElement.classList = "column";
    const header = this.createHeaderElement();
    columnElement.appendChild(header);
    const tasks = new Tasks(this.tasks, this.id).render();

    const sortable = Sortable.create(tasks, {
      group: "columns",
      ghostClass: "task__ghost",
      chosenClass: "task__chosen",
      dragClass: "task__drag",
      forceFallback: true,
      filter: ".menu",
      onStart: this.onDragStart,
      onAdd: this.saveColumnPosition,
    });

    const tasksWrapper = document.createElement("div");
    tasksWrapper.className = "tasks-wrapper";
    tasksWrapper.appendChild(tasks);
    columnElement.appendChild(tasksWrapper);

    columnElement.appendChild(
      this.createAddNewTaskElement()
    );

    this.root.appendChild(columnElement);

    return this.root;
  }
}

export default Column;
