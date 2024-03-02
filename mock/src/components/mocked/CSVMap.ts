import { moviesCSV, tvCSV, empty, oneCol, oneRow } from "./MockedJSON";

/**
 * CSVmap
 *
 * Map containing CSV file data.
 *
 * Key: File name
 * Value: 2D array representing the CSV data
 */
export const CSVmap: Map<string, string[][]> = new Map([
  ["movies.csv", moviesCSV],
  ["tv.csv", tvCSV],
  ["empty.csv", empty],
  ["oneCol.csv", oneCol],
  ["oneRow.csv", oneRow],
]);
