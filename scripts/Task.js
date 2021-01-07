export default class Task {
  constructor(data) {
    this.id = Math.ceil(Math.random() * 100);

    this.title = data.title;
    this.text = data.text;
    this.priority = data.priority;
    this.status = false;

    this.time = this.getTime();
    this.date = this.getDate();

    this.timestamp = this.getTimestamp();
  }

  getTime() {
    let now = new Date();
    let nowMinutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    return now.getHours() + ":" + nowMinutes;
  }
  
  getDate() {
    let now = new Date();
    return now.getDate() + "." + now.getMonth()+1 + "." + now.getFullYear();
  }

  getTimestamp() {
    let date = new Date();
    return date.getTime();
  }
}
