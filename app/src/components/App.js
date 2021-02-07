// -----------------------------------------------
//
// Components -> App.js
// Desc: Main App Component
//
// -----------------------------------------------

// -----------------------------------------------
// Imports

// React
import { React, useState } from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Styles
import '../styles/global.css';

// Reusable
import Layout from './reusable/Layout';
import Intro from './Intro';
import GameboardSetup from './GameboardSetup';
import PlayGame from './PlayGame';
// -----------------------------------------------

function App() {
	const [nextStep, setNextStep] = useState('');
	const [playerName, setPlayerName] = useState('');
	const [uiGrid, setUIGrid] = useState('');
	const [grid, setGrid] = useState('');
	const [pcGrid, setPCGrid] = useState('');
	const [pcUIGrid, setPCUIGrid] = useState('');
	const [playerGameboard, setPlayerGameboard] = useState('');
	const [computerGameboard, setComputerGameboard] = useState('');

	function handleNextStepChange(nextStepChange) {
		setNextStep(nextStepChange);
	}

	function handleGameSetUp(playerGameboardChange, computerGameboardChange) {
		setPlayerGameboard(playerGameboardChange);
		setComputerGameboard(computerGameboardChange);
	}

	function handleGridSetUp(
		uiGridChange,
		gridChange,
		pcUIGridChange,
		pcGridChange
	) {
		setGrid(gridChange);
		setUIGrid(uiGridChange);
		setPCGrid(pcGridChange);
		setPCUIGrid(pcUIGridChange);
	}

	function showNextComponent() {
		if (nextStep === 2) {
			return (
				<GameboardSetup
					handleNextStepChange={handleNextStepChange}
					playerName={playerName}
					handleGridSetUp={handleGridSetUp}
					handleGameSetUp={handleGameSetUp}
				/>
			);
		}

		if (nextStep === 3) {
			return (
				<PlayGame
					grid={grid}
					uiGrid={uiGrid}
					pcGrid={pcGrid}
					pcUIGrid={pcUIGrid}
					playerName={playerName}
					playerGameboard={playerGameboard}
					computerGameboard={computerGameboard}
					handleNextStepChange={handleNextStepChange}
				/>
			);
		}

		return (
			<Intro
				handleNextStepChange={handleNextStepChange}
				setPlayerName={setPlayerName}
			/>
		);
	}

	return <Layout>{showNextComponent()}</Layout>;
}

export default App;
