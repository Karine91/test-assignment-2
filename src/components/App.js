import Board from "./Board";
import ColumnModel from "../models/Column";

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

    const columns = await ColumnModel.fetchAll();

    this.loadingElement.remove();
    return columns;
  }

  render(data) {
    this.root.appendChild(new Header(this.user).render());
    this.root.appendChild(new Board(data).render());
  }
}

export default App;
