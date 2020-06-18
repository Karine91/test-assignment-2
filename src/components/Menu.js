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
    this.coordX = 0;
    this.coordY = 0;

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
    const rectBounds = this.menuBtn.getBoundingClientRect();
    this.dropdownElement.style.top =
      rectBounds.top + this.menuBtn.clientHeight - 5 + "px";
    this.dropdownElement.style.left =
      rectBounds.left + "px";
    this.dropdownElement.classList.add(
      "menu__dropdown--open"
    );
  }

  onMenuClose() {
    this.dropdownElement.classList.remove(
      "menu__dropdown--open"
    );
  }

  render() {
    const menu = document.createElement("div");
    menu.className = "menu";
    this.menuBtn = this.createButton();
    const portal = document.getElementById("portal");
    this.dropdownElement = this.createDropdownMenu();

    menu.appendChild(this.menuBtn);
    portal.appendChild(this.dropdownElement);
    return menu;
  }
}

export default Menu;
