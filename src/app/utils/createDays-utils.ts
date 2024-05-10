import { DayInterface } from '../models';

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}

function dateToFirebaseTimestamp(date: Date): FirebaseTimestamp {
  return {
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: (date.getTime() % 1000) * 1e6,
  };
}

function firebaseTimestampToDate(timestamp: FirebaseTimestamp): Date {
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
  return new Date(milliseconds);
}

export default function createDays(
  startDate: Date | FirebaseTimestamp,
  endDate: Date | FirebaseTimestamp,
): DayInterface[] {
  const days: DayInterface[] = [];

  let startDateObject: Date;
  let endDateObject: Date;

  if (startDate instanceof Date) {
    startDateObject = startDate;
    startDate = dateToFirebaseTimestamp(startDate);
  } else {
    startDateObject = firebaseTimestampToDate(startDate);
  }

  if (endDate instanceof Date) {
    endDateObject = endDate;
    endDate = dateToFirebaseTimestamp(endDate);
  } else {
    endDateObject = firebaseTimestampToDate(endDate);
  }

  const currentDate = new Date(startDateObject);

  while (currentDate <= endDateObject) {
    const formattedDate = formatDate(currentDate);

    days.push({
      date: formattedDate,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
}