import { isLeapBikramSambatYear } from "../../_lib/bikramSambat/index.js";

/**
 *
 * @param year {number}
 * @returns {boolean}
 */
export function isLeapYear(year: number) {
  return isLeapBikramSambatYear(year);
}
