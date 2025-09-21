import { DateRange } from "../types";

export const convertDateFormat = (oldDate: Date | string): string => {
  let date = new Date(oldDate).toString().split(" ");
  let newFormat = ` ${date[2]}  ${date[1]}, ${date[3]}`;
  return newFormat;
};

export const formatDateForCallback = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getSelectedDays = (dateRange: DateRange) => {
  if (!dateRange.startDate) return [];

  if (!dateRange.endDate) {
    return [dateRange.startDate];
  }

  const days = [];
  const current = new Date(dateRange.startDate);
  const end = new Date(dateRange.endDate);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};
