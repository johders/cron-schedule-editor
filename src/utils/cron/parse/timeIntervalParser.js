import { SCHEDULE_TYPES } from "../../../constants/constants";

export function parseTimeInterval(cronText, { setMinutes, setScheduleType }) {
  const extractionResult = extractInterval(cronText);
  if (extractionResult.error) return extractionResult;

  const { interval } = extractionResult;

  const validationError = validateInterval(interval);
  if (validationError) return validationError;

  setMinutes(interval.toString());
  setScheduleType(SCHEDULE_TYPES.TIME_INTERVAL);

  return { success: true };
}

function extractInterval(cronText) {
  const trimmed = cronText.trim();
  const match = trimmed.match(/^\*\/(\d{1,2})\s\*\s\*\s\*\s\*$/);

  if (!match) {
    return {
      error: "format",
      message: "Invalid format for time interval. Expected '*/X * * * *'.",
      details: {
        minutes: "Expected format: '*/X * * * *'",
      },
    };
  }

  const interval = parseInt(match[1], 10);
  return { interval };
}

function validateInterval(interval) {
  if (isNaN(interval) || interval < 1 || interval > 59) {
    return {
      error: "invalid-interval",
      message: "Time interval must be a number between 1 and 59.",
      details: {
        minutes: "Interval must be between 1 and 59.",
      },
    };
  }
  return null;
}
