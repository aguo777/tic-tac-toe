import { Player, BoardState, Action } from 'game/state';

export class Agent {
  player: Player;
  name?: string;
  constructor(player: Player) {
    this.player = player;
  }

  act(state: BoardState): Action {
    throw new Error('Not implemented');
  }
}
