import Column from "./Column.js";
import AddColumn from "./AddColumn";

import { addColumnEvent } from "../app";

import "../assets/styles/board.scss";

class Board {
  constructor(columns = []) {
    this.columns = columns;

    this.addColumnElement = null;

    this.root = document.createElement("div");
    this.columnListElement = document.createElement("div");
    this.appendColumn = this.appendColumn.bind(this);
    this.subId = addColumnEvent.subscribe(
      this.appendColumn
    );
  }

  appendColumn(column) {
    this.addColumnElement.insertAdjacentElement(
      "beforebegin",
      this.getColumnElement(column)
    );
  }

  getCreateNewColumnElement() {
    const columnWrapper = document.createElement("div");
    columnWrapper.className = "column-wrapper";
    columnWrapper.appendChild(new AddColumn().render());
    return columnWrapper;
  }

  getColumnElement(column) {
    return new Column(column).render();
  }

  render() {
    this.columns.forEach((column) => {
      this.columnListElement.appendChild(
        this.getColumnElement(column)
      );
    });
    this.addColumnElement = this.getCreateNewColumnElement();
    this.columnListElement.appendChild(
      this.addColumnElement
    );
    this.columnListElement.className = "column-list";
    this.columnListElement.id = "column-list";
    this.root.appendChild(this.columnListElement);

    this.root.className = "board";
    this.root.id = "board";
    return this.root;
  }
}

export default Board;
