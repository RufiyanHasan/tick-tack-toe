import Player from "./Components/Player";
import GameBoard from './Components/GameBoard';
import { useState } from "react";
import Log from './Components/Log';
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivedCurrentPlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedCurrentPlayer(gameTurns);
  let gameBoard = initialGameBoard;
  let winner = null;

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  for (const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = derivedCurrentPlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName='Player 1' symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName='Player 2' symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {winner && <p>You won {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
