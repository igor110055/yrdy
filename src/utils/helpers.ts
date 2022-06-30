import {TickFormatter} from "../types/stats";
import {DateTime} from "luxon";
import {DEFAULT_LOCALE} from "./consts";
import {useCallback} from "react";

export type DataWrapper<T> = {
  data: T | null;
  error: any | null;
  isFetching: boolean;
  receivedAt: string | null;
  //possibly invalidate
};

export function receiveDataWrapper<T>(data: T): DataWrapper<T> {
  return {
    data,
    error: null,
    isFetching: false,
    receivedAt: new Date().toISOString(),
  };
}

export function errorDataWrapper<T>(error: string): DataWrapper<T> {
  return {
    data: null,
    error,
    isFetching: false,
    receivedAt: null,
  };
}

export function fetchDataWrapper() {
  return {
    data: null,
    error: null,
    isFetching: true,
    receivedAt: null,
  };
}

export const yAxisFormatter: TickFormatter = (value: number) => {
  const [divisor, unit, fractionDigits] =
    value < 1e3
      ? [1, "", 0]
      : value < 1e6
        ? [1e3, "K", 0]
        : value < 1e9
          ? [1e6, "M", 0]
          : [1e9, "B", 2];
  return `${(value / divisor).toFixed(fractionDigits)} ${unit}`;

};

export const yAxisPercentFormatter = (number: number) => `${yAxisFormatter(number)}%`;

export const yAxisCurrencyFormatter = (number: number) => `$${yAxisFormatter(number)}`;

export const dateFormatter = (date: string) => {
  return DateTime.fromISO(date).setLocale(DEFAULT_LOCALE).toLocaleString({
    month: "short",
    day: "numeric",
  });
};

export const monthFormatter = (date: string) => {
  return DateTime.fromISO(date).setLocale(DEFAULT_LOCALE).toLocaleString({
    month: "short",
    year: "numeric",
  });
};

export const numberFormatter = (value: number, digits: number = 2, style: string = 'currency'): string => {
  return value.toLocaleString(DEFAULT_LOCALE, {
    style: style,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    currency: 'USD'
  });
}

export const getSorted = (data:any, sortBy: string): any => {
  return data.sort((a: any, b: any) => {
    if (a[sortBy] < b[sortBy]) {
      return 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return -1;
    }

    return 0;
  });
};
