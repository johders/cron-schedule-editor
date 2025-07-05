export function validateCronTime(hour, minute) {
  if (
    isNaN(minute) ||
    isNaN(hour) ||
    minute < 0 ||
    minute > 59 ||
    hour < 0 ||
    hour > 23
  ) {
    return {
      error: "invalid-time",
      message: `Invalid time entry.`,
      details: {
        ["time"]: "Hour must be 0–23, minute must be 0–59.",
      },
    };
  }

  return null;
}