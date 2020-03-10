import { sample } from 'lodash';

import { Agent } from './Agent';
import { BoardState, Action, validActions, Player } from 'game/state';

export class RandomAgent extends Agent {
  constructor(player: Player) {
    super(player);
    this.name = `Random AI (${player})`;
  }
  act(state: BoardState): Action {
    const actions = validActions(state);
    return sample(actions)!;
  }
}
