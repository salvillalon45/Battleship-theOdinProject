// -----------------------------------------------
//
// Intro -> Intro.js
// Desc: Intro for the page
//
// -----------------------------------------------

// -----------------------------------------------
// Redux
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
import { React, useReducer } from 'react';
// -----------------------------------------------

// -----------------------------------------------
// External Imports
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// -----------------------------------------------
function Intro(props) {
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			playerName: ''
		}
	);

	function onChange(event) {
		const { name } = event.target;
		const newValue = event.target.value;
		console.log('event.target::', event.target);
		console.log('event.target.value::', event.target.value);
		setUserInput({
			[name]: newValue
		});
	}

	function nextStep() {
		const { playerName } = userInput;

		props.setPlayerName(playerName);
		props.handleNextStepChange(2);
	}

	const { playerName } = userInput;

	return (
		<Container>
			{console.log({ playerName })}
			<Row>
				<Col>
					<InputGroup className='mb-3'>
						<FormControl
							name='playerName'
							placeholder='Enter Your Name!'
							aria-label='playerName'
							aria-describedby='basic-addon1'
							onChange={onChange}
							defaultValue={playerName}
						/>
					</InputGroup>

					<Button onClick={() => nextStep()}>Start Game</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Intro;
