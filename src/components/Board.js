import Column from "./Column.js";
import AddColumn from "./AddColumn";

import { addColumnEvent } from "../app";

import "../assets/styles/board.scss";

class Board {
  constructor(columns = []) {
    this.columns = columns;

    this.addColumnElement = new AddColumn().render();
    this.root = document.createElement("div");
    this.columnsList = document.createElement("div");
    this.appendColumn = this.appendColumn.bind(this);
    addColumnEvent.subscribe(this.appendColumn);
  }

  appendColumn({ id, title }) {
    this.columnsList.appendChild(
      new Column(id, title).render()
    );
  }

  render() {
    this.columns.forEach((column) => {
      this.columnsList.appendChild(
        new Column(column.id, column.title).render()
      );
    });
    this.columnsList.className = "columns-list";
    this.root.appendChild(this.columnsList);
    this.root.appendChild(this.addColumnElement);
    this.root.classList.add("board");
    return this.root;
  }
}

export default Board;
