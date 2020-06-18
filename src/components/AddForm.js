import "../assets/styles/addForm.scss";

import CloseIcon from "../assets/icons/close.svg";

class AddForm {
  constructor({
    placeholder,
    btnTitle,
    inputName,
    onCloseHandler,
    tag = "input",
    inputValue = "",
  }) {
    this.placeholder = placeholder;
    this.btnTitle = btnTitle;
    this.inputName = inputName;
    this.inputValue = inputValue;
    this.onCloseHandler = onCloseHandler;
    this.tag = tag;

    this.formData = {};

    this.root = document.createElement("div");
    this.input = null;

    this.render = this.render.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onCloseClick() {
    this.input.value = "";
    this.onCloseHandler();
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.formData = { ...this.formData, [name]: value };
  }

  getInputElement() {
    const input = document.createElement(this.tag);
    input.className = "add-form__text";
    input.placeholder = this.placeholder;
    input.name = this.inputName;
    input.value = this.inputValue;
    input.onchange = this.onInputChange;
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
    close.innerHTML = `<svg class="icon add-form__icon"><use xlink:href="#${CloseIcon.id}" /></svg>`;
    close.onclick = this.onCloseClick;
    return close;
  }

  render() {
    const form = document.createElement("form");
    form.onsubmit = this.onSubmit;
    form.classList.add("add-form");
    this.input = this.getInputElement();
    form.appendChild(this.input);
    const actionsWrapper = document.createElement("div");
    actionsWrapper.className = "add-form__actions";
    actionsWrapper.appendChild(this.getButtonElement());
    actionsWrapper.appendChild(this.getCloseElement());
    form.appendChild(actionsWrapper);

    setTimeout(() => {
      this.input.focus();
    }, 0);

    return form;
  }
}

export default AddForm;
