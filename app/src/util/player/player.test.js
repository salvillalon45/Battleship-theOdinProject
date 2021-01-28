// --------------------------------------------------
// Test for player.js
// --------------------------------------------------

import { PlayerFactory, ComputerFactory } from './player';
import GameboardFactory from '../gameboard';
import printToTerminal from '../helper/helper';

const human = PlayerFactory();
const humanGameboard = GameboardFactory();
humanGameboard.placeShip(['A1', 'B1', 'C1', 'D1']);

const computer = ComputerFactory();
const computerGameboard = GameboardFactory();
computerGameboard.placeShip(['E1', 'F1', 'G1', 'H1']);

test('Human attacks Computer player', () => {
	human.sendAttack(computerGameboard, 'E1');

	expect(computerGameboard.shipArrayBoard[0].shipArray).toStrictEqual([
		'hit',
		'F1',
		'G1',
		'H1',
	]);
});

test('Computer attacks Human Player', () => {
	computer.sendAttack(humanGameboard, 'A1');

	expect(humanGameboard.shipArrayBoard[0].shipArray).toStrictEqual([
		'hit',
		'B1',
		'C1',
		'D1',
	]);
});

test('Human misses attack to Computer player', () => {
	human.sendAttack(computerGameboard, 'Z1');

	expect(computerGameboard.shipArrayBoard[0].shipArray).toStrictEqual([
		'E1',
		'F1',
		'G1',
		'H1',
	]);
});

test('Computer misses attack to Human player', () => {
	computer.sendAttack(humanGameboard, 'Z1');

	expect(humanGameboard.shipArrayBoard[0].shipArray).toStrictEqual([
		'A1',
		'B1',
		'C1',
		'D1',
	]);
});

test('Human destroys Computer player ships', () => {
	human.sendAttack(computerGameboard, 'E1');
	human.sendAttack(computerGameboard, 'F1');
	human.sendAttack(computerGameboard, 'G1');
	human.sendAttack(computerGameboard, 'H1');

	expect(computerGameboard.reportSunkShips()).toBeTruthy();
	expect(computerGameboard.shipArrayBoard[0].shipArray).toStrictEqual([
		'hit',
		'hit',
		'hit',
		'hit',
	]);
});

test.only('Computer destroys Human player ships', () => {
	computer.sendAttack(humanGameboard, 'A1');
	computer.sendAttack(humanGameboard, 'B1');
	computer.sendAttack(humanGameboard, 'C1');
	computer.sendAttack(humanGameboard, 'D1');

	expect(humanGameboard.reportSunkShips()).toBeTruthy();
	expect(humanGameboard.shipArrayBoard[0].shipArray).toStrictEqual([
		'hit',
		'hit',
		'hit',
		'hit',
	]);
});
