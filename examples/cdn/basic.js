import { testScript } from "./dom.js";

testScript("cdn.min.js", (dom) => {
  const result = dom.window.eval(
    `window.dateFnsBikramSambat.addDays(new Date(1987, 1, 11), 1).getDate()`,
  );
  console.log(result === 12);
});
