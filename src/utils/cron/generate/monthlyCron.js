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

  const day = parseInt(dayOfMonth, 10);
  if (isNaN(day)) {
    monthlyErrors.dayOfMonth = "Day of the month must be a number";
  }

  if (Object.keys(monthlyErrors).length > 0) {
    return {
      error: "monthly",
      message: "Please complete all required fields",
      details: monthlyErrors,
    };
  }

  const monthNumbers = selectedMonths
    .map((monthName) => months.map[monthName])
    .filter(Boolean);

  const hasFeb = monthNumbers.includes(2);
  const has30DayMonth = monthNumbers.some((m) => [4, 6, 9, 11].includes(m));

  const maxValidDay = hasFeb
    ? 28
    : has30DayMonth
    ? 30
    : 31;

  if (day < 1 || day > maxValidDay) {
    return {
      error: "monthly",
      message: `Day must be between 1 and ${maxValidDay} based on selected months.`,
      details: {
        dayOfMonth: `Must be between 1 and ${maxValidDay} because of the selected months`,
      },
    };
  }

  const hour = dateTimeMonthy.getHours();
  const minute = dateTimeMonthy.getMinutes();

  return `${minute} ${hour} ${day} ${monthNumbers.join(",")} *`;
}