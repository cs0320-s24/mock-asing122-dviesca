import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
  commandHistory: string[];
  modeBrief: boolean;
}
/**
 * This is the structure of the history of outputs and commands that will
 * be rendered in the repl/webpage. 
 * @param props 
      history: an array of previous outputs as strings
      commandHistory: String Array containing the history of executed commands
      modeBrief: a boolean indicating whether in brief or vermbose mode
 * @returns JSX component for the History "block"
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.modeBrief
      //if the mode is brief
      //maps over commands and index, checking cmd is view/search
        ? props.commandHistory.map((cmd, index) => 
            cmd == "view" || cmd.split(" ")[0] == "search" ? (
              // Renders the commands in a table
              <table>
                {props.history[index].split("###").map((row) => (
                  <tr>
                    {row.split("##").map((val) => (
                      <td>{val}</td>
                    ))}
                  </tr>
                ))}
              </table>
            ) : (
              <p>{props.history[index]}</p>
            )
          )
        // IF VERBOSE, same as above with added verbose fields displayed
        : props.commandHistory.map((cmd, index) =>
            cmd == "view" || cmd.split(" ")[0] == "search" ? (
              <div>
                <p>Command: {cmd}</p>
                <p>Output:</p>
                <table>
                  {props.history[index].split("###").map((row) => (
                    <tr>
                      {row.split("##").map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              <div>
                <p>Command: {cmd}</p>
                <p>Output: {props.history[index]}</p>
              </div>
            )
          )}
    </div>
  );
}
