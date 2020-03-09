import React, { useState } from 'react';

import Board from 'components/Board';
import { InitialBoard, BoardState, play, Action, Player, winner } from 'game/state';

function App() {
  const [board, setBoard] = useState<BoardState>(InitialBoard);
  const [player, setPlayer] = useState<Player>(Player.X);
  const onAction = (action: Action) => {
    const newBoard = play(board, action);
    const newPlayer = player === Player.X ? Player.O : Player.X;
    setBoard(newBoard);
    setPlayer(newPlayer);
  };

  const currentWinner = winner(board);

  return (
    <div>
      <h1>Tic tac toe</h1>
      {currentWinner === undefined && <h2>Current Player: {player}</h2>}
      {currentWinner === null && <h2>It's a draw!</h2>}
      {!!currentWinner && <h2>{currentWinner} has won the game!</h2>}
      <Board board={board} player={player} disabled={currentWinner !== undefined} onAction={onAction} />
    </div>
  );
}

export default App;
