# Cron String Input Guide

This guide explains the syntax for creating manual schedule strings in this app. 

The base format is similar to a standard cron expression, which follows this structure:

`minute hour day-of-month month day-of-week`

---

## Table of Contents
- [Weekly Schedule](#weekly-schedule)
- [Daily Schedule](#daily-schedule)
- [Time Interval Schedule](#time-interval-schedule)
- [Monthly Schedule](#monthly-schedule)

---

## Weekly Schedule

Set a schedule that repeats on specific days of the week.

### Single Day Weekly
Runs a task once a week on a specific day and at a specific time.

* **Format:** `minute hour * * day-of-week`
* **Days of the week:** `0` (Sunday) to `6` (Saturday).
* **Example:** Run at 9:50 AM every Tuesday.
    ```
    50 9 * * 2
    ```

### Multi-Day Weekly
Runs a task on several specific days of the week at the same time.

* **Format:** `minute hour * * day-1,day-2,day-3`
* **Days of the week:** A comma-separated list of numbers from `0` (Sunday) to `6` (Saturday).
* **Example:** Run at 9:50 AM every Tuesday, Thursday, and Friday.
    ```
    50 9 * * 2,4,5
    ```

---

## Daily Schedule

Set a schedule that repeats every day.

### Single Time Daily
Runs a task once every day at a specific time.

* **Format:** `minute hour * * *`
* **Example:** Run at 9:55 AM every day.
    ```
    55 9 * * *
    ```

### Multiple Times Daily
Runs a task at two different times every day. The two cron strings are separated by a pipe (`|`) character.

* **Format:** `minute hour * * * | minute hour * * *`
* **Example:** Run at 9:55 AM and 10:05 AM every day.
    ```
    55 9 * * * | 5 10 * * *
    ```

---

## Time Interval Schedule

Set a schedule that repeats at a regular minute interval.

* **Format:** `*/minutes * * * *`
* **Minutes:** Must be a number between `1` and `59`.
* **Example:** Run every 56 minutes.
    ```
    */56 * * * *
    ```

---

## Monthly Schedule

Set a schedule that repeats on a specific day of the month, for one or more months.

### Single Month
Runs a task on a specific day and month at a set time.

* **Format:** `minute hour day-of-month month *`
* **Day of Month:** A number from 1 up to the maximum number of days in the selected month (28, 30, or 31). For example, February allows only 1–28, April allows 1–30, and March allows 1–31.
* **Month:** A number from `1` (January) to `12` (December).
* **Example:** Run at 7:50 AM on March 5th.
    ```
    50 7 5 3 *
    ```

### Multi-Month
Runs a task on a specific day of the month, but only during the specified months.

* **Format:** `minute hour day-of-month month-1,month-2 *`
* **Day of Month:** Must be between 1 and the smallest maximum day count among all selected months:
  * If **any** selected month is February (month 2), day must be between **1 and 28**.  
  * Else if **any** selected month has 30 days (April, June, September, November), day must be between **1 and 30**.  
  * Only if **all** selected months have 31 days (January, March, May, July, August, October, December) can the day be **1 to 31**.
* **Months:** A comma-separated list of numbers from `1` to `12`.
* **Example:** Run at 7:50 AM on the 5th day of the month, but only in March, May, and July.
    ```
    50 7 5 3,5,7 *
    ```
