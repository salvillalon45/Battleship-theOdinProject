// --------------------------------------------------
// Ship Util -> ship
// Desc: Contains the factory function for ship
// --------------------------------------------------

const ShipFactory = function (coordinates) {
	const shipArray = [];

	coordinates.map((coordinate) => {
		return shipArray.push(coordinate);
	});

	function hit(hitIndex) {
		shipArray[hitIndex] = 'hit';
	}

	function isSunk() {
		return shipArray.every((shipPart) => shipPart === 'hit');
	}

	return {
		hit,
		isSunk,
		coordinates,
		shipArray
	};
};

export default ShipFactory;
