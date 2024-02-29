import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./commands/REPLFunction";

/**
 * history: an array of previous outputs as strings
  *  setHistory: function to update history
  * commandHistory: String Array containing the history of executed commands
  * setCommandHistory: function to update commandHistory
  * functionMap: a map from strings to functions for supported commands  
  * file: the CSV file being operated on
  * modeBrief: a boolean indicating whether in brief or vermbose mode
  * setModeBrief: function to update modeBrief
 */
interface REPLInputProps extends REPLFunctionProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  commandHistory: string[];
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  functionMap: Map<string, REPLFunction>;
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

/**
 * file: the CSV file being operated on
 * setFile: function to update file
 * modeBrief: a boolean indicating whether in brief or vermbose mode
 * setModeBrief: function to update modeBrief
 */
interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}
/**
 * This function renders the componets for the input field as well as the 
 * submit button for input commands. Commands are pre-defined in a map that
 * goes from strings to code to execute the supported command
 * @param props: takes in REPLInputProps defined above
 * @returns JSX component for the input block and submit button
 */
export function REPLInput(props: REPLInputProps) {
  // The command as a string
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit() {
    // splits to find if empty, if so uses noCommandFound
    var splitCommand: string[] = commandString.split(" ");
    if (splitCommand.length != 0) {
      // changes output to be the function the string command corresponds to 
      var output = props.functionMap.get(splitCommand[0]) || noCommandFound;
      props.setHistory([
        ...props.history,
        // --------------------------------------------------------------------
        //TODO check typecasting
        String(output(props, [commandString])),
      ]);
    }
    props.setCommandHistory([...props.commandHistory, commandString]);
    setCommandString("");
  }

  /**
   * A simple function that handles the event of a input command not being 
   * found/supported
   * @param props REPLFunctionProps defined above
   * @param args unused arguments as is error. Open to futher development
   * @returns an error message as a string
   */
  const noCommandFound: REPLFunction = (
    props: REPLFunctionProps,
    args: string[]
  ): string => {
    return "Error: invalid command.";
  };
  return (
    <div className="repl-input">
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
