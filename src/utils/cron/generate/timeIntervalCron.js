export function generateTimeIntervalCron(minutes) {
  const minuteInterval = parseInt(minutes, 10);

  if (isNaN(minuteInterval) || minuteInterval < 1 || minuteInterval > 59) {
    return {
      error: "minutes",
      message: "Please enter a number between 1 and 59 for minutes",
    };
  }

  return `*/${minuteInterval} * * * *`;
}
