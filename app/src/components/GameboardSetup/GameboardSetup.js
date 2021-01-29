// -----------------------------------------------
//
// GameboardSetup -> GameboardSetup.js
// Desc: Setup grid for the user
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
import { React, useState, useEffect, useReducer } from 'react';
// -----------------------------------------------

// -----------------------------------------------
// External Imports
import Button from 'react-bootstrap/Button';
// -----------------------------------------------

// -----------------------------------------------
// Util
import GameBoardFactory from '../../util/gameboard';
// -----------------------------------------------

function GameboardSetup(props) {
	const { playerName } = props;
	const playerGameboard = GameBoardFactory();
	playerGameboard.placeShip([
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3]
	]);
	playerGameboard.placeShip([
		[2, 0],
		[2, 1],
		[2, 2]
	]);
	playerGameboard.placeShip([
		[4, 0],
		[4, 1]
	]);
	playerGameboard.placeShip([[6, 0]]);
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
	const [boats, setBoats] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			boat4: 1,
			boat3: 1,
			boat2: 1,
			boat1: 1
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

	useEffect(() => {
		setUpPlayerGrid();
		setUpComputerGrid();
	}, []);

	const { uiGrid } = grids;

	return (
		<div className='gameboardSetupContainer'>
			<p>{playerName}, Place Your Boats</p>

			<div className='table'>{uiGrid}</div>

			<Button
				onClick={() => {
					setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');
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
