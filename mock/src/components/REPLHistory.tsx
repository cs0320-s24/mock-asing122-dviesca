import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: string[];
  commandHistory: string[];
  modeBrief: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.modeBrief
        ? props.history.map((hist) => <p>{hist}</p>)
        : props.commandHistory.map((cmd, index) => (
            <div>
              <p>Command: {cmd}</p>
              <p>Output: {props.history[index]}</p>
            </div>
          ))}
    </div>
  );
}
