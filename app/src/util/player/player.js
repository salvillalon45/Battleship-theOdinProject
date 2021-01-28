// --------------------------------------------------
// Player Util -> player
// Desc: Contains the factory function for player
// --------------------------------------------------

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
