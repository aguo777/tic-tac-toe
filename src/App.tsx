import React, { useState } from 'react';
import {
  Button,
  Container,
  Col,
  Row,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Helmet } from 'react-helmet';

import Board from 'components/Board';
import { InitialBoard, BoardState, play, Action, Player, winner, nextPlayer } from 'game/state';
import { Agent } from 'agent/Agent';

import 'styles/App.scss';
import { RandomAgent } from 'agent/RandomAgent';

const randomAgents = {
  [Player.X]: new RandomAgent(Player.X),
  [Player.O]: new RandomAgent(Player.O)
};

function App() {
  const [board, setBoard] = useState<BoardState>(InitialBoard);
  const [agentX, setAgentX] = useState<Agent | undefined>();
  const [agentO, setAgentO] = useState<Agent | undefined>();

  const onAction = (action: Action) => {
    const newBoard = play(board, action);
    setBoard(newBoard);
  };

  const currentWinner = winner(board);

  const player = nextPlayer(board);

  const resetGame = () => {
    setBoard(InitialBoard);
  };

  if (currentWinner === undefined) {
    if (player === agentX?.player) {
      onAction(agentX.act(board));
    } else if (player === agentO?.player) {
      onAction(agentO.act(board));
    }
  }

  return (
    <>
      <Helmet>
        <title>Tic Tac Toe</title>
      </Helmet>
      <Container className="app">
        <Row className="title">
          <Col>
            <h1>Tic tac toe</h1>
          </Col>
        </Row>
        <Row className="players">
          <Col sm={2}>
            <Row>X</Row>
            <Row>
              <PlayerSelect
                label={agentX?.name ?? 'Human'}
                player={Player.X}
                onSelect={(agent?: Agent) => setAgentX(agent)}
              />
            </Row>
          </Col>
          <Col sm={2}>
            <Row>O</Row>
            <Row>
              <PlayerSelect
                label={agentO?.name ?? 'Human'}
                player={Player.O}
                onSelect={(agent?: Agent) => setAgentO(agent)}
              />
            </Row>
          </Col>
        </Row>
        <Row className="player">
          <Col>
            <h3>
              {currentWinner === undefined && <>Current Player: {player}</>}
              {currentWinner === null && <>It's a draw!</>}
              {!!currentWinner && <>{currentWinner.player} has won the game!</>}
            </h3>
          </Col>
        </Row>
        <Row className="board">
          <Col>
            <Board board={board} player={player} winner={currentWinner} onAction={onAction} />
          </Col>
        </Row>
        <Row className="buttons">
          <Col>
            <Button onClick={resetGame}>Reset Game</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

interface PlayerSelectProps {
  label: string;
  player: Player;
  onSelect: (agent?: Agent) => void;
}

function PlayerSelect({ label, player, onSelect }: PlayerSelectProps) {
  const randomAgent = randomAgents[player];
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onSelect()}>Human</DropdownItem>
        <DropdownItem onClick={() => onSelect(randomAgent)}>{randomAgent.name}</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

export default App;
