import { toast } from "react-hot-toast";
import { months } from "../../../constants/constants";

export function generateMonthlyCron({ selectedMonths, dayOfMonth, dateTimeMonthy }) {
  const monthlyErrors = {};

  if (!dayOfMonth) {
    monthlyErrors.dayOfMonth = "Please enter a day of the month";
  }
  if (!selectedMonths.length) {
    monthlyErrors.selectedMonths = "Please select at least one month";
  }
  if (!dateTimeMonthy) {
    monthlyErrors.dateTimeMonthy = "Please select a time";
  }

  if (Object.keys(monthlyErrors).length) {
    return {
      error: "monthly",
      message: "Please complete all required fields",
      details: monthlyErrors,
    };
  }

  const monthNumbers = selectedMonths
    .map((monthName) => months.map[monthName])
    .filter(Boolean);

  const day = parseInt(dayOfMonth);
  const hour = dateTimeMonthy.getHours();
  const minute = dateTimeMonthy.getMinutes();

  if (monthNumbers.length === 0 || isNaN(day)) {
    toast.error("Invalid day or month");
    return null;
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  for (const month of monthNumbers) {
    const daysInMonth = new Date(currentYear, month, 0).getDate();
    if (day > daysInMonth) {
      const monthName = Object.entries(months.map).find(
        ([, val]) => val === month
      )?.[0];
      monthlyErrors.dayOfMonth = `${monthName} only has ${daysInMonth} days. Please enter a valid day`;
      break;
    }
  }

  if (Object.keys(monthlyErrors).length) {
    return {
      error: "monthly",
      message: "Please complete all required fields",
      details: monthlyErrors,
    };
  }

  return `${minute} ${hour} ${day} ${monthNumbers.join(",")} *`;
}