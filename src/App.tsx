import React, { useState } from 'react';

import Board from 'components/Board';
import { InitialBoard, BoardState, Player, play, Action } from 'game/state';

function App() {
  const [board, setBoard] = useState<BoardState>(InitialBoard);
  const [player, setPlayer] = useState<Player>(Player.X);
  const onAction = (action: Action) => {
    const newBoard = play(board, action);
    const newPlayer = player === Player.X ? Player.O : Player.X;
    setBoard(newBoard);
    setPlayer(newPlayer);
  };

  return (
    <div>
      <h1>Tic tac toe</h1>
      <h2>Current Player: {player}</h2>

      <Board board={board} player={player} onAction={onAction} />
    </div>
  );
}

export default App;
