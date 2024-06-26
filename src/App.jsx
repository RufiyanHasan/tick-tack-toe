import Player from "./Components/Player";
import GameBoard from './Components/GameBoard';
import { useState } from "react";
import Log from './Components/Log';
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const INITIAL_GAME_BOARD = [
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
  const [player, setPlayers] = useState(PLAYERS)
  const activePlayer = derivedCurrentPlayer(gameTurns);

  function deriveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;
  
        gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function deriveWinner(gameBoard, player){
    let winner;
    for (const combinations of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
      const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
      const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];
  
      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = player[firstSquareSymbol];
      }
    }
    return winner;
  }

  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, player);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = derivedCurrentPlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName={PLAYERS.X} onChangeName={handlePlayerNameChange} symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName={PLAYERS.O} onChangeName={handlePlayerNameChange} symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
       {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
      </div>
      {/* <Log turns={gameTurns}/> */}
      <footer className="footer">
        <p>Made with ❤️ from Rufiyan Hasan</p>
      </footer>
    </main>
  );
}

export default App;
