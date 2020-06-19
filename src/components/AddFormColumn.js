import AddForm from "./AddForm";

import Column from "../models/Column";

import { addColumnEvent } from "../app";

class AddFormColumn extends AddForm {
  constructor(onCloseHandler) {
    super({
      placeholder: "Введите название колонки",
      btnTitle: "Добавить колонку",
      inputName: "title",
      onCloseHandler,
    });
  }

  onSubmit(e) {
    super.onSubmit(e);
    if (!this.formChanged) {
      return;
    }
    new Column({ title: this.formData.title })
      .save()
      .then((ref) => {
        this.onCloseClick();
        addColumnEvent.fire({
          id: ref.key,
          title: this.formData.title,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    this.root.classList.add("add-column-element");
    return super.render();
  }
}

export default AddFormColumn;
