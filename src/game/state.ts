import { flatMap } from 'lodash';

export enum Player {
  X = 'X',
  O = 'O'
}

export enum SquareState {
  X = 'X',
  O = 'O',
  Empty = ' '
}

type Triple<T> = [T, T, T];

export type BoardState = Triple<Triple<SquareState>>;

export interface Position {
  row: number;
  col: number;
}

export interface Action {
  player: Player;
  position: Position;
}

export interface Winner {
  player: Player;
  triple: Position[];
}

export const InitialBoard: BoardState = [
  [SquareState.Empty, SquareState.Empty, SquareState.Empty],
  [SquareState.Empty, SquareState.Empty, SquareState.Empty],
  [SquareState.Empty, SquareState.Empty, SquareState.Empty]
];

export function nextPlayer(state: BoardState): Player {
  let numX = 0;
  let numO = 0;
  state.forEach(row =>
    row.map(square => {
      switch (square) {
        case SquareState.X:
          numX++;
        case SquareState.O:
          numO++;
        default:
          break;
      }
    })
  );
  if (numX <= numO) {
    return Player.X;
  } else if (numX === numO) {
    return Player.O;
  } else {
    console.log({ state, numX, numO });
    throw new Error('Invalid board state!');
  }
}

export function validActions(state: BoardState): Action[] {
  const player = nextPlayer(state);
  const squares = flatMap(state, (boardRow, row) =>
    boardRow.map((square, col) => ({ square, position: { row, col } }))
  );
  const validSquares = squares.filter(x => x.square === SquareState.Empty);
  return validSquares.map(({ position }) => ({ player, position }));
}

export function play(state: BoardState, action: Action): BoardState {
  const {
    player,
    position: { row, col }
  } = action;
  if (state[row][col] !== SquareState.Empty) {
    throw new Error('Square is not empty!');
  }
  const symbol = player === Player.X ? SquareState.X : SquareState.O;
  return state.map((x, i) =>
    x.map((y, j) => {
      if (i !== row || j !== col) {
        return y;
      }
      return symbol;
    })
  ) as BoardState;
}

const range = [0, 1, 2];

export function rows(board: BoardState): Position[][] {
  return range.map(row => range.map(col => ({ row, col })));
}

export function cols(board: BoardState): Position[][] {
  return range.map(col => range.map(row => ({ row, col })));
}

export function diags(board: BoardState): Position[][] {
  return [range.map(row => ({ row, col: row })), range.map(row => ({ row, col: 2 - row }))];
}

/** Return the current winner. Null if tie, undefined if game is not over yet. */
export function winner(board: BoardState): Winner | null | undefined {
  const triples = [...rows(board), ...cols(board), ...diags(board)];

  for (const triple of triples) {
    if (triple.every(({ row, col }) => board[row][col] === SquareState.X)) {
      return { player: Player.X, triple };
    } else if (triple.every(({ row, col }) => board[row][col] === SquareState.O)) {
      return { player: Player.O, triple };
    }
  }

  if (board.some(row => row.some(x => x === SquareState.Empty))) {
    return undefined;
  }
  return null;
}
