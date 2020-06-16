import AddForm from "./AddForm";

class AddColumn extends AddForm {
  constructor() {
    super(
      "Введите название колонки",
      "Добавить колонку",
      "Добавить еще одну колонку"
    );
  }

  onSubmit(e) {
    super.onSubmit(e);
    console.log("On submit");
  }
}

export default AddColumn;
