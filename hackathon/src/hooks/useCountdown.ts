import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useMemo, useState } from 'react';

import { CHICAGO_TIMEZONE } from '@/src/utils/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

function nextSundaySevenPm(now: dayjs.Dayjs) {
  const chicagoNow = now.tz(CHICAGO_TIMEZONE);
  const sunday = chicagoNow.day() === 0 && chicagoNow.hour() < 19
    ? chicagoNow
    : chicagoNow.add(1, 'week');

  return sunday.day(0).hour(19).minute(0).second(0).millisecond(0);
}

export function useCountdown() {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = useMemo(() => {
    const target = nextSundaySevenPm(now);
    const seconds = Math.max(0, target.diff(now.tz(CHICAGO_TIMEZONE), 'second'));

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { days, hours, minutes, seconds: secs, totalSeconds: seconds };
  }, [now]);

  return diff;
}
