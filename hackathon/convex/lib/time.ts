import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Chicago";

export function currentMatchWindow(now = dayjs()) {
  const chicagoNow = now.tz(TZ);

  // Sunday before 7pm is a dead zone: last week's window has closed, this week's hasn't opened.
  const isDeadZone = chicagoNow.day() === 0 && chicagoNow.hour() < 19;

  let weekStart = chicagoNow.day(0).hour(19).minute(0).second(0).millisecond(0);
  if (isDeadZone) {
    weekStart = weekStart.subtract(7, "day");
  }

  const weekEnd = weekStart.add(7, "day").subtract(1, "second");
  const isActive =
    !isDeadZone &&
    chicagoNow.isAfter(weekStart) &&
    chicagoNow.isBefore(weekEnd.add(1, "second"));

  return { weekStart, weekEnd, isActive };
}

export function weekOfDate(now = dayjs()) {
  return currentMatchWindow(now).weekStart.format("YYYY-MM-DD");
}
