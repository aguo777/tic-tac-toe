import React from 'react';
import { Button } from 'reactstrap';

import '../styles/Square.scss';
import { SquareState } from 'game/state';

interface SquareProps {
  square: SquareState;
  disabled?: boolean;
  isPartOfWinner?: boolean;
  onClick?: () => void;
}

export default function Square({ square, disabled, isPartOfWinner, onClick }: SquareProps) {
  return (
    <Button
      className="square"
      outline={!isPartOfWinner}
      color="primary"
      size="lg"
      onClick={onClick}
      disabled={disabled}
    >
      {square}
    </Button>
  );
}
