import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { moviesCSV, tvCSV } from "./MockedJSON";

const CSVmap: Map<string, string[][]> = new Map([
  ["movies.csv", moviesCSV],
  ["tv.csv", tvCSV],
]);

const searchQueries: Map<string, string[][]> = new Map([
  [
    "Movie title,Social Network",
    [["Social Network", "David Fincher", "2010", "7.8"]],
  ],
  ["Director,Social Network", [[]]],
  [
    "Director,Aaron Sorkin",
    [
      ["Molly's Game", "Aaron Sorkin", "2017", "7.4"],
      ["The Trial of the Chicago 7", "Aaron Sorkin", "2020", "7.7"],
    ],
  ],
  ["Year,2023", [["Anatomy of a Fall", "Justine Triet", "2023", "7.8"]]],
  ["0,Social Network", [["Social Network", "David Fincher", "2010", "7.8"]]],
  [
    "2,2004",
    [["Eternal Sunshine of the Spotless Mind", "Michel Gondry", "2004", "8.3"]],
  ],
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
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit() {
    var splitCommand: string[] = commandString.split(" ");
    if (splitCommand.length != 0) {
      if (splitCommand[0] == "load_file") {
        var searchFields = commandString
          .split(/<|>/)
          .filter((val) => val != "" && val != " ")
          .map((v) => v.trim());
        if (searchFields.length == 2) {
          props.setHistory([...props.history, loadCSV(props, searchFields[1])]);
        } else {
          props.setHistory([
            ...props.history,
            "Error: invalid load; incorrect number of arguments.",
          ]);
        }
      } else if (commandString == "view") {
        props.setHistory([...props.history, viewCSV(props)]);
      } else if (splitCommand[0] == "search") {
        var searchFields = commandString
          .split(/<|>/)
          .filter((val) => val != "" && val != " ")
          .map((v) => v.trim());
        if (searchFields.length == 3) {
          var val = Number(splitCommand[1]);
          if (!isNaN(val)) {
            props.setHistory([
              ...props.history,
              searchCSVByIndex(props, val, searchFields[2]),
            ]);
          } else {
            props.setHistory([
              ...props.history,
              searchCSVByColName(props, searchFields[1], searchFields[2]),
            ]);
          }
        } else {
          props.setHistory([
            ...props.history,
            "Error: invalid search; incorrect number of arguments.",
          ]);
        }
      } else if (splitCommand[0] == "mode") {
        if (splitCommand[1] == "brief") {
          props.setModeBrief(true);
          props.setHistory([...props.history, "Mode switched to brief."]);
        } else if (splitCommand[1] == "verbose") {
          props.setModeBrief(false);
          props.setHistory([...props.history, "Mode switched to verbose."]);
        } else {
          props.setHistory([...props.history, "Error: invalid mode switch."]);
        }
      } else {
        props.setHistory([...props.history, "Error: invalid command."]);
      }
    }
    props.setCommandHistory([...props.commandHistory, commandString]);
    setCommandString("");
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
  var file = CSVmap.get(fileName) || [[]];
  props.setFile(file);
  if (file.length > 1) {
    return "File successfully loaded.";
  } else {
    return "Error: unable to load file; invalid file path.";
  }
}

function viewCSV(props: REPLInputProps) {
  var returnVal = "";
  if (props.file.length > 1) {
    props.file.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to view; no file found.";
  }
}

function searchCSVByColName(
  props: REPLInputProps,
  column: string,
  val: string
) {
  if (props.file.length > 1) {
    var returnVal = "";
    var results = searchQueries.get(column + "," + val) || [[]];
    results.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to search; no file found.";
  }
}

function searchCSVByIndex(props: REPLInputProps, index: number, val: string) {
  if (props.file.length > 1) {
    var returnVal = "";
    var results = searchQueries.get(index.toString() + "," + val) || [[]];
    results.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to search; no file found.";
  }
}
