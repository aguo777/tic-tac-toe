import React from 'react';
import Square from './Square';
import { BoardState, Action, Player, SquareState } from 'game/state';

interface BoardProps {
  board: BoardState;
  player: Player;
  disabled?: boolean;
  onAction?: (action: Action) => void;
}

export default function Board({ board, player, disabled, onAction }: BoardProps) {
  return (
    <div>
      {board.map((row, i) => (
        <div key={i}>
          {row.map((square, j) => (
            <Square
              key={j + square}
              square={square}
              disabled={disabled || square !== SquareState.Empty}
              onClick={() => onAction?.({ player, row: i, col: j })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
