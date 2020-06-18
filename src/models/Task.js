import db from "../utils/firebase";
class Task {
  constructor({ description, columnId, id }) {
    this.description = description;
    this.columnId = columnId;
    this.taskId = id;
  }

  save() {
    if (this.taskId) {
      return;
    }
    return db.ref("tasks").push({
      description: this.description,
      columnId: this.columnId,
    });
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
