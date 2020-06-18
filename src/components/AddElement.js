import "../assets/styles/addElement.scss";
import PlusIcon from "../assets/icons/plus.svg";

class AddElement {
  constructor(title, onAddHandler) {
    this.title = title;
    this.onAddHandler = onAddHandler;

    this.element = null;
    this.root = document.createElement("div");
  }

  render() {
    const addElement = document.createElement("div");
    addElement.classList.add("add-element");
    addElement.innerHTML = `
      <div class="add-element__icon-wrapper"><svg class="icon"><use xlink:href="#${PlusIcon.id}" /></svg></div> ${this.title}
    `;
    addElement.onclick = this.onAddHandler;
    return addElement;
  }
}

export default AddElement;
