class AddWrapper {
  constructor() {
    this.open = false;

    this.element = null;
    this.root = document.createElement("div");

    this.onAdd = this.onAdd.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  updateRender() {
    this.element.remove();
    this.render();
  }

  onClose() {
    this.open = false;
    this.updateRender();
  }

  onAdd() {
    this.open = true;
    this.updateRender();
  }

  getElement() {}

  render() {
    this.element = this.getElement();
    this.root.appendChild(this.element);

    return this.root;
  }
}

export default AddWrapper;
