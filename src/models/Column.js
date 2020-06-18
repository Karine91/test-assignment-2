import db from "../utils/firebase";

class Column {
  constructor({ title }) {
    this.title = title;
  }

  save() {
    if (!this.title) return;

    return db.ref("columns").push({
      title: this.title,
    });
  }

  static edit(id, title) {
    if (id) {
      return db.ref(`columns/${id}`).update({ title });
    }
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

  static delete(id) {
    return db.ref(`columns/${id}`).remove();
  }
}

export default Column;
