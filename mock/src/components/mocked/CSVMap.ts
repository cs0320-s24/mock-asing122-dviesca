import { moviesCSV, tvCSV } from "./MockedJSON";

export const CSVmap: Map<string, string[][]> = new Map([
  ["movies.csv", moviesCSV],
  ["tv.csv", tvCSV],
]);
