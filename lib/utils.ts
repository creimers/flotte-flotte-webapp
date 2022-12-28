import { addDays } from "date-fns";
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function dateToIsoDateString(date: Date) {
  return date.toISOString().split("T")[0];
}

export function getMaxReturnDate(
  pickupDate: Date,
  maxConsecutiveDays: number,
  bookedDates: string[],
) {
  let maxReturnDate = pickupDate;

  // @ts-ignore
  const grrr = [...Array(maxConsecutiveDays).keys()];

  for (let index = 0; index < grrr.length; index++) {
    const daysDelta = index;
    const date = addDays(pickupDate, daysDelta);
    const dateString = dateToIsoDateString(date);
    if (bookedDates.includes(dateString)) {
      break;
    } else {
      maxReturnDate = date;
    }
  }

  return maxReturnDate;
}
