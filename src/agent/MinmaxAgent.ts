import { maxBy, minBy } from 'lodash';

import { Agent } from './Agent';
import { BoardState, Action, Player, winner, validActions, play, nextPlayer } from 'game/state';

export class MinmaxAgent extends Agent {
  constructor(player: Player) {
    super(player);
    this.name = `Minmax AI (${player})`;
  }

  act(state: BoardState): Action {
    return value(state)[1]!;
  }
}

/**
 * Returns the min-max value of the board (1 if X wins, -1 if O wins, 0 if draw)
 * and the action that achieves that value.
 */
function value(state: BoardState): [number, Action | null] {
  const currentWinner = winner(state);

  if (currentWinner) {
    if (currentWinner.player === Player.X) {
      return [1, null];
    } else {
      return [-1, null];
    }
  } else if (currentWinner === null) {
    return [0, null];
  } else {
    const actions = validActions(state);
    const frontier = actions.map(action => [value(play(state, action))[0], action] as [number, Action]);
    if (nextPlayer(state) === Player.X) {
      return maxBy(frontier, x => x[0])!;
    } else {
      return minBy(frontier, x => x[0])!;
    }
  }
}
