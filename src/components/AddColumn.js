import AddForm from "./AddForm";

import Column from "../models/Column";
import "../assets/styles/add-column-form.scss";

import { addColumnEvent } from "../app";
class AddColumn extends AddForm {
  constructor(columnAddEvent) {
    super(
      "Введите название колонки",
      "Добавить колонку",
      "Добавить еще одну колонку",
      "title"
    );
  }

  // getInputElement() {
  //   return `<textarea name="description" class="add-form__text" placeholder=${this.placeholder}></textarea>`;
  // }

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
    this.root.className = "add-column-form";
    return super.render();
  }
}

export default AddColumn;
