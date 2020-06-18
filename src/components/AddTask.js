import AddForm from "./AddForm";

import Task from "../models/Task";

import AddWrapper from "./AddWrapper";
import AddFormTask from "./AddFormTask";
import AddElement from "./AddElement";

class AddTask extends AddWrapper {
  constructor(columnId) {
    super();
    this.columnId = columnId;
  }

  getElement() {
    return this.open
      ? new AddFormTask(
          this.onClose,
          this.columnId
        ).render()
      : new AddElement(
          "Добавить еще одну карточку",
          this.onAdd
        ).render();
  }

  render() {
    this.element = this.getElement();
    this.root.className = "add-new-task";
    this.root.appendChild(this.element);

    return this.root;
  }
}

export default AddTask;
