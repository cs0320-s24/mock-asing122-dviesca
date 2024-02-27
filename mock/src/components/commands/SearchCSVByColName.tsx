import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { searchQueries } from "../REPLInput";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
}

export const searchCSVByColName: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  if (props.file.length > 1) {
    var returnVal = "";
    var results = searchQueries.get(args[0] + "," + args[1]) || [[]];
    results.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to search; no file found.";
  }
};
