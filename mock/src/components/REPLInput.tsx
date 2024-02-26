import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { moviesCSV, tvCSV } from "./MockedJSON";

const CSVmap: Map<string, string[][]> = new Map([
  ["movies.csv", moviesCSV],
  ["tv.csv", tvCSV],
]);

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  commandHistory: string[];
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  functionMap: Map<string, () => string>;
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit() {
    var splitCommand: string[] = commandString.split(" ");
    if (splitCommand.length != 0) {
      if (splitCommand[0] == "load") {
        var loadSuccess = loadCSV(props, splitCommand[1]);
        props.setHistory([...props.history, loadSuccess]);
      } else if (splitCommand[0] == "view") {
      }
    }
    props.setCommandHistory([...props.commandHistory, commandString]);
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function loadCSV(props: REPLInputProps, fileName: string) {
  props.setFile(CSVmap.get(fileName) || [[]]);
  if (props.file.length != 0) {
    return "File successfully loaded.";
  } else {
    return "Error: unable to load file.";
  }
}
