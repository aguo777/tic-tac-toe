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

export interface Action {
  player: Player;
  row: number;
  col: number;
}

export const InitialBoard: BoardState = [
  [SquareState.Empty, SquareState.Empty, SquareState.Empty],
  [SquareState.Empty, SquareState.Empty, SquareState.Empty],
  [SquareState.Empty, SquareState.Empty, SquareState.Empty]
];

export function play(state: BoardState, action: Action): BoardState {
  const { player, row, col } = action;
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

export function rows(board: BoardState): Triple<Triple<SquareState>> {
  return board;
}

export function cols(board: BoardState): Triple<Triple<SquareState>> {
  const range = [0, 1, 2];
  return range.map(i => range.map(j => board[j][i])) as Triple<Triple<SquareState>>;
}

export function diags(board: BoardState): [Triple<SquareState>, Triple<SquareState>] {
  const range = [0, 1, 2];
  return [range.map(i => board[i][i]) as Triple<SquareState>, range.map(i => board[i][2 - i]) as Triple<SquareState>];
}

/** Return the current winner. Null if tie, undefined if game is not over yet. */
export function winner(board: BoardState): Player | null | undefined {
  const triples = [...rows(board), ...cols(board), ...diags(board)];

  for (const triple of triples) {
    if (triple.every(x => x === SquareState.X)) {
      return Player.X;
    } else if (triple.every(x => x === SquareState.O)) {
      return Player.O;
    }
  }

  if (board.some(row => row.some(x => x === SquareState.Empty))) {
    return undefined;
  }
  return null;
}
