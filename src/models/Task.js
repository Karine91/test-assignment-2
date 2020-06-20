import db from "../utils/firebase";
class Task {
  constructor({ description }) {
    this.description = description;
  }

  save(columnId) {
    return db.ref(`columns/${columnId}/tasks`).push({
      description: this.description,
    });
  }

  static edit(columnId, taskId, updates) {
    if (taskId && updates) {
      return db
        .ref(`columns/${columnId}/tasks/${taskId}`)
        .update(updates);
    }
  }

  static delete(columnId, taskId) {
    if (taskId) {
      return db
        .ref(`columns/${columnId}/tasks/${taskId}`)
        .remove();
    }
  }
}

export default Task;
