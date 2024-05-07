// import { DayInterface } from '../models';

// function formatDate(date: Date): string {
//   const options: Intl.DateTimeFormatOptions = {
//     month: 'long',
//     day: '2-digit',
//   };
//   return date.toLocaleDateString('en-US', options);
// }

// export default function createDays (
//   startDate: Date,
//   endDate: Date,
//   tripId: string
// ): DayInterface[] {
//   const days: DayInterface[] = [];
//   const currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     days.push({
//       tripId,
//       date: formatDate(currentDate),
//     });
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return days;
// }

import { DayInterface, EventInterface } from '../models';

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export default function createDays(
  startDate: Date,
  endDate: Date,
  tripId: string,
  events: EventInterface[]
): DayInterface[] {
  const days: DayInterface[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = formatDate(currentDate);

    const dayEvents = events.filter(event => {
      return formatDate(new Date(event.date)) === formattedDate;
    });

    days.push({
      tripId,
      date: formattedDate,
      events: dayEvents,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

