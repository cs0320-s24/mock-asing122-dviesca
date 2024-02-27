import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { searchCSVByColName } from "./SearchCSVByColName";
import { searchCSVByIndex } from "./SearchCSVByIndex";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

export const searchCSV: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var searchFields = args[0]
    .split(/<|>/)
    .filter((val) => val != "" && val != " ")
    .map((v) => v.trim());
  if (searchFields.length == 3) {
    if (!isNaN(Number(args[0]))) {
      return String(
        searchCSVByIndex(props, [searchFields[1], searchFields[2]])
      );
    } else {
      return String(
        searchCSVByColName(props, [searchFields[1], searchFields[2]])
      );
    }
  }
  return "Error: invalid search; incorrect number of arguments.";
};
