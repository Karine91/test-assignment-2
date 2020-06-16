class Column {
  constructor() {}

  render() {
    const html = `
        <div>
            <div>Column</div>
        </div>
        `;
    const root = document.createElement("div");
    root.innerHTML = html;
    return root;
  }
}

export default Column;
