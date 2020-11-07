// --------------------------------------------------
// Test for ship.js
// --------------------------------------------------
import ShipFactory from './ship';
import printToTerminal from '../helper/helper';

const ship = ShipFactory(['A1', 'B1', 'C1', 'D1']);

test('Ship gets hit', () => {
	ship.hit(1);
	const { shipArray } = ship;

	expect(shipArray).toStrictEqual(['A1', 'hit', 'C1', 'D1']);
});

test('Ship is sunk', () => {
	ship.hit(0);
	ship.hit(1);
	ship.hit(2);
	ship.hit(3);
	const result = ship.isSunk();

	expect(result).toBeTruthy();
	expect(ship.shipArray).toStrictEqual(['hit', 'hit', 'hit', 'hit']);
});

test('Ship is not sunk', () => {
	ship.hit(0);
	ship.hit(1);
	ship.hit(2);
	const result = ship.isSunk();

	expect(result).toBeFalsy();
	expect(ship.shipArray).toStrictEqual(['hit', 'hit', 'hit', 'D1']);
});
