import { testScript } from "./dom.js";

testScript(["cdn.min.js", "locale/en-US/cdn.min.js"], (dom) => {
  const result = dom.window.eval(
    `window.dateFnsBikramSambat.formatRelative(window.dateFnsBikramSambat.subDays(new Date(1987, 1, 11), 3), new Date(1987, 1, 11), { locale: window.dateFnsBikramSambat.locale.enUS })`,
  );
  console.log(result === "last Sunday at 12:00 AM");
});
