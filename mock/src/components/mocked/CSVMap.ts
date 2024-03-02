import { moviesCSV, tvCSV, empty, oneCol, oneRow } from "./MockedJSON";

export const CSVmap: Map<string, string[][]> = new Map([
  ["movies.csv", moviesCSV],
  ["tv.csv", tvCSV],
  ["empty.csv", empty],
  ["oneCol.csv", oneCol],
  ["oneRow.csv", oneRow],
]);
