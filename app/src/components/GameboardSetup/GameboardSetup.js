// -----------------------------------------------
//
// GameboardSetup -> GameboardSetup.js
// Desc: Setup grid for the user
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
import { React, useState, useEffect, useReducer, useLayoutEffect } from 'react';
// -----------------------------------------------

// -----------------------------------------------
// External Imports
import Button from 'react-bootstrap/Button';
// -----------------------------------------------

// -----------------------------------------------
// Util
import GameBoardFactory from '../../util/gameboard';
import printToTerminal from '../../util/helper/helper';
// -----------------------------------------------

function GameboardSetup(props) {
	const { playerName } = props;
	const playerGameboard = GameBoardFactory();
	// playerGameboard.placeShip([
	// 	[0, 0],
	// 	[0, 1],
	// 	[0, 2],
	// 	[0, 3]
	// ]);
	// playerGameboard.placeShip([
	// 	[2, 0],
	// 	[2, 1],
	// 	[2, 2]
	// ]);
	// playerGameboard.placeShip([
	// 	[4, 0],
	// 	[4, 1]
	// ]);
	// playerGameboard.placeShip([[6, 0]]);
	const computerGameboard = GameBoardFactory();
	computerGameboard.placeShip([
		[7, 0],
		[7, 1],
		[7, 2],
		[7, 3]
	]);
	computerGameboard.placeShip([
		[9, 0],
		[9, 1],
		[9, 2]
	]);
	computerGameboard.placeShip([
		[8, 5],
		[8, 6]
	]);
	computerGameboard.placeShip([[6, 7]]);
	const [grids, setGrids] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			uiGrid: '',
			grid: '',
			pcUIGrid: '',
			pcGrid: ''
		}
	);
	const [ships, setShips] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			carrier: [5, true],
			battleship: [4, true],
			cruiser: [3, true],
			submarie: [3, true],
			destroyer: [2, true]
		}
	);

	function createGrid(gridType) {
		const rows = [];
		let cols;

		for (let i = 0; i < 10; i++) {
			cols = [];

			for (let j = 0; j < 10; j++) {
				cols.push(0);
			}

			rows.push(cols);
		}

		setGrids({
			[gridType]: rows
		});
	}

	function createUIGrid(gridType) {
		const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
			const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => {
				return <div className='cell' id={String(i) + String(j)} />;
			});

			return <div className='row'>{cells}</div>;
		});

		setGrids({
			[gridType]: result
		});
	}

	function updateUIGrid(gridType) {
		const result = grids[gridType].map((row, rowIndex) => {
			const cells = row.map((col, colIndex) => {
				const id = String(rowIndex) + String(colIndex);
				let shipStatus = '';

				if (col === 1) {
					shipStatus = 'shipPlaced';
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

	function setUpGridWithBoats(shipsArray, gridType) {
		const { grid, pcGrid } = grids;

		shipsArray.map((boat) => {
			return boat.coordinates.map((coord) => {
				const coord1 = coord[0];
				const coord2 = coord[1];
				if (gridType === 'grid') {
					setGrids({
						grid: (grid[coord1][coord2] = 1)
					});
				} else {
					setGrids({
						pcGrid: (pcGrid[coord1][coord2] = 1)
					});
				}
			});
		});

		if (gridType === 'grid') {
			updateUIGrid('grid');
			setGrids({
				grid: grid
			});
		} else {
			updateUIGrid('pcGrid');
			setGrids({
				pcGrid: pcGrid
			});
		}
	}

	function setUpPlayerGrid() {
		createGrid('grid');
		createUIGrid('uiGrid');
	}

	function setUpComputerGrid() {
		createGrid('pcGrid');
		createUIGrid('pcUIGrid');
	}

	function nextStep() {
		const { uiGrid, grid, pcGrid, pcUIGrid } = grids;
		props.handleGridSetUp(uiGrid, grid, pcUIGrid, pcGrid);
		props.handleGameSetUp(playerGameboard, computerGameboard);
		props.handleNextStepChange(3);
	}

	function nextShipToUse(shipAvailable) {
		const shipEntries = Object.entries(shipAvailable);
		let lengthToUse;

		for (let i = 0; i < 5; i++) {
			console.log(i);
			const shipObj = shipEntries[i];
			console.log(shipObj);
			const name = shipObj[0];
			const shipLength = shipObj[1][0];
			const shipAvailability = shipObj[1][1];
			console.log({ name, shipLength, shipAvailability });

			if (name === 'carrier' && shipAvailability) {
				printToTerminal(1);
				setShips({
					[name]: (ships[name][1] = false)
				});
				lengthToUse = shipLength;
			} else if (name === 'battleship' && shipAvailability) {
				printToTerminal(2);
				setShips({
					[name]: (ships[name][1] = false)
				});
				lengthToUse = shipLength;
			} else if (name === 'cruiser' && shipAvailability) {
				printToTerminal(3);
				setShips({
					[name]: (ships[name][1] = false)
				});
				lengthToUse = shipLength;
			} else if (name === 'submarine' && shipAvailability) {
				printToTerminal(4);
				setShips({
					[name]: (ships[name][1] = false)
				});
				lengthToUse = shipLength;
			} else if (name === 'destroyer' && shipAvailability) {
				printToTerminal(5);
				setShips({
					[name]: (ships[name][1] = false)
				});
				lengthToUse = shipLength;
			}

			return lengthToUse;
		}
	}

	function setUpEventListeners() {
		const gameCellArray = Array.from(document.querySelectorAll('.cell'));

		for (let i = 0; i < gameCellArray.length; i++) {
			const cell = gameCellArray[i];

			cell.addEventListener('click', function () {
				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);
				console.table(ships);
				const shipLength = nextShipToUse(ships);
				console.log({ shipLength });
				const placementCoordinates = playerGameboard.calculateShipPlacement(
					shipLength,
					[coord1, coord2]
				);
				playerGameboard.placeShip(placementCoordinates);
				console.log(playerGameboard);
				setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');

				// create a nextShip that helps determine what ship is next to use
				// create a function that creates an array based on the length ofthe ship and the
				// the coordinate they want to place the ship in

				// updateGrid(computerGameboard, 'pcGrid');
				// updateUIGrid('pcGrid');
				// checkWinner();
				// determineTurn();
			});
		}
	}

	useEffect(() => {
		setUpPlayerGrid();
		setUpComputerGrid();
	}, []);

	useLayoutEffect(() => {
		// This helps us re-render the component so that I can add the event listeners
		setUpEventListeners();
	});

	const { uiGrid } = grids;

	return (
		<div className='gameboardSetupContainer'>
			<p>{playerName}, Place Your Boats</p>

			<div className='table'>{uiGrid}</div>

			<Button
				onClick={() => {
					// setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');
					setUpGridWithBoats(
						computerGameboard.shipArrayBoard,
						'pcGrid'
					);
				}}
			>
				Place Ship
			</Button>

			<Button onClick={() => nextStep()}>Get Ready!</Button>
		</div>
	);
}

export default GameboardSetup;
