import { toGregorian, toBikramSambat } from "../../_lib/bikramSambat/index.js";

/**
 *
 * @param cleanDate {Date}
 * @param args
 * @returns {number}
 */
export function setDate(cleanDate: Date, ...args: Parameters<Date["setDate"]>) {
  const gd = cleanDate.getDate();
  const gm = cleanDate.getMonth() + 1;
  const gy = cleanDate.getFullYear();
  const j = toBikramSambat(gy, gm, gd);
  const [date] = args;
  const g = toGregorian(j.by, j.bm, date);
  return cleanDate.setFullYear(g.gy, g.gm - 1, g.gd);
}
