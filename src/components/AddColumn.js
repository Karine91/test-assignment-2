import AddElement from "./AddElement";
import AddFormColumn from "./AddFormColumn";
import AddWrapper from "./AddWrapper";

class AddColumn extends AddWrapper {
  constructor() {
    super();
  }

  getElement() {
    return this.open
      ? new AddFormColumn(this.onClose).render()
      : new AddElement(
          "Добавить еще одну колонку",
          this.onAdd
        ).render();
  }

  render() {
    super.render();
    this.root.className = "add-column-element";
    return this.root;
  }
}

export default AddColumn;
