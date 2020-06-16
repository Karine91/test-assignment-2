import "../assets/styles/addForm.scss";

class AddForm {
  constructor(placeholder, btnTitle, addTitle) {
    this.placeholder = placeholder;
    this.btnTitle = btnTitle;
    this.addTitle = addTitle;
    this.open = false;

    this.element = null;
    this.root = document.createElement("div");

    this.onAdd = this.onAdd.bind(this);
    this.render = this.render.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onAdd() {
    console.log("onAdd");
    this.open = true;
    this.element.remove();
    this.render();
  }

  getElement() {
    this.form = document.createElement("form");
    this.form.onsubmit = this.onSubmit;
    this.form.innerHTML = `
        <textarea placeholder=${this.placeholder}></textarea>
        <button type="submit">${this.btnTitle}</button>
    `;

    this.addBlock = document.createElement("div");
    this.addBlock.classList.add("add-block");
    this.addBlock.innerHTML = `
      + ${this.addTitle}
    `;
    this.addBlock.onclick = this.onAdd;
    return this.open ? this.form : this.addBlock;
  }

  render() {
    this.element = this.getElement();
    this.root.appendChild(this.element);
    return this.root;
  }
}

export default AddForm;
