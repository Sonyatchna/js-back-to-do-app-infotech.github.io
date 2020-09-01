import { TaskDocument } from '../interfaces/TaskInterface';
const cron = require('node-cron');

export class CronService {

  static scheduleRemovingTask(task: TaskDocument) {
    const date: Date = task.expiredDate;
    console.log(`Task - ${task._id}, scheduled to be removed at ${date}, timestamp: ${new Date()}`);
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
      console.log(`Cron Job called at ${new Date()}`);
      task.remove();
    });
  }
}
