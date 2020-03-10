import React from 'react';
import { Button } from 'reactstrap';

import '../styles/Square.scss';
import { SquareState } from 'game/state';

interface SquareProps {
  square: SquareState;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Square({ square, disabled, onClick }: SquareProps) {
  return (
    <Button className="square" outline color="primary" size="lg" onClick={onClick} disabled={disabled}>
      {square}
    </Button>
  );
}
