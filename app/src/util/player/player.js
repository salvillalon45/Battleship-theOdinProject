// --------------------------------------------------
// Player Util -> player
// Desc: Contains the factory function for player
// --------------------------------------------------

import GameBoardFactory from '../gameboard';

const PlayerFactory = function () {
	function sendAttack(gameboard, hitCoords) {
		gameboard.receiveAttack(hitCoords);
	}

	return { sendAttack };
};

const ComputerFactory = function () {
	return Object.assign(PlayerFactory(), {});
};

export { PlayerFactory, ComputerFactory };
