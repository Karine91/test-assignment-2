import MenuIcon from "../assets/icons/more.svg";

import "../assets/styles/menu.scss";

class Menu {
  constructor(options = []) {
    this.menuOptions = options;
    this.isOpen = false;

    this.onMenuOpen = this.onMenuOpen.bind(this);
    this.onMenuClose = this.onMenuClose.bind(this);

    this.dropdownElement = null;

    this.menuBtn = null;

    this.clickAwayListener = this.clickAwayListener.bind(
      this
    );

    this.events();
  }

  events() {
    document.addEventListener(
      "click",
      this.clickAwayListener
    );
  }

  removeListeners() {
    document.removeEventListener(
      "click",
      this.clickAwayListener
    );
  }

  clickAwayListener(e) {
    if (
      !this.menuBtn.contains(e.target) &&
      this.dropdownElement &&
      !this.dropdownElement.contains(e.target)
    ) {
      this.onMenuClose();
    }
  }

  createDropdownMenuItem({ name, handler }) {
    const item = document.createElement("div");
    item.className = "menu__dropdown-item";
    item.innerHTML = name;
    item.onclick = handler;
    return item;
  }

  createDropdownMenu() {
    const menuDropdown = document.createElement("div");
    menuDropdown.className = "menu__dropdown";
    this.menuOptions.forEach((option) => {
      menuDropdown.appendChild(
        this.createDropdownMenuItem(option)
      );
    });
    return menuDropdown;
  }

  createButton() {
    const menuBtn = document.createElement("div");
    menuBtn.innerHTML = `<svg class="icon"><use xlink:href="#${MenuIcon.id}" /></svg>`;
    menuBtn.className = "menu__button";
    menuBtn.onclick = this.onMenuOpen;
    return menuBtn;
  }

  onMenuOpen(e) {
    if (this.isOpen) return;
    this.isOpen = true;
    let portal = document.getElementById("portal");
    const columnListElement = document.getElementById(
      "column-list"
    );
    if (!portal) {
      portal = this.createDropDownPortal();
    }

    columnListElement.appendChild(portal);

    if (!this.dropdownPortal) {
      this.dropdownElement = this.createDropdownMenu();
      portal.appendChild(this.dropdownElement);
    }

    const rectBounds = this.menuBtn.getBoundingClientRect();
    const board = document.getElementById("board");
    this.dropdownElement.style.top =
      rectBounds.top +
      this.menuBtn.clientHeight -
      5 -
      board.offsetTop -
      columnListElement.offsetTop +
      "px";
    this.dropdownElement.style.left =
      rectBounds.left +
      columnListElement.scrollLeft -
      this.menuBtn.offsetWidth / 2 +
      "px";
    this.dropdownElement.classList.add(
      "menu__dropdown--open"
    );
  }

  onMenuClose() {
    this.isOpen = false;
    if (this.dropdownElement) {
      this.dropdownElement.remove();
    }
  }

  createDropDownPortal() {
    const dropdownPortal = document.createElement("div");
    dropdownPortal.id = "portal";
    const columnListElement = document.getElementById(
      "column-list"
    );
    return dropdownPortal;
  }

  render() {
    const menu = document.createElement("div");
    menu.className = "menu";
    this.menuBtn = this.createButton();

    menu.appendChild(this.menuBtn);

    return menu;
  }
}

export default Menu;
