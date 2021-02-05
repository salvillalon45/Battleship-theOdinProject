/* eslint-disable prefer-destructuring */
// -----------------------------------------------
//
// GameboardSetup -> GameboardSetup.js
// Desc: Setup grid for the user
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
import {
	React,
	useState,
	useEffect,
	useReducer,
	useLayoutEffect,
	useRef
} from 'react';
// -----------------------------------------------

// -----------------------------------------------
// Imports

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// -----------------------------------------------

// -----------------------------------------------
// Util
import GameBoardFactory from '../../util/gameboard';
import printToTerminal from '../../util/helper/helper';
// -----------------------------------------------

const playerGameboard = GameBoardFactory();

function GameboardSetup(props) {
	const { playerName } = props;
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

	const [ships, _setShips] = useState({
		carrier: [5, 1],
		battleship: [4, 1],
		cruiser: [3, 1],
		submarine: [3, 1],
		destroyer: [2, 1]
	});

	const shipsRef = useRef(ships);
	const setShips = (shipName, shipAvailability) => {
		shipsRef.current[shipName][1] = shipAvailability;
		_setShips({ ...shipsRef.current });
	};

	// This allows us to work with state in event listeners
	const [shipName, _setShipName] = useState('carrier');
	const shipNameRef = useRef(shipName);
	const setShipName = (data) => {
		shipNameRef.current = data;
		_setShipName(data);
	};

	const [rotate, _setRotate] = useState(false);
	const rotateRef = useRef(rotate);
	const setRotate = (data) => {
		rotateRef.current = data;
		_setRotate(data);
	};

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
		const shipEntries = Object.entries(shipsRef.current);

		for (let i = 0; i < 5; i++) {
			const shipObj = shipEntries[i];
			const name = shipObj[0];
			const shipLength = shipObj[1][0];
			const shipAvailability = shipObj[1][1];

			if (name === 'carrier' && shipAvailability) {
				setShips(name, 0);
				setShipName('battleship');

				return shipLength;
			}
			if (name === 'battleship' && shipAvailability) {
				setShips(name, 0);
				setShipName('cruiser');

				return shipLength;
			}
			if (name === 'cruiser' && shipAvailability) {
				setShips(name, 0);
				setShipName('submarine');

				return shipLength;
			}
			if (name === 'submarine' && shipAvailability) {
				setShips(name, 0);
				setShipName('destroyer');

				return shipLength;
			}
			if (name === 'destroyer' && shipAvailability) {
				setShips(name, 0);

				return shipLength;
			}
		}
	}

	function setUpEventListeners() {
		const gameCellArray = Array.from(document.querySelectorAll('.cell'));

		for (let i = 0; i < gameCellArray.length; i++) {
			const cell = gameCellArray[i];

			cell.addEventListener('click', function (event) {
				event.stopImmediatePropagation();
				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);
				const updatedShipName = shipNameRef.current;
				const length = shipsRef.current[updatedShipName][0];
				const rotateFlag = rotateRef.current;

				if (
					playerGameboard.checkValidPositionsHorizontal(
						coord1,
						coord2,
						length,
						rotateFlag
					)
				) {
					const shipLength = nextShipToUse();
					const placementCoordinates = playerGameboard.calculateShipPlacement(
						shipLength,
						[coord1, coord2],
						rotateFlag
					);

					playerGameboard.placeShip(placementCoordinates);
					setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');
				}
			});
		}
	}

	function checkShipsHaveBeenPlaced() {
		// Here check if the ship Availability are zero. If they are zero, that means that
		// All ships have been placed and we can proceed to play game
		const shipEntries = Object.entries(ships);
		return shipEntries.every((shipObj) => shipObj[1][1] === 0);
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
		<Container className='gameboardSetupContainer'>
			<Row>
				<Col>
					<div className='setUpTextContainer'>
						<p className='whiteText text29 robotoText'>
							{playerName}, Place Your Boats
						</p>

						<p className='whiteText text29 robotoText'>
							Place {shipName} on the board
						</p>

						<div
							className='buttonContainer'
							id='rotateButtonContainer'
						>
							<Button
								className='text15'
								onClick={() => setRotate(!rotate)}
							>
								Rotate
							</Button>
						</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<div className='table'>{uiGrid}</div>

					<div className='buttonContainer'>
						<Button
							className='text15'
							disabled={!checkShipsHaveBeenPlaced()}
							onClick={() => nextStep()}
						>
							Get Ready To Play!
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default GameboardSetup;
