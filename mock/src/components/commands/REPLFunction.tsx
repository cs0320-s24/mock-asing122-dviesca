import { Dispatch, SetStateAction } from "react";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

export interface REPLFunction {
  (props: REPLFunctionProps, args: Array<string>): String | String[][];
}
