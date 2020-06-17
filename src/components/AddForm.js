import "../assets/styles/addForm.scss";

import PlusIcon from "../assets/icons/plus.svg";
import CloseIcon from "../assets/icons/close.svg";

class AddForm {
  constructor(placeholder, btnTitle, addTitle, inputName) {
    this.placeholder = placeholder;
    this.btnTitle = btnTitle;
    this.addTitle = addTitle;
    this.inputName = inputName;

    this.open = false;
    this.formData = {};

    this.element = null;
    this.root = document.createElement("div");
    this.input = null;

    this.onAdd = this.onAdd.bind(this);
    this.render = this.render.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.updateRender = this.updateRender.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  updateRender() {
    this.element.remove();
    this.render();
  }

  onAdd() {
    this.open = true;
    this.updateRender();
  }

  onCloseClick() {
    this.open = false;
    this.input.value = "";
    this.updateRender();
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.formData = { ...this.formData, [name]: value };
  }

  getInputElement() {
    const input = document.createElement("input");
    input.className = "add-form__text";
    input.placeholder = this.placeholder;
    input.name = this.inputName;
    input.onchange = this.onInputChange;
    this.input = input;
    return input;
  }

  getButtonElement() {
    const button = document.createElement("button");
    button.classList.add("add-form__button");
    button.type = "submit";
    button.innerText = this.btnTitle;
    return button;
  }

  getCloseElement() {
    const close = document.createElement("div");
    close.className = "add-form__icon-wrapper";
    close.innerHTML = `<svg class="add-icon add-form__icon"><use xlink:href="#${CloseIcon.id}" /></svg>`;
    close.onclick = this.onCloseClick;
    return close;
  }

  getFormElement() {
    const form = document.createElement("form");
    form.onsubmit = this.onSubmit;
    form.classList.add("add-form");
    form.appendChild(this.getInputElement());
    const actionsWrapper = document.createElement("div");
    actionsWrapper.className = "add-form__actions";
    actionsWrapper.appendChild(this.getButtonElement());
    actionsWrapper.appendChild(this.getCloseElement());
    form.appendChild(actionsWrapper);

    return form;
  }

  getAddElement() {
    const addElement = document.createElement("div");
    addElement.classList.add("add-element");
    addElement.innerHTML = `
      <div class="add-form__icon-wrapper add-element__icon-wrapper"><svg class="add-icon"><use xlink:href="#${PlusIcon.id}" /></svg></div> ${this.addTitle}
    `;
    addElement.onclick = this.onAdd;
    return addElement;
  }

  getElement() {
    return this.open
      ? this.getFormElement()
      : this.getAddElement();
  }

  render() {
    this.element = this.getElement();
    this.root.appendChild(this.element);
    return this.root;
  }
}

export default AddForm;
