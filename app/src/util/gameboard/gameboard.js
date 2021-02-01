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
		printToTerminal(shipStatusArray);
		return shipStatusArray.every((shipStatus) => shipStatus === true);
	}

	return {
		placeShip,
		receiveAttack,
		reportSunkShips,
		shipArrayBoard,
		missedShots
	};
};

export default GameBoardFactory;
