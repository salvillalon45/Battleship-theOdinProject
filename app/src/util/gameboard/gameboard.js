// --------------------------------------------------
// GameBoard Util -> gameboard
// Desc: Contains the factory function for gameboard
// --------------------------------------------------
import ShipFactory from '../ship';

const GameBoardFactory = function () {
	const shipArrayBoard = [];
	const missedShots = [];

	function placeShip(coordinates) {
		const shipObj = ShipFactory(coordinates);
		shipArrayBoard.push(shipObj);
	}

	function receiveAttack(hitCoords) {
		shipArrayBoard.map((ship) => {
			const shipCoords = ship.coordinates;

			return shipCoords.map((shipCoord, index) => {
				if (shipCoord === hitCoords) {
					// We got a hit!
					ship.hit(index);
				}
			});
		});

		// We missed
		missedShots.push(hitCoords);
	}

	function reportSunkShips() {
		const shipStatusArray = shipArrayBoard.map((ship) => ship.isSunk);

		return shipStatusArray.every((shipStatus) => shipStatus === true);
	}

	return {
		placeShip,
		receiveAttack,
		reportSunkShips,
	};
};

export default GameboardFactory;
