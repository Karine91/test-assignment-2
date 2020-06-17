import Board from "./Board";
import ColumnModel from "../models/Column";
import TasksModel from "../models/Task";

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
    const tasks = await TasksModel.fetchAll();

    const fullData = columns.map((column) => {
      const columnTasks = tasks.filter(
        (task) => task.columnId === column.id
      );
      return {
        ...column,
        tasks: columnTasks,
      };
    });

    console.log(fullData);
    this.render(fullData);
  }
}

export default App;
