import { toGregorian, toBikramSambat } from "../../_lib/bikramSambat/index.js";

/**
 *
 * @param cleanDate {Date}
 * @param args
 * @returns {number}
 */
export function setMonth(
  cleanDate: Date,
  ...args: Parameters<Date["setMonth"]>
) {
  const gd = cleanDate.getDate();
  const gm = cleanDate.getMonth() + 1;
  const gy = cleanDate.getFullYear();
  const j = toBikramSambat(gy, gm, gd);
  const [month, date = j.bd] = args;
  const g = toGregorian(j.by, month + 1, date);
  return cleanDate.setFullYear(g.gy, g.gm - 1, g.gd);
}
