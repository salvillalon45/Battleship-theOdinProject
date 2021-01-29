/* eslint-disable react/jsx-one-expression-per-line */
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
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// -----------------------------------------------

// -----------------------------------------------
// Util
import GameBoardFactory from '../../util/gameboard';
// -----------------------------------------------

function GameboardSetup(props) {
	const { playerName } = props;
	const playerGameboard = GameBoardFactory();
	const pcGameboard = GameBoardFactory();
	// const [grid, setGrid] = useState('');
	// const [uiGrid, setUIGrid] = useState('');

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
		console.log('Inside createGrid');
		console.log({ gridType });
		const rows = [];
		let cols;

		for (let i = 0; i < 10; i++) {
			cols = [];
			for (let j = 0; j < 10; j++) {
				cols.push(0);
			}

			rows.push(cols);
		}

		console.log(rows);

		setGrids({
			[gridType]: rows
		});
	}

	function createUIGrid(gridType) {
		const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
			const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => {
				return <div className='cell' />;
			});

			return <div className='row'>{cells}</div>;
		});

		setGrids({
			[gridType]: result
		});
	}

	function updateUIGrid(gridType) {
		const { grid } = grids;

		const result = grid.map((row) => {
			const cells = row.map((col) => {
				if (col === 1) {
					return <div className='cell coloredCell' />;
				}

				return <div className='cell' />;
			});

			return <div className='row'>{cells}</div>;
		});

		// setUIGrid(result);
		setGrids({
			[gridType]: result
		});
	}

	function setUpGridWithBoats(gameboard, gridType) {
		console.log('Inside setupGridwithbvoat');
		const { grid, pcGrid } = grids;
		console.table(grid);
		gameboard.placeShip([
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3]
		]);

		gameboard.placeShip([
			[2, 0],
			[2, 1],
			[2, 2]
		]);
		gameboard.placeShip([
			[4, 0],
			[4, 1]
		]);
		gameboard.placeShip([[6, 0]]);

		gameboard.shipArrayBoard.map((boat) => {
			return boat.coordinates.map((coord) => {
				const coord1 = coord[0];
				const coord2 = coord[1];
				if (gridType === 'grid') {
					setGrids({
						[gridType]: (grid[coord1][coord2] = 1)
					});
				} else {
					console.log(pcGrid);
					console.log(gridType);
					setGrids({
						pcGrid: (pcGrid[coord1][coord2] = 1)
					});
				}
			});
		});

		updateUIGrid('uiGrid');
		setGrids({
			[gridType]: grid
		});
	}

	function setUpComputerGrid() {
		const { uiGrid, grid, pcGrid, pcUIGrid } = grids;
		console.table(grids);
		createGrid('pcGrid');
		createUIGrid('pcUIGrid');
		setUpGridWithBoats(pcGameboard, 'pcGrid');
	}

	function nextStep() {
		const { uiGrid, grid, pcGrid, pcUIGrid } = grids;
		props.handleGridSetUp(uiGrid, grid, pcUIGrid, pcGrid);
		props.handleNextStepChange(3);
	}

	useEffect(() => {
		const { uiGrid, grid, pcGrid, pcUIGrid } = grids;
		createGrid('grid');
		createUIGrid('uiGrid');
		setUpComputerGrid();
	}, []);

	const { uiGrid, grid } = grids;

	return (
		<div className='gameboardSetupContainer'>
			{console.log(grids)}
			<p>{playerName}, Place Your Boats</p>

			<div className='table'>{uiGrid}</div>

			<Button onClick={() => setUpGridWithBoats(playerGameboard, 'grid')}>
				Place SHip
			</Button>

			<Button onClick={() => nextStep()}>Get Ready!</Button>
		</div>
	);
}

export default GameboardSetup;
