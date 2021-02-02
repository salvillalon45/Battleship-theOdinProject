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
			carrier: 1,
			battleship: 1,
			cruiser: 1,
			submarine: 1,
			destroyer: 1
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
			boat.coordinates.map((coord) => {
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
		setUpGridWithBoats(computerGameboard.shipArrayBoard, 'pcGrid');
		props.handleNextStepChange(3);
	}

	function nextShipToUse() {
		const shipEntries = Object.entries(ships);
		let lengthToUse;

		for (let i = 0; i < 5; i++) {
			const shipObj = shipEntries[i];
			const name = shipObj[0];
			// const shipLength = shipObj[1][0];
			const shipAvailability = shipObj[1];

			console.log('Retrieve Info');
			console.log({ name, shipAvailability });

			if (name === 'carrier' && shipAvailability) {
				printToTerminal('It is Carrier');

				console.log('What are ships before set()');
				console.log(ships);
				console.log(ships[name]);
				setShips({
					carrier: 0
				});
				// setShips({
				// 	[name]: 0
				// });
				console.log('What are ships after set');
				console.log(ships);
				console.log(ships[name]);
				lengthToUse = 5;
				setShips({
					carrier: 0
				});
				return lengthToUse;
			}
			if (name === 'battleship' && shipAvailability) {
				printToTerminal('It is Battleship');
				// setShips({
				// 	[name]: 0
				// });
				setShips({
					battleship: 0
				});
				console.log('What are ships');
				console.log(ships);
				console.log(ships[name]);
				lengthToUse = 4;
				return lengthToUse;
			}
			if (name === 'cruiser' && shipAvailability) {
				printToTerminal('It is cruiser');
				// setShips({
				// 	[name]: 0
				// });
				setShips({
					cruiser: 0
				});
				console.log('What are ships');
				console.log(ships);
				console.log(ships[name]);
				lengthToUse = 3;
				return lengthToUse;
			}
			if (name === 'submarine' && shipAvailability) {
				printToTerminal('It is Submarine');
				// setShips({
				// 	[name]: 0
				// });
				setShips({
					submarine: 0
				});
				console.log('What are ships');
				console.log(ships);
				console.log(ships[name]);
				lengthToUse = 3;
				return lengthToUse;
			}
			if (name === 'destroyer' && shipAvailability) {
				printToTerminal('It is Destroyer');
				// setShips({
				// 	[name]: 0
				// });
				setShips({
					destroyer: 0
				});
				console.log('What are ships');
				console.log(ships);
				console.log(ships[name]);
				lengthToUse = 2;
				return lengthToUse;
			}
		}
	}

	function setUpEventListeners() {
		const gameCellArray = Array.from(document.querySelectorAll('.cell'));

		for (let i = 0; i < gameCellArray.length; i++) {
			const cell = gameCellArray[i];

			cell.addEventListener('click', function (event) {
				// event.stopPropagation();
				// event.preventDefault();
				event.stopImmediatePropagation();

				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);

				// console.log({ coord1, coord2 });

				const shipLength = nextShipToUse();
				const placementCoordinates = playerGameboard.calculateShipPlacement(
					shipLength,
					[coord1, coord2]
				);

				playerGameboard.placeShip(placementCoordinates);

				// console.log(playerGameboard);

				setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');
			});
		}
	}

	function checkShipsHaveBeenPlaced() {
		// console.log('Inside checkShipsHaveBeenPlaced()');
		const shipEntries = Object.entries(ships);
		// console.log(ships);
		// console.table(shipEntries);
		for (let i = 0; i < 5; i++) {
			const shipObj = shipEntries[i];
			const shipAvailability = shipObj[1];
			console.log({ shipAvailability });
			if (shipAvailability !== true) {
				// console.log('Not all ships have been placed');
				// Not all ships have been placed
				return true;
			}
		}

		// All Ships have been placed
		// console.log('all ships have been placed');
		return false;
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

			{/* <Button
				onClick={() => {
					// setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');
					setUpGridWithBoats(
						computerGameboard.shipArrayBoard,
						'pcGrid'
					);
				}}
			>
				Place Ship
			</Button> */}

			<Button
				disabled={checkShipsHaveBeenPlaced()}
				onClick={() => nextStep()}
			>
				Get Ready!
			</Button>
		</div>
	);
}

export default GameboardSetup;
