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
  console.log('startDate', startDate);
  const days: DayInterface[] = [];
  console.log('startDate', startDate);

  let startDateObject: Date;
  let endDateObject: Date;

  // Check if startDate is a Date object, if so, convert to Firebase timestamp
  if (startDate instanceof Date) {
    startDateObject = startDate;
    startDate = dateToFirebaseTimestamp(startDate);
  } else {
    startDateObject = firebaseTimestampToDate(startDate);
  }

  // Check if endDate is a Date object, if so, convert to Firebase timestamp
  if (endDate instanceof Date) {
    endDateObject = endDate;
    endDate = dateToFirebaseTimestamp(endDate);
  } else {
    endDateObject = firebaseTimestampToDate(endDate);
  }

  console.log('startDateObject', startDateObject);

  let currentDate = new Date(startDateObject);
  console.log('currentDate', currentDate);

  while (currentDate <= endDateObject) {
    const formattedDate = formatDate(currentDate);

    days.push({
      date: formattedDate,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
}

// import { DayInterface, EventInterface } from '../models';

// function formatDate(date: Date): string {
//   const options: Intl.DateTimeFormatOptions = {
//     month: 'long',
//     day: 'numeric',
//   };
//   return date.toLocaleDateString('en-US', options);
// }

// export default function createDays(
//   startDate: Date,
//   endDate: Date,
//   tripId: string,
//   events: EventInterface[]
// ): DayInterface[] {
//   const days: DayInterface[] = [];
//   const currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     const formattedDate = formatDate(currentDate);

//     const dayEvents = events.filter(event => {
//       return formatDate(new Date(event.date)) === formattedDate;
//     });

//     days.push({
//       tripId,
//       date: formattedDate,
//       events: dayEvents,
//     });

//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return days;
// }
