import AddForm from "./AddForm";

import Task from "../models/Task";

import { addTaskEvent } from "../app";

class AddFormTask extends AddForm {
  constructor(onCloseHandler, columnId) {
    super({
      placeholder: "Введите название карточки",
      btnTitle: "Добавить карточку",
      inputName: "description",
      onCloseHandler,
      tag: "textarea",
    });
    this.columnId = columnId;
  }

  getInputElement() {
    const input = super.getInputElement();
    input.classList.add("add-task-text");
    return input;
  }

  onSubmit(e) {
    super.onSubmit(e);
    new Task({
      description: this.formData.description,
      columnId: this.columnId,
    })
      .save()
      .then((ref) => {
        this.onCloseClick();
        addTaskEvent.fire({
          id: ref.key,
          description: this.formData.description,
          columnId: this.columnId,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    this.root.classList.add("add-task-element");
    return super.render();
  }
}

export default AddFormTask;
