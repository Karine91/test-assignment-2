import AddForm from "./AddForm";

import Column from "../models/Column";

import { addColumnEvent } from "../app";

class EditFormColumn extends AddForm {
  constructor({
    onCloseHandler,
    inputValue,
    onSubmit,
    columnId,
  }) {
    super({
      placeholder: "Введите название колонки",
      btnTitle: "Редактировать колонку",
      inputName: "title",
      inputValue,
      onCloseHandler,
      inputRequired: true,
    });

    this.columnId = columnId;
    this.onSubmitCallback = onSubmit;
  }

  onSubmit(e) {
    super.onSubmit(e);
    Column.edit(this.columnId, this.formData.title)
      .then((ref) => {
        this.onSubmitCallback(this.formData.title);
        this.onCloseClick(this.formData.title);
      })
      .catch((err) => console.log(err));
  }

  render() {
    this.root.classList.add("add-column-element");
    return super.render();
  }
}

export default EditFormColumn;
