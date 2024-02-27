import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
  commandHistory: string[];
  modeBrief: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.modeBrief
        ? props.commandHistory.map((cmd, index) =>
            cmd == "view" || cmd.split(" ")[0] == "search" ? (
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
