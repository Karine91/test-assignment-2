import "../assets/styles/Modal.scss";

class Modal {
  constructor(content) {
    this.content = content;
  }

  createModalElement() {
    const modal = document.createElement("div");
    modal.className = "modal";
    return modal;
  }

  render() {
    const modalWrapper = document.createElement("div");
    modalWrapper.className = "modal-wrapper";
    const modal = this.createModalElement();

    modal.appendChild(this.content);
    modalWrapper.appendChild(modal);
    const modalPortal = document.getElementById(
      "modal-portal"
    );
    modalPortal.appendChild(modalWrapper);
    return modalWrapper;
  }
}

export default Modal;
