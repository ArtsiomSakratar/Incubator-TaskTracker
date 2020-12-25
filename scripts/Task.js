export default class Task {
  title = "test";
  text = "test";

  constructor(data) {
    this.title = data.title;
    this.text = data.text;
    this.priority = data.priority;
  }
}
