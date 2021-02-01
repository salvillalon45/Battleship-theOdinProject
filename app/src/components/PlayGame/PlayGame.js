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
import { React, useReducer, useEffect, useState } from 'react';
// -----------------------------------------------

// -----------------------------------------------
// External Imports
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PopUp from '../reusable/PopUp';
// -----------------------------------------------

// -----------------------------------------------
// Util
import { PlayerFactory, ComputerFactory } from '../../util/player';
// -----------------------------------------------

function PlayGame(props) {
	const { playerGameboard, computerGameboard, playerName } = props;
	// let { grid } = props;
	// let { uiGrid } = props;
	// let { pcGrid } = props;
	// let { pcUIGrid } = props;
	const [winner, setWinner] = useState('');
	const [playerTurn, setPlayerTurn] = useState(true);
	const [computerTurn, setComputerTurn] = useState(false);
	const [grids, setGrids] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			uiGrid: props.uiGrid,
			grid: props.grid,
			pcUIGrid: props.pcUIGrid,
			pcGrid: props.pcGrid
		}
	);
	const humanPlayer = PlayerFactory();
	const computerPlayer = ComputerFactory();

	function updateGrid(gameboard, gridType) {
		const { grid, pcGrid } = grids;
		console.log(gameboard);

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
			console.log('what missedCoordinate');
			console.log(missedCoordinate);

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
				} else if (col === 1) {
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
			console.log('HUMAN PLAYER WINS!');
			setWinner(playerName);
			return 'Player Wins';
		}
		if (playerGameboard.reportSunkShips()) {
			console.log('COMPUTER PLAYER WINS!');
			setWinner('Computer');
			return 'Computer Wins';
		}

		setWinner('');
	}

	function determineTurn() {
		setPlayerTurn(!playerTurn);
		setComputerTurn(!computerTurn);
	}

	useEffect(() => {
		const gameCellArray = Array.from(document.querySelectorAll('.cell'));

		for (let i = 0; i < gameCellArray.length; i++) {
			const cell = gameCellArray[i];
			cell.addEventListener('click', function () {
				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);

				const attackCoordinates = [coord1, coord2];
				humanPlayer.sendAttack(computerGameboard, attackCoordinates);

				updateGrid(computerGameboard, 'pcGrid');
				updateUIGrid('pcGrid');
				checkWinner();
			});
		}
	}, []);

	const { grid, pcGrid, uiGrid, pcUIGrid } = grids;

	return (
		<div className='playGameContainer'>
			{console.log('What is pcGrid')}
			{console.log(pcGrid)}
			<p>{playerName}</p>

			<p>{winner}</p>

			{winner && (
				<PopUp
					winner={winner}
					handleNextStepChange={props.handleNextStepChange}
				/>
			)}

			<div className='table'>{uiGrid}</div>
			<div className='table'>{pcUIGrid}</div>
		</div>
	);
}

export default PlayGame;
