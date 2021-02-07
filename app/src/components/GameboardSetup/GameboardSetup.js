/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
// -----------------------------------------------
//
// GameboardSetup -> GameboardSetup.js
// Desc: Setup grid for the user
//
// -----------------------------------------------

// -----------------------------------------------
// Imports

// React
import {
	React,
	useState,
	useEffect,
	useReducer,
	useLayoutEffect,
	useRef
} from 'react';

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
import GameBoardFactory from '../../util/gameboard';
// -----------------------------------------------

const playerGameboard = GameBoardFactory();

function GameboardSetup(props) {
	const { playerName } = props;

	// Set up the grid for the computer
	const computerGameboard = GameBoardFactory();
	computerGameboard.placeShip([
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0],
		[4, 0]
	]);
	computerGameboard.placeShip([
		[6, 6],
		[7, 6],
		[8, 6],
		[9, 6]
	]);
	computerGameboard.placeShip([
		[7, 0],
		[7, 1],
		[7, 2]
	]);
	computerGameboard.placeShip([
		[3, 3],
		[3, 4],
		[3, 5]
	]);
	computerGameboard.placeShip([
		[9, 0],
		[9, 1]
	]);

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

	// This funtion creates the grid
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

	// This funtion creates the UI grid
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

	// This will be change the UI grid (uiGrid or pcUIGrid) depending on the values of the grid or pcGrid
	function updateUIGrid(gridType) {
		const result = grids[gridType].map((row, rowIndex) => {
			const cells = row.map((col, colIndex) => {
				const id = String(rowIndex) + String(colIndex);
				let shipStatus = '';

				// Here we include && gridType === 'grid' so that in the PlayGame Component
				// We do not see the computer board
				if (col === 1 && gridType === 'grid') {
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

	// This function will set a 1 to a cell in grid or pcGrid. A 1 indicates a ship is placed there
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

	// This functions sets up the player grid
	function setUpPlayerGrid() {
		createGrid('grid');
		createUIGrid('uiGrid');
	}

	// This functions sets up the computer grid
	function setUpComputerGrid() {
		createGrid('pcGrid');
		createUIGrid('pcUIGrid');
	}

	// This function sets up everything so we are ready to render the next component in the flow
	function nextStep() {
		const { uiGrid, grid, pcGrid, pcUIGrid } = grids;

		props.handleGridSetUp(uiGrid, grid, pcUIGrid, pcGrid);
		props.handleGameSetUp(playerGameboard, computerGameboard);
		setUpGridWithBoats(computerGameboard.shipArrayBoard, 'pcGrid');
		props.handleNextStepChange(3);
	}

	// This function determines what ship to use when a player sets there ship on the grid
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

	// This functions setups the event listeners that allow us to:
	// - Place a ship on the grid
	// - Hover over the grid and show us the length of the ship we are placing
	// - Show a disabled circle when you cannot place the ship on the grid
	function setUpEventListeners() {
		const gameCellArray = Array.from(document.querySelectorAll('.cell'));

		for (let i = 0; i < gameCellArray.length; i++) {
			const cell = gameCellArray[i];

			cell.addEventListener('click', function (event) {
				event.stopImmediatePropagation();
				const updatedShipName1 = shipNameRef.current;
				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);
				const length = shipsRef.current[updatedShipName1][0];
				const rotateFlag1 = rotateRef.current;

				if (
					playerGameboard.checkValidPositions(
						coord1,
						coord2,
						length,
						rotateFlag1
					)
				) {
					const shipLength = nextShipToUse();
					const placementCoordinates = playerGameboard.calculateShipPlacement(
						shipLength,
						[coord1, coord2],
						rotateFlag1
					);

					playerGameboard.placeShip(placementCoordinates);
					setUpGridWithBoats(playerGameboard.shipArrayBoard, 'grid');
				}
			});

			cell.addEventListener('mouseover', function (event) {
				event.stopImmediatePropagation();
				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);
				const updatedShipName2 = shipNameRef.current;
				const length = shipsRef.current[updatedShipName2][0];
				const rotateFlag2 = rotateRef.current;

				const placementCoordinates = playerGameboard.calculateShipPlacement(
					length,
					[coord1, coord2],
					rotateFlag2
				);

				for (let j = 0; j < placementCoordinates.length; j++) {
					const strC1 = String(placementCoordinates[j][0]);
					const strC2 = String(placementCoordinates[j][1]);
					const id = strC1 + strC2;

					if (id.length < 3) {
						cell.classList.remove('notAllowed');
						document
							.getElementById(id)
							.classList.add('hoverEffect');
					} else {
						cell.classList.add('notAllowed');
					}
				}
			});

			cell.addEventListener('mouseleave', function (event) {
				event.stopImmediatePropagation();

				const updatedShipName3 = shipNameRef.current;
				const rotateFlag3 = rotateRef.current;

				const coord1 = Number(cell.id.split('')[0]);
				const coord2 = Number(cell.id.split('')[1]);
				const length = shipsRef.current[updatedShipName3][0];

				const placementCoordinates = playerGameboard.calculateShipPlacement(
					length,
					[coord1, coord2],
					rotateFlag3
				);

				for (let j = 0; j < placementCoordinates.length; j++) {
					const c1 = String(placementCoordinates[j][0]);
					const c2 = String(placementCoordinates[j][1]);
					const id = c1 + c2;

					if (id.length < 3) {
						document
							.getElementById(id)
							.classList.remove('hoverEffect');
					}
				}
			});
		}
	}

	// Here check if the ship Availability are zero. If they are zero, that means that
	// All ships have been placed and we can proceed to play game
	function checkShipsHaveBeenPlaced() {
		const shipEntries = Object.entries(ships);
		return shipEntries.every((shipObj) => shipObj[1][1] === 0);
	}

	useEffect(() => {
		setUpPlayerGrid();
		setUpComputerGrid();
	}, []);

	// This helps us re-render the component so that I can add the event listeners
	useLayoutEffect(() => {
		setUpEventListeners();
	});

	const { uiGrid } = grids;

	return (
		<Container className='gameboardSetupContainer'>
			<Row>
				<Col>
					<div className='setUpTextContainer'>
						<b>
							<p className='whiteText text29 robotoText'>
								{checkShipsHaveBeenPlaced()
									? 'Your Ships Are Set!'
									: `${playerName} Place Your Boats`}
							</p>
						</b>

						<p className='whiteText text29 robotoText'>
							Place <b>{shipName}</b> on the board
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

			<Row id='tableRow'>
				<Col>
					<Table grid={uiGrid} />
				</Col>
			</Row>

			<Row>
				<Col>
					<div>
						<p className='whiteText text29 robotoText'>
							{checkShipsHaveBeenPlaced() &&
								'Now click on the button below to play'}
						</p>
					</div>

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
