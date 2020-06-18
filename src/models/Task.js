import db from "../utils/firebase";
class Task {
  constructor({ description, columnId }) {
    this.description = description;
    this.columnId = columnId;
  }

  save() {
    return db.ref("tasks").push({
      description: this.description,
      columnId: this.columnId,
    });
  }

  static edit(taskId, updates) {
    if (taskId && updates) {
      return db.ref(`tasks/${taskId}`).update(updates);
    }
  }

  static delete(taskId) {
    if (taskId) {
      return db.ref(`tasks/${taskId}`).remove();
    }
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
