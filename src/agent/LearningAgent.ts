import { Agent } from './Agent';
import { Player, BoardState } from 'game/state';

export class LearningAgent extends Agent {
    values: { [key: string]: number };


    constructor(player: Player) {
        super(player);
        this.name = `Learning AI (${player})`;
        this.values = {};
    }
}