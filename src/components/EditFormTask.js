import AddForm from "./AddForm";

import Task from "../models/Task";

import { addTaskEvent } from "../app";

class EditFormTask extends AddForm {
  constructor({
    onCloseHandler,
    columnId,
    inputValue,
    onSubmit,
  }) {
    super({
      placeholder: "Введите название карточки",
      btnTitle: "Редактировать карточку",
      inputName: "description",
      inputValue,
      onCloseHandler,
      tag: "textarea",
    });
    this.columnId = columnId;
    this.onSubmitCallback = onSubmit;
  }

  getInputElement() {
    const input = super.getInputElement();
    input.classList.add("add-task-text");
    return input;
  }

  onSubmit(e) {
    super.onSubmit(e);
    this.onSubmitCallback(this.formData.description);
    this.onCloseClick();
    // new Task(this.formData.description, this.columnId)
    //   .save()
    //   .then((ref) => {
    //     this.onCloseClick();
    //   });
  }
  render() {
    this.root.classList.add("add-task-element");
    return super.render();
  }
}

export default EditFormTask;
