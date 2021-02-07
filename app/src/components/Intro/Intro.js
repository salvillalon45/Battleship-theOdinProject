// -----------------------------------------------
//
// Intro -> Intro.js
// Desc: Intro to Battleship
//
// -----------------------------------------------

// -----------------------------------------------
// Imports

// React
import { React, useReducer, useState } from 'react';

// Bootstrap
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
	const [nameRequired, setNameRequired] = useState(false);

	// This function is used to grab the value that the user enters on the input field
	function onChange(event) {
		const { name } = event.target;
		const newValue = event.target.value;

		setUserInput({
			[name]: newValue
		});
	}

	// This function sets up everything so we are ready to render the next component in the flow
	function nextStep() {
		const { playerName } = userInput;

		if (playerName !== '') {
			props.setPlayerName(playerName);
			props.handleNextStepChange(2);
		} else {
			setNameRequired(true);
		}
	}

	const { playerName } = userInput;

	return (
		<Container className='introContainer'>
			<Row>
				<Col>
					<InputGroup size='lg'>
						<FormControl
							name='playerName'
							placeholder='Enter Your Name!'
							aria-label='playerName'
							aria-describedby='basic-addon1'
							onChange={onChange}
							defaultValue={playerName}
						/>
					</InputGroup>

					<div className='nameContainer'>
						<p className='redText text20 antonText'>
							{nameRequired && 'Name Required!'}
						</p>
					</div>

					<div className='buttonContainer'>
						<Button className='text15' onClick={() => nextStep()}>
							Start Game
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Intro;
