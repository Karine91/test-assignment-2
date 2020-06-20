import db from "../utils/firebase";

class Column {
  constructor({ title, tasks }) {
    this.title = title;
    this.tasks = tasks;
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
          const { title, tasks } = item.val();
          let tasksArr;
          if (tasks) {
            tasksArr = Object.entries(tasks).map(
              ([key, value]) => ({
                id: key,
                ...value,
              })
            );
          } else {
            tasksArr = [];
          }

          columns.push({
            id: item.key,
            title,
            tasks: tasksArr,
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
