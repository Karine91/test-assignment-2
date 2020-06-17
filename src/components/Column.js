import "../assets/styles/column.scss";

class Column {
  constructor(id, title) {
    this.id = id;
    this.title = title;

    this.root = document.createElement("div");
  }

  createHeader() {
    const div = document.createElement("div");
    div.innerText = this.title;
    div.className = "title";
    return div;
  }

  render() {
    const header = this.createHeader();
    this.root.appendChild(header);
    this.root.classList.add("column");
    return this.root;
  }
}

export default Column;
