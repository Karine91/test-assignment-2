import db from "../utils/firebase";
class Task {
  constructor(description, columnId) {
    this.description = description;
    this.columnId = columnId;
  }

  save() {
    return db.ref("tasks").push(this);
  }

  static fetchAll() {
    return db
      .ref("tasks")
      .once("value")
      .then((snapshot) => {
        const tasks = [];
        snapshot.forEach((item) => {
          tasks.push({
            id: item.key,
            ...item.val(),
          });
        });

        return tasks;
      });
  }
}

export default Task;
