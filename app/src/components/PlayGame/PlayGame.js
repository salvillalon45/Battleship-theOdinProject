/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
// -----------------------------------------------
//
// GameboardSetup -> GameboardSetup.js
// Desc: Setup grid for the user
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
import { React, useReducer, useEffect, useState, useRef } from 'react';
// -----------------------------------------------

// -----------------------------------------------
// Imports

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

	function updateUIGrid(gridType) {
		const result = grids[gridType].map((row, rowIndex) => {
			const cells = row.map((col, colIndex) => {
				const id = String(rowIndex) + String(colIndex);
				let shipStatus = '';

				if (col === 2) {
					shipStatus = 'shipAttacked';
				} else if (col === 1 && gridType === 'grid') {
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

	function checkWinner() {
		if (computerGameboard.reportSunkShips()) {
			setWinner(playerName);
		} else if (playerGameboard.reportSunkShips()) {
			setWinner('Computer');
		} else {
			setWinner('');
		}
	}

	function determineTurn() {
		setPlayerTurn(!playerTurnRef.current);
		setComputerTurn(!computerTurnRef.current);
	}

	function computerMove() {
		if (playerTurn === false && computerTurn && winner === '') {
			const coord1 = Math.floor(Math.random() * Math.floor(9));
			const coord2 = Math.floor(Math.random() * Math.floor(9));

			const attackCoordinates = [coord1, coord2];
			if (
				arrayAlreadyHasArray(computerGameboard, attackCoordinates) ===
				false
			) {
				computerPlayer.sendAttack(playerGameboard, attackCoordinates);

				updateGrid(playerGameboard, 'grid');
				updateUIGrid('grid');
				checkWinner();
				determineTurn();
			}
		}
	}

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
							text={`The Winner Is: ${{ winner }}`}
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
