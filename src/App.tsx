import React, { useState, useEffect } from 'react';
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
import { LearningAgent } from 'agent/LearningAgent';
import { MinmaxAgent } from 'agent/MinmaxAgent';

const randomAgents = {
  [Player.X]: new RandomAgent(Player.X),
  [Player.O]: new RandomAgent(Player.O)
};

const minmaxAgents = {
  [Player.X]: new MinmaxAgent(Player.X),
  [Player.O]: new MinmaxAgent(Player.O)
};

const learningAgents = {
  [Player.X]: new LearningAgent(Player.X),
  [Player.O]: new LearningAgent(Player.O)
};

function App() {
  // Board
  const [board, setBoard] = useState<BoardState>(InitialBoard);
  const currentWinner = winner(board);
  const winningPlayer = currentWinner && currentWinner.player;
  const player = nextPlayer(board);

  const onAction = (action: Action) => {
    const newBoard = play(board, action);
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(InitialBoard);
  };

  // Agent
  const [agentX, setAgentX] = useState<Agent | undefined>();
  const [agentO, setAgentO] = useState<Agent | undefined>();

  useEffect(() => {
    if (winningPlayer === undefined) {
      if (player === agentX?.player) {
        setTimeout(onAction, 1, agentX.act(board));
      } else if (player === agentO?.player) {
        setTimeout(onAction, 1, agentO.act(board));
      }
    }
  });

  // Stats
  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);
  const [draws, setDraws] = useState(0);

  const total = winsX + winsO + draws;
  const pctWinsX = winsX / total;
  const pctWinsO = winsO / total;
  const pctDraws = draws / total;

  const resetStats = () => {
    setWinsX(0);
    setWinsO(0);
    setDraws(0);
  };

  useEffect(() => {
    switch (winningPlayer) {
      case Player.X:
        setWinsX(x => x + 1);
        break;
      case Player.O:
        setWinsO(x => x + 1);
        break;
      case null:
        setDraws(x => x + 1);
        break;
      default:
        break;
    }
  }, [winningPlayer]);

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
          <Col sm={3}>
            <PlayerSelect
              label={agentX?.name ?? 'Human (X)'}
              player={Player.X}
              onSelect={(agent?: Agent) => setAgentX(agent)}
            />
          </Col>
          <Col sm={3}>
            <PlayerSelect
              label={agentO?.name ?? 'Human (O)'}
              player={Player.O}
              onSelect={(agent?: Agent) => setAgentO(agent)}
            />
          </Col>
        </Row>
        <Row className="player">
          <Col>
            <h3>
              {winningPlayer === undefined && <>Current Player: {player}</>}
              {winningPlayer === null && <>It's a draw!</>}
              {!!winningPlayer && <>{winningPlayer} has won the game!</>}
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
            <Button onClick={resetStats}>Reset Stats</Button>
          </Col>
        </Row>
        <Row className="stats">
          <Col>
            <Row>
              X wins: {winsX} {!isNaN(pctWinsX) && `(${(pctWinsX * 100).toFixed(2)} %)`}
            </Row>
            <Row>
              O wins: {winsO} {!isNaN(pctWinsO) && `(${(pctWinsO * 100).toFixed(2)} %)`}
            </Row>
            <Row>
              Draws: {draws} {!isNaN(pctDraws) && `(${(pctDraws * 100).toFixed(2)} %)`}
            </Row>
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
  const minmaxAgent = minmaxAgents[player];
  const learningAgent = learningAgents[player];
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onSelect()}>Human ({player})</DropdownItem>
        <DropdownItem onClick={() => onSelect(randomAgent)}>{randomAgent.name}</DropdownItem>
        <DropdownItem onClick={() => onSelect(minmaxAgent)}>{minmaxAgent.name}</DropdownItem>
  <DropdownItem disabled onClick={() => onSelect(learningAgent)}>{learningAgent.name}</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

export default App;
