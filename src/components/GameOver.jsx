export default function GameOver({winner, onRematch}){
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} wins!</p>}
      {!winner && <p>Tie Game!</p>}
      <p>
        <button onClick={onRematch}>
          Play Again!
        </button>
      </p>
    </div>
  )
}