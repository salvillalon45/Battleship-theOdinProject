import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

import Layout from './reusable/Layout';
import Intro from './Intro';
import GameboardSetup from './GameboardSetup';
import PlayGame from './PlayGame';

function App() {
	const [nextStep, setNextStep] = useState('');
	const [playerName, setPlayerName] = useState('');
	const [uiGrid, setUIGrid] = useState('');
	const [grid, setGrid] = useState('');
	const [pcGrid, setPCGrid] = useState('');
	const [pcUIGrid, setPCUIGrid] = useState('');

	function handleNextStepChange(nextStepChange) {
		setNextStep(nextStepChange);
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
