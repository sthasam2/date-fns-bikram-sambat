import { toGregorian, toBikramSambat } from "../../_lib/bikramSambat/index.js";

/**
 *
 * @param cleanDate {Date}
 * @param args
 * @returns {number}
 */
export function setFullYear(
  cleanDate: Date,
  ...args: Parameters<Date["setFullYear"]>
) {
  const gd = cleanDate.getDate();
  const gm = cleanDate.getMonth() + 1;
  const gy = cleanDate.getFullYear();
  const j = toBikramSambat(gy, gm, gd);
  const [year, month = j.bm - 1, date = j.bd] = args;
  const g = toGregorian(year, month + 1, date);
  return cleanDate.setFullYear(g.gy, g.gm - 1, g.gd);
}
