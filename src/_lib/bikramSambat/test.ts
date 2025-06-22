// - bs2d(d2bs(input)) === input
// - each day of the year, bs2d should have one day less than the next day
// - leap year compatibility
//                                     other | leap
// bs2d(y, 1, 1) - bs2d(y + 1, 1, 1) =>   365  | 366
// bs2d(y, 12, 30) - bs2d(y + 1, 1, 1) => 0    | 1

import { describe, expect, it } from "vitest";
import {
	isLeapBikramSambatYear,
	toBikramSambat,
	toGregorian,
} from "./index.js";

describe("toBikramSambat", () => {
	it("should converts a Gregorian date to Bikram Sambat", () => {
		const result = toBikramSambat(2021, 1, 1);
		expect(result).toEqual({ by: 2021, bm: 8, bd: 17 });
	});
	it("should converts a leap year correctly", () => {
		const result = toBikramSambat(2021, 3, 20);
		expect(result).toEqual({ by: 2077, bm: 11, bd: 7 });
	});
	it("should converts a non leap year correctly", () => {
		const result = toBikramSambat(2022, 3, 21);
		expect(result).toEqual({ by: 2078, bm: 11, bd: 7 });
	});
});

describe("toGregorian", () => {
	it("should converts a Bikram Sambat date to Gregorian", () => {
		const result = toGregorian(2077, 8, 17);
		expect(result).toEqual({ gy: 2021, gm: 1, gd: 1 });
	});
	it("should converts a leap year correctly", () => {
		const result = toGregorian(2077, 11, 7);
		expect(result).toEqual({ gy: 2021, gm: 3, gd: 20 });
	});
	it("should converts a non leap year correctly", () => {
		const result = toGregorian(2078, 11, 7); // eq 1401, 1, 1
		expect(result).toEqual({ gy: 2022, gm: 3, gd: 21 });
	});
});

describe("isLeapYear", () => {
	it("should tell correctly", () => {
		expect(isLeapBikramSambatYear(2075)).toBe(false);
		expect(isLeapBikramSambatYear(2076)).toBe(true);
		expect(isLeapBikramSambatYear(2077)).toBe(false);
		expect(isLeapBikramSambatYear(2078)).toBe(false);
		expect(isLeapBikramSambatYear(2079)).toBe(false);
		expect(isLeapBikramSambatYear(2080)).toBe(true);
	});
});
