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
					repeatedMovedFlag = 1;
				} else if (
					shipCoord1 === hitCoord1 &&
					shipCoord2 === hitCoord2
				) {
					// We got a hit!
					hitFlag = 1;
					ship.hit(index);
				}
			});
		});

		if (repeatedMovedFlag === 1) {
			// Cannot hit the same coordinate
			return 'Cannot Hit Same Coordinate';
		}

		if (hitFlag === 0) {
			// We missed
			missedShots.push(hitCoords);
		}
	}

	function reportSunkShips() {
		const shipStatusArray = shipArrayBoard.map((ship) => ship.isSunk());
		return shipStatusArray.every((shipStatus) => shipStatus === true);
	}

	function calculateShipPlacement(shipLength, shipCoordinate, rotateFlag) {
		const coord1 = shipCoordinate[0];
		const coord2 = shipCoordinate[1];
		const placementCoordinates = [];
		let coord = [];
		let coordChange;
		let coordSame;

		if (rotateFlag) {
			coordSame = coord2;
			coordChange = coord1;
		} else {
			coordSame = coord1;
			coordChange = coord2;
		}

		for (let i = 0; i < shipLength; i++) {
			if (rotateFlag) {
				coord.push(coordChange);
				coord.push(coordSame);
			} else {
				coord.push(coordSame);
				coord.push(coordChange);
			}

			placementCoordinates.push(coord);
			coord = [];
			coordChange += 1;
		}

		// for (let i = 0; i < shipLength; i++) {
		// 	coord.push(coord1);
		// 	coord.push(coord2Change);
		// 	placementCoordinates.push(coord);
		// 	coord = [];
		// 	coord2Change += 1;
		// }

		return placementCoordinates;
	}

	function checkShipSetUpPlacement(coord1, coord2, rotateFlag) {
		for (let i = 0; i < shipArrayBoard.length; i++) {
			const shipCoordinates = shipArrayBoard[i].coordinates;

			for (let j = 0; j < shipCoordinates.length; j++) {
				const coord1Check = shipCoordinates[j][0];
				const coord2Check = shipCoordinates[j][1];

				if (coord1Check === coord1 && coord2Check === coord2) {
					return true;
				}
			}
		}

		return false;
	}

	function checkValidPositions(coord1, coord2, shipLength, rotateFlag) {
		let spaceShipWillTakeOnGrid;
		if (rotateFlag) {
			spaceShipWillTakeOnGrid = coord1 + shipLength;
		} else {
			spaceShipWillTakeOnGrid = coord2 + shipLength;
		}

		const canShipBePlacedThere = checkShipSetUpPlacement(
			coord1,
			coord2,
			rotateFlag
		);

		if (spaceShipWillTakeOnGrid <= 10 && !canShipBePlacedThere) {
			return true;
		}

		return false;
	}

	return {
		placeShip,
		receiveAttack,
		reportSunkShips,
		shipArrayBoard,
		missedShots,
		calculateShipPlacement,
		checkValidPositions
	};
};

export default GameBoardFactory;
