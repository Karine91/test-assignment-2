import db from "../utils/firebase";

class Column {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  save() {
    if (!this.title) return;
    return db.ref("columns").push({
      title: this.title,
    });
  }

  static fetchAll() {
    return db
      .ref("columns")
      .once("value")
      .then((snapshot) => {
        const columns = [];
        snapshot.forEach((item) => {
          columns.push({
            id: item.key,
            ...item.val(),
          });
        });

        return columns;
      });
  }
}

export default Column;
