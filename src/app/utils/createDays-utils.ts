import { DayInterface } from '../models';

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export default function createDays (
  startDate: Date,
  endDate: Date,
  tripId: string
): DayInterface[] {
  const days: DayInterface[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push({
      tripId,
      date: formatDate(currentDate),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
}
