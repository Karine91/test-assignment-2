import AddForm from "./AddForm";

import Task from "../models/Task";

import { addTaskEvent } from "../app";

class EditFormTask extends AddForm {
  constructor({
    onCloseHandler,
    inputValue,
    onSubmit,
    taskId,
  }) {
    super({
      placeholder: "Введите название карточки",
      btnTitle: "Редактировать карточку",
      inputName: "description",
      inputValue,
      onCloseHandler,
      tag: "textarea",
      inputRequired: true,
    });
    this.onSubmitCallback = onSubmit;
    this.taskId = taskId;
  }

  getInputElement() {
    const input = super.getInputElement();
    input.classList.add("add-task-text");
    return input;
  }

  onSubmit(e) {
    super.onSubmit(e);

    Task.edit(this.taskId, {
      description: this.formData.description,
    })
      .then((ref) => {
        this.onSubmitCallback(this.formData.description);
        this.onCloseClick();
      })
      .catch((err) => console.log(err));
  }
  render() {
    this.root.classList.add("add-task-element");
    return super.render();
  }
}

export default EditFormTask;
