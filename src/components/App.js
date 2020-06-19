import Board from "./Board";
import ColumnModel from "../models/Column";
import TasksModel from "../models/Task";
import Header from "./Header";
import User from "../models/User";

class App {
  constructor() {
    this.root = document.getElementById("app");
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.user = new User();

    this.loadingElement = document.createElement("div");
    this.loadingElement.className = "loading";
    this.loadingElement.innerText = "Loading...";
  }

  async init() {
    this.root.appendChild(this.loadingElement);

    const [columns, tasks] = await Promise.all([
      ColumnModel.fetchAll(),
      TasksModel.fetchAll(),
    ]);

    const fullData = columns.map((column) => {
      const columnTasks = tasks.filter(
        (task) => task.columnId === column.id
      );
      return {
        ...column,
        tasks: columnTasks,
      };
    });

    this.loadingElement.remove();
    return fullData;
  }

  render(data) {
    this.root.appendChild(new Header(this.user).render());
    this.root.appendChild(new Board(data).render());
  }
}

export default App;
