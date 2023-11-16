import { tasks } from "./tasks.mjs";
import { days } from "./days.mjs";

let dayPoint = 0;

const taskWithDays = tasks.map((task) => {
  const taskHour = task[0];
  const day = days[dayPoint];
  const startDate = day[0];

  const diff = day[1] - task[0];

  // まだ時間があったら終了日を記録
  if (diff > 0) {
    days[dayPoint][1] = diff; // 記録
    return [taskHour, startDate, startDate];
  }

  // ちょうど時間を使ったら
  if (diff === 0) {
    days[dayPoint][1] = diff;
    dayPoint++;
    return [taskHour, startDate, startDate];
  }

  // ここから日をまたいだ場合

  // 余りのタスク時間
  let remainderTaskHour = diff * -1;
  days[dayPoint][1] = 0;
  dayPoint++;

  while (remainderTaskHour >= 8) {
    days[dayPoint][1] = 0;
    remainderTaskHour = remainderTaskHour - 8;
    dayPoint++;
  }

  if (remainderTaskHour < 8) {
    days[dayPoint][1] = days[dayPoint][1] - remainderTaskHour;
    return [taskHour, startDate, days[dayPoint][0]];
  }
});

// tasks.forEach((task) => {
//   console.log(task[2]);
// });

console.log("tasks", tasks);
console.log("tasksWithDays", taskWithDays);
console.log("days", days);
