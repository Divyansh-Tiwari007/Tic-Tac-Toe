    //create a dynamic array for every click to register in log
    export default function Log({turns}){

      return (
        <div>
          <ol id="log">
            {turns.map((turn) => (
              <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row+1},{turn.square.col+1}</li>
            ))}
          </ol>
        </div>
      );
    }
    