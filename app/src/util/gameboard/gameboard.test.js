// --------------------------------------------------
// Test for gameboard.js
// --------------------------------------------------

import GameboardFactory from './gameboard';
import printToTerminal from '../helper/helper';

const gameboard = GameboardFactory(['A1', 'B1', 'C1', 'D1']);

test('Ship gets hit', () => {
	ship.hit(1);
	const { shipArray } = ship;

	expect(shipArray).toStrictEqual(['A1', 'hit', 'C1', 'D1']);
});
