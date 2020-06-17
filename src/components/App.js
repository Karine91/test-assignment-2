import Board from "./Board";
import ColumnModel from "../models/Column";

class App {
  constructor() {
    this.root = document.getElementById("app");
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  update() {
    this.root.innerHTML = "";
    this.init();
  }

  render(data) {
    const board = new Board(data);
    this.element = board.render();
    this.root.appendChild(this.element);
  }

  async init() {
    const columns = await ColumnModel.fetchAll();
    console.log(columns);
    this.render(columns);
  }
}

export default App;
