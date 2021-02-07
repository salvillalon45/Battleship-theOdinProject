// --------------------------------------------------
// Test for gameboard.js
// --------------------------------------------------

import GameboardFactory from './gameboard';
import printToTerminal from '../helper/helper';

const gameboard = GameboardFactory();

test('Place ship in a coordinate', () => {
	gameboard.placeShip(['A1', 'B1', 'C1', 'D1']);

	expect(gameboard.shipArrayBoard[0].coordinates).toStrictEqual([
		'A1',
		'B1',
		'C1',
		'D1'
	]);
});

test('Attacked a ship', () => {
	gameboard.receiveAttack('A1');
	const testShip = gameboard.shipArrayBoard[0];
	// printToTerminal(testShip);

	expect(testShip.shipArray).toStrictEqual(['hit', 'B1', 'C1', 'D1']);
});

test('Missed hit on ship', () => {
	gameboard.receiveAttack('F1');
	printToTerminal(gameboard.missedShots);

	expect(gameboard.missedShots).toStrictEqual(['F1']);
});

test.only('Do not hit same coordinate twice', () => {
	const gameboard1 = GameboardFactory();
	gameboard1.placeShip(['A1', 'B1', 'C1']);

	gameboard1.receiveAttack('A1');
	const result = gameboard1.receiveAttack('A1');

	expect(result).toStrictEqual('Cannot Hit Same Coordinate');
});

test('All Ships are sunk', () => {
	const gameboard2 = GameboardFactory();
	gameboard2.placeShip(['A1', 'B1', 'C1']);
	gameboard2.placeShip(['A2', 'B2', 'C2']);

	gameboard2.receiveAttack('A1');
	gameboard2.receiveAttack('B1');
	gameboard2.receiveAttack('C1');

	gameboard2.receiveAttack('A2');
	gameboard2.receiveAttack('B2');
	gameboard2.receiveAttack('C2');

	const result = gameboard2.reportSunkShips();

	expect(result).toBeTruthy();
	expect(gameboard2.shipArrayBoard[0].shipArray).toStrictEqual([
		'hit',
		'hit',
		'hit'
	]);
	expect(gameboard2.shipArrayBoard[1].shipArray).toStrictEqual([
		'hit',
		'hit',
		'hit'
	]);
});
