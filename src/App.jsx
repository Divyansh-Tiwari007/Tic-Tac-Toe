import {useState} from 'react'

import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurn){
  let currentPlayer = "X"

  if(gameTurn.length>0 && gameTurn[0].player === 'X') {
        currentPlayer = 'O'
      }
  return currentPlayer;
}

function derivedGameBoard(gameTurn){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  
  for(const turn of gameTurn){
    const {square,player} = turn;
    const {row,col} = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard,players){

  let winner ;
  for(const combination of WINNING_COMBINATIONS){
  const a = gameBoard[combination[0].row][combination[0].col];
  const b = gameBoard[combination[1].row][combination[1].col];
  const c = gameBoard[combination[2].row][combination[2].col];
  
  if(a && b === a && c === a)
  winner = players[a]; 
}
return winner;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]); 
  const[players,setPlayers] = useState(PLAYERS);
  const activePlayer = derivedActivePlayer(gameTurn);
  const gameBoard = derivedGameBoard(gameTurn);
  const winner = derivedWinner(gameBoard,players);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){

    setGameTurn((prevTurn) => {
      
      const currentPlayer = derivedActivePlayer(prevTurn);
      const updatedTurn = [{square : {row:rowIndex,col:colIndex},player:currentPlayer},...prevTurn];

      return updatedTurn;

    }); 
  }

  function handleRematch(){
    setGameTurn([]);
  }

  function handleNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player ">
          <Player name={PLAYERS.X} symbol={"X"} isActive={activePlayer === 'X'}
            onChangeName={handleNameChange}
          />
          <Player name={PLAYERS.O} symbol={"O"} isActive={activePlayer === 'O'}
            onChangeName={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
