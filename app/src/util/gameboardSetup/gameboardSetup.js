// --------------------------------------------------
// GameBoard Setup Util -> gameboardSetup
// Desc: Contains the factory function for gameboardSetup
// --------------------------------------------------
import printToTerminal from '../helper/helper';

const GameboardSetupFactory = function () {
	function convertLetterCoord(letterCoord) {
		let result;

		if (letterCoord === 'A') {
		}
	}

	function convertCoordinates(coordinates) {
		coordinates.map((coord) => {
			const coordArray = coord.split('');
			const letterCoord = coordArray[0];
			const numCoord = coordArray[1];
		});
	}

	return {};
};
