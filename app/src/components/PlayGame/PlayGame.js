/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
// -----------------------------------------------
//
// PlayGame -> PlayGame.js
// Desc: Component to render game flow
//
// -----------------------------------------------

// -----------------------------------------------
// Imports

// React
import { React, useReducer, useEffect, useState, useRef } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Reusable
import PopUp from '../reusable/PopUp';
import Table from '../reusable/Table';
// -----------------------------------------------

// -----------------------------------------------
// Util
import { PlayerFactory, ComputerFactory } from '../../util/player';
import { arrayAlreadyHasArray } from '../../util/helper/helper';
// -----------------------------------------------

function PlayGame(props) {
	const { playerGameboard, computerGameboard, playerName } = props;
	const [winner, setWinner] = useState('');
	const [instructions, setInstructions] = useState(false);
	const [grids, setGrids] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			uiGrid: props.uiGrid,
			grid: props.grid,
			pcUIGrid: props.pcUIGrid,
			pcGrid: props.pcGrid
		}
	);
	const [playerTurn, _setPlayerTurn] = useState(true);
	const playerTurnRef = useRef(playerTurn);
	const setPlayerTurn = (data) => {
		playerTurnRef.current = data;
		_setPlayerTurn(data);
	};
	const [computerTurn, _setComputerTurn] = useState(false);
	const computerTurnRef = useRef(computerTurn);
	const setComputerTurn = (data) => {
		computerTurnRef.current = data;
		_setComputerTurn(data);
	};

	const humanPlayer = PlayerFactory();
	const computerPlayer = ComputerFactory();

	// This function updates the grid or pcGrid based on changes made from moves.
	// The numbers on the grid mean the following:
	// - 2: means the ship has been attacked
	// - 3: means the player missed
	function updateGrid(gameboard, gridType) {
		const { grid, pcGrid } = grids;

		gameboard.shipArrayBoard.map((ship) => {
			ship.shipArray.map((shipCoordinate, index) => {
				if (shipCoordinate === 'hit') {
					const coords = ship.coordinates[index];
					const coord1 = coords[0];
					const coord2 = coords[1];

					if (gridType === 'grid') {
						setGrids({
							grid: (grid[coord1][coord2] = 2)
						});
					} else {
						setGrids({
							pcGrid: (pcGrid[coord1][coord2] = 2)
						});
					}
				}
			});
		});

		gameboard.missedShots.map((missedCoordinate) => {
			const coord1 = missedCoordinate[0];
			const coord2 = missedCoordinate[1];

			if (gridType === 'grid') {
				setGrids({
					grid: (grid[coord1][coord2] = 3)
				});
			} else {
				setGrids({
					pcGrid: (pcGrid[coord1][coord2] = 3)
				});
			}
		});

		if (gridType === 'grid') {
			setGrids({
				grid: grid
			});
		} else if (gridType === 'pcGrid') {
			setGrids({
				pcGrid: pcGrid
			});
		}
	}

	// This function updates the uiGrid or pcUIGrid based on the values from the grid or pcGrid
	// The numbers on the grid mean the following:
	// - 2: means the ship has been attacked so we create the shipAttacked class
	// - 3: means the player missed so we create the shipMissed class
	function updateUIGrid(gridType) {
		const result = grids[gridType].map((row, rowIndex) => {
			const cells = row.map((col, colIndex) => {
				const id = String(rowIndex) + String(colIndex);
				let shipStatus = '';

				if (col === 2) {
					shipStatus = 'shipAttacked';
				}
				// Here we include && gridType === 'grid' so that we do not see the computer board
				else if (col === 1 && gridType === 'grid') {
					shipStatus = 'shipPlaced';
				} else if (col === 3) {
					shipStatus = 'shipMissed';
				}

				return <div className={`cell ${shipStatus}`} id={id} />;
			});

			return <div className='row'>{cells}</div>;
		});

		if (gridType === 'grid') {
			setGrids({
				uiGrid: result
			});
		} else {
			setGrids({
				pcUIGrid: result
			});
		}
	}

	// This function checks whether there is a winner
	function checkWinner() {
		if (computerGameboard.reportSunkShips()) {
			setWinner(playerName);
		} else if (playerGameboard.reportSunkShips()) {
			setWinner('Computer');
		} else {
			setWinner('');
		}
	}

	// This function determines who is turn it is
	function determineTurn() {
		setPlayerTurn(!playerTurnRef.current);
		setComputerTurn(!computerTurnRef.current);
	}

	// This functions was an idea of how to make smart moves for the AI
	function checkComputerMoveHasNotHitShipPreviously(attackCoordinates) {
		for (let i = 0; i < computerGameboard.shipArrayBoard.length; i++) {
			const ship = computerGameboard.shipArrayBoard[i];

			for (let j = 0; j < ship.coordinates; j++) {
				const shipCoord = ship.coordinates;

				if (shipCoord === 'hit') {
					const coord1 = shipCoord[0];
					const coord2 = shipCoord[1];
					const attC1 = attackCoordinates[0];
					const attC2 = attackCoordinates[1];

					if (coord1 === attC1 && coord2 === attC2) {
						// The computer already hit this spot
						return true;
					}
				}
			}
		}

		// Computer has not this spot yet
		return false;
	}

	// This functions renders the computer move flow
	function computerMove() {
		if (playerTurn === false && computerTurn && winner === '') {
			const coord1 = Math.floor(Math.random() * Math.floor(9));
			const coord2 = Math.floor(Math.random() * Math.floor(9));

			const attackCoordinates = [coord1, coord2];
			// This code was an idea of how to help make the computer have better moves. My thought was
			// I wanted to make the computer make a move based on whether it is not a missed shot and where they
			// have hit that spot already
			// But I think A better of way of thinking about it 'What are my available spots to make a move for the computer'

			// if (
			// 	arrayAlreadyHasArray(
			// 		computerGameboard.missedShots,
			// 		attackCoordinates
			// 	) === false &&
			// 	checkComputerMoveHasNotHitShipPreviously(attackCoordinates) ===
			// 		false
			// ) {
			computerPlayer.sendAttack(playerGameboard, attackCoordinates);

			updateGrid(playerGameboard, 'grid');
			updateUIGrid('grid');
			checkWinner();
			determineTurn();
			// } else {
			// 	determineTurn();
			// }
		}
	}

	// This function is used to generate the Instructions pop up
	function generateInstructionsPopUp(value) {
		setInstructions(value);
	}

	useEffect(() => {
		updateUIGrid('pcGrid');

		const gameCellArray = Array.from(document.querySelectorAll('.cell'));

		for (let i = 0; i < gameCellArray.length; i++) {
			const cell = gameCellArray[i];

			cell.addEventListener('click', function (event) {
				event.stopImmediatePropagation();

				if (playerTurnRef.current) {
					const coord1 = Number(cell.id.split('')[0]);
					const coord2 = Number(cell.id.split('')[1]);

					const attackCoordinates = [coord1, coord2];
					humanPlayer.sendAttack(
						computerGameboard,
						attackCoordinates
					);

					updateGrid(computerGameboard, 'pcGrid');
					updateUIGrid('pcGrid');
					checkWinner();
					determineTurn();
				}
			});
		}
	}, []);

	const { uiGrid, pcUIGrid } = grids;

	return (
		<Container className='playGameContainer'>
			<Row>
				<Col>
					{computerMove()}

					{winner && (
						<PopUp
							text={`The Winner Is: ${winner}`}
							nextStepText='Play Again?'
							step={1}
							handleNextStepChange={props.handleNextStepChange}
						/>
					)}
				</Col>
			</Row>

			<Row>
				<Col>
					<div className='buttonContainer'>
						<Button onClick={() => generateInstructionsPopUp(true)}>
							Click Here For Instructions
						</Button>

						{instructions && (
							<PopUp
								step={4}
								nextStepText='Go back to game'
								instructions={1}
								generateInstructionsPopUp={
									generateInstructionsPopUp
								}
							/>
						)}
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<p className='whiteText text29 robotoText'>
						{playerName}, make your move!
					</p>

					<Table grid={uiGrid} />
				</Col>

				<Col>
					<p className='whiteText text29 robotoText'>
						Computer Board
					</p>

					<Table grid={pcUIGrid} id='computerGrid' />
				</Col>
			</Row>
		</Container>
	);
}

export default PlayGame;
