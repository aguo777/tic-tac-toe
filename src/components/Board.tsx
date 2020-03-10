import React from 'react';
import Square from './Square';
import { BoardState, Action, Player, SquareState, Winner } from 'game/state';

interface BoardProps {
  board: BoardState;
  player: Player;
  winner?: Winner | null;
  onAction?: (action: Action) => void;
}

export default function Board({ board, player, winner, onAction }: BoardProps) {
  const isGameOver = winner !== undefined;
  return (
    <div>
      {board.map((boardRow, row) => (
        <div key={row}>
          {boardRow.map((square, col) => (
            <Square
              key={col + square}
              square={square}
              isPartOfWinner={winner?.triple.some(x => x.row === row && x.col === col)}
              disabled={isGameOver || square !== SquareState.Empty}
              onClick={() => onAction?.({ player, position: { row, col } })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
