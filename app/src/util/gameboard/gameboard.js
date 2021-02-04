// --------------------------------------------------
// GameBoard Util -> gameboard
// Desc: Contains the factory function for gameboard
// --------------------------------------------------
import printToTerminal from '../helper/helper';
import ShipFactory from '../ship';

const GameBoardFactory = function () {
	const shipArrayBoard = [];
	const missedShots = [];

	function placeShip(coordinates) {
		// console.log('Inside placeShip');
		// console.log({ coordinates });
		const shipObj = ShipFactory(coordinates);
		shipArrayBoard.push(shipObj);
	}

	function receiveAttack(hitCoords) {
		let hitFlag = 0;
		let repeatedMovedFlag = 0;

		shipArrayBoard.map((ship) => {
			const shipCoords = ship.coordinates;

			return shipCoords.map((shipCoord, index) => {
				const shipCoord1 = shipCoord[0];
				const shipCoord2 = shipCoord[1];
				const hitCoord1 = hitCoords[0];
				const hitCoord2 = hitCoords[1];

				if (
					shipCoord1 === hitCoord1 &&
					shipCoord2 === hitCoord2 &&
					ship.shipArray[index] === 'hit'
				) {
					// Cannot hit the same coordinate
					console.log('Enter cannot hit same coordiante flag');
					repeatedMovedFlag = 1;
				} else if (
					shipCoord1 === hitCoord1 &&
					shipCoord2 === hitCoord2
				) {
					// We got a hit!
					hitFlag = 1;
					printToTerminal('We got a hit!');
					ship.hit(index);
				}
			});
		});

		if (repeatedMovedFlag === 1) {
			// Cannot hit the same coordinate
			printToTerminal('// Cannot hit the same coordinate');
			return 'Cannot Hit Same Coordinate';
		}

		if (hitFlag === 0) {
			// We missed
			printToTerminal('We missed');
			missedShots.push(hitCoords);
		}
	}

	function reportSunkShips() {
		const shipStatusArray = shipArrayBoard.map((ship) => ship.isSunk());
		return shipStatusArray.every((shipStatus) => shipStatus === true);
	}

	function calculateShipPlacement(shipLength, shipCoordinate) {
		console.log('Inside calculateShipPlacement');
		// console.log({ shipCoordinate });
		// console.log({ shipLength });
		const coord1 = shipCoordinate[0];
		const coord2 = shipCoordinate[1];
		const placementCoordinates = [];
		let coord = [];

		const result = coord2 + (shipLength - 1);
		let coord2Change = coord2;

		for (let i = 0; i < shipLength; i++) {
			coord.push(coord1);
			coord.push(coord2Change);
			placementCoordinates.push(coord);
			coord = [];
			coord2Change += 1;
		}

		console.log({ placementCoordinates });

		return placementCoordinates;
	}

	function checkShipSetUpPlacement(coord1, coord2) {
		console.log('Inside checkShipSetUpPlacement');
		console.log({ shipArrayBoard });
		console.log({ coord1, coord2 });
		for (let i = 0; i < shipArrayBoard.length; i++) {
			const shipCoordinates = shipArrayBoard[i].coordinates;

			for (let j = 0; j < shipCoordinates.length; j++) {
				const coord1Check = shipCoordinates[j][0];
				const coord2Check = shipCoordinates[j][1];
				console.log({ coord1Check, coord2Check });

				if (coord1Check === coord1 && coord2Check === coord2) {
					console.log('SHIP HAS ALREAYD BEEN PLACED THER');
					return true;
				}
			}
		}

		console.log('PLACE IT');
		return false;
	}

	function checkValidPositionsHorizontal(coord1, coord2, shipLength) {
		const spaceShipWillTakeOnGrid = coord2 + shipLength;
		// console.log({ coord2, shipLength, spaceShipWillTakeOnGrid });
		const canShipBePlacedThere = checkShipSetUpPlacement(coord1, coord2);
		if (spaceShipWillTakeOnGrid <= 10 && !canShipBePlacedThere) {
			// printToTerminal('You Can Place');
			return true;
		}

		// printToTerminal('Cannot Place There');
		return false;
	}

	return {
		placeShip,
		receiveAttack,
		reportSunkShips,
		shipArrayBoard,
		missedShots,
		calculateShipPlacement,
		checkValidPositionsHorizontal
	};
};

export default GameBoardFactory;
