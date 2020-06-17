import AddForm from "./AddForm";

import Task from "../models/Task";

import { addTaskEvent } from "../app";

class AddTask extends AddForm {
  constructor(columnId) {
    super(
      "Введите название карточки",
      "Добавить карточку",
      "Добавить еще одну карточку",
      "description",
      "textarea"
    );
    this.columnId = columnId;
  }

  getInputElement() {
    const input = super.getInputElement();
    input.classList.add("add-task-text");
    return input;
  }

  onSubmit(e) {
    super.onSubmit(e);
    new Task(this.formData.description, this.columnId)
      .save()
      .then((ref) => {
        this.onCloseClick();
        addTaskEvent.fire({
          id: ref.key,
          description: this.formData.description,
          columnId: this.columnId,
        });
      });
  }
  render() {
    this.root.classList.add("add-task-element");
    return super.render();
  }
}

export default AddTask;
