import AddForm from "./AddForm";

import Column from "../models/Column";

import { addColumnEvent } from "../app";
class AddColumn extends AddForm {
  constructor() {
    super(
      "Введите название колонки",
      "Добавить колонку",
      "Добавить еще одну колонку",
      "title"
    );
  }

  onSubmit(e) {
    super.onSubmit(e);
    new Column(this.formData.title).save().then((ref) => {
      this.onCloseClick();
      addColumnEvent.fire({
        id: ref.key,
        title: this.formData.title,
      });
    });
  }

  render() {
    this.root.classList.add("add-column-element");
    return super.render();
  }
}

export default AddColumn;
