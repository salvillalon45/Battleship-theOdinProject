import { React, useState } from 'react';
import '../styles/global.less';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './reusable/Layout';
import Intro from './Intro';
import GameboardSetup from './GameboardSetup';

function App() {
	const [nextStep, setNextStep] = useState('');
	const [playerName, setPlayerName] = useState('');

	function handleNextStepChange(nextStepChange) {
		setNextStep(nextStepChange);
	}

	function showNextComponent() {
		console.log(playerName);
		if (nextStep === 2) {
			return <GameboardSetup playerName={playerName} />;
		}
		// } else if (nextStep === 3) {
		// 	// return
		// }
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
