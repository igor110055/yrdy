import {TimeFrame} from "../types/stats";
import {DateTime} from "luxon";
import {LAUNCH_DATE} from "./consts";

type ISOString = string;
const formatQuorumDate = (date: string): ISOString | string => {
  if (date.includes(" +0000 UTC")) {
    return date.replace(" +0000 UTC", "Z").replace(" ", "T");
  }

  return date;
};

const getDayDatesForDuration = (availableDates: string[], timeFrame: TimeFrame) => {
  const durationDays = timeFrame.duration ? timeFrame.duration.as('days') : 7;

  return [...Array(durationDays)]
    .map((_, i) => DateTime.now().minus({days: i}))
    .map((d) => d.toISODate())
    .reverse()
    .filter((date) => availableDates.indexOf(date) > -1);
}

const getMonthDatesForDuration = (timeFrame: TimeFrame) => {
  const monthDiff = LAUNCH_DATE.diffNow('months').months;
  let durationMonths = Math.ceil(Math.abs(monthDiff));
  if (timeFrame.duration) {
    durationMonths = timeFrame.duration.as('months');
  }

  return [...Array(durationMonths)]
    .map((_, i) => DateTime.now().minus({month: i}))
    .filter(d => d >= LAUNCH_DATE)
    .map((d) => d.toFormat('yyyy-MM'))
    .reverse();
}

const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

export {formatQuorumDate, getDayDatesForDuration, getMonthDatesForDuration, formatDate};
