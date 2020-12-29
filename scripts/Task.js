export default class Task {
  constructor(data) {
    this.id = Math.ceil(Math.random() * 100);

    this.title = data.title;
    this.text = data.text;
    this.priority = data.priority;
    this.status = false;

    this.time = this.getTime();
    this.date = this.getDate();
  }

  getTime() {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes();
  }
  
  getDate() {
    let now = new Date();
    return now.getDate() + "." + now.getMonth() + "." + now.getFullYear();
  }
}
