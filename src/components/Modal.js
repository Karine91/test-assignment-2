import "../assets/styles/Modal.scss";

class Modal {
  constructor(content) {
    this.content = content;
  }

  createElement() {
    const modal = document.createElement("div");
    modal.className = "modal";
  }

  render() {
    const modalWrapper = document.createElement("div");
    modalWrapper.className = "modal-wrapper";
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.appendChild(this.content);
    modalWrapper.appendChild(modal);
    return modalWrapper;
  }
}

export default Modal;
