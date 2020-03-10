import React, { useState } from 'react';
import { Button, Container, Col, Row, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Helmet } from 'react-helmet';

import Board from 'components/Board';
import { InitialBoard, BoardState, play, Action, Player, winner } from 'game/state';

import 'styles/App.scss';

function App() {
  const [board, setBoard] = useState<BoardState>(InitialBoard);
  const [player, setPlayer] = useState<Player>(Player.X);
  const onAction = (action: Action) => {
    const newBoard = play(board, action);
    const newPlayer = player === Player.X ? Player.O : Player.X;
    setBoard(newBoard);
    setPlayer(newPlayer);
  };

  const currentWinner = winner(board);

  const resetGame = () => {
    setBoard(InitialBoard);
    setPlayer(Player.X);
  };

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
          <Col>
          <UncontrolledButtonDropdown>
              <DropdownToggle caret>
                Play vs AI
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Random
                </DropdownItem>
                <DropdownItem disabled>
                  Learning
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
