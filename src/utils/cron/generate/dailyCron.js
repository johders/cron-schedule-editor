export function generateDailyCron(dailyTime1, dailyTime2) {
  const errors = {};
  if (!dailyTime1 && !dailyTime2) {
    errors.dailyTime1 = "Please set at least one time";
  }

  if (Object.keys(errors).length) {
    return {
      error: "daily",
      message: "Please complete all required fields",
      details: errors,
    };
  }

  const times = [dailyTime1, dailyTime2].filter(Boolean);
  return times
    .map((time) => `${time.getMinutes()} ${time.getHours()} * * *`)
    .join(" | ");
}
