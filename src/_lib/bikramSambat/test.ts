// - bs2d(d2bs(input)) === input
// - each day of the year, bs2d should have one day less than the next day
// - leap year compatibility
//                                     other | leap
// bs2d(y, 1, 1) - bs2d(y + 1, 1, 1) =>   365  | 366
// bs2d(y, 12, 30) - bs2d(y + 1, 1, 1) => 0    | 1

import { describe, expect, it } from "vitest";
import {
  gregorianToDate,
  isLeapBikramSambatYear,
  toBikramSambat,
  toGregorian
} from "./index.js";

const START = gregorianToDate(-1000, 1, 1);
const END = gregorianToDate(10000, 1, 1);

const BS_YEAR_DAYS = (() => {
  const arr: [number, number][] = [];
  // 6 31-day months
  // 6 30-day months
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= 31; d++) {
      if (d === 31 && m > 6) {
        continue;
      }
      arr.push([m, d]);
    }
  }

  return arr;
})();


describe("toBikramSambat", () => {
  it("should converts a Gregorian date to Bikram Sambat", () => {
    const result = toBikramSambat(2021, 1, 1);
    expect(result).toEqual({ by: 1399, bm: 10, bd: 12 });
  });
  it("should converts a leap year correctly", () => {
    const result = toBikramSambat(2021, 3, 20);
    expect(result).toEqual({ by: 1399, bm: 12, bd: 30 });
  });
  it("should converts a non leap year correctly", () => {
    const result = toBikramSambat(2022, 3, 21);
    expect(result).toEqual({ by: 1401, bm: 1, bd: 1 });
  });
});

describe("toGregorian", () => {
  it("should converts a Bikram Sambat date to Gregorian", () => {
    const result = toGregorian(1399, 10, 12);
    expect(result).toEqual({ gy: 2021, gm: 1, gd: 1 });
  });
  it("should converts a leap year correctly", () => {
    const result = toGregorian(1399, 12, 30);
    expect(result).toEqual({ gy: 2021, gm: 3, gd: 20 });
  });
  it("should converts a non leap year correctly", () => {
    const result = toGregorian(1400, 12, 30); // eq 1401, 1, 1
    expect(result).toEqual({ gy: 2022, gm: 3, gd: 21 });
  });
});

describe("isLeapYear", () => {
  it("should tell correctly", () => {
    expect(isLeapBikramSambatYear(1398)).toBe(false);
    expect(isLeapBikramSambatYear(1399)).toBe(true);
    expect(isLeapBikramSambatYear(1400)).toBe(false);
    expect(isLeapBikramSambatYear(1401)).toBe(false);
    expect(isLeapBikramSambatYear(1402)).toBe(false);
  });
});
