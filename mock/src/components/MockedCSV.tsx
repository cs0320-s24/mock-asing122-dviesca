import { useState } from "react";
import "../styles/main.css";
import "MockedJSON.ts";

interface MockedCSVProps {
  function: string;
  fileName: string;
}
export function MockedCSV(props: MockedCSVProps) {
  const [file, setFile] = useState<string[][]>([[]]);

  const CSVmap: Map<string, string[][]> = new Map([
    ["movies.csv", moviesCSV],
    ["tv.csv", tvCSV],
  ]);

  function loadCSV() {
    setFile(CSVmap.get(props.fileName) || [[]]);
    return file.length != 0;
  }

  function searchCSVByName(column: string, value: string) {
    return;
  }

  function searchCSVByIndex(column: number, value: string) {
    // add error handling? indexes below 0, above max no. of columns
    return;
  }
}
