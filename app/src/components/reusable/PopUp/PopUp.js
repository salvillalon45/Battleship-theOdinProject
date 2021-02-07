// -----------------------------------------------
//
// reusable -> PopUp.js
// Desc: PopUp to show who is the winner
//
// -----------------------------------------------

// -----------------------------------------------
// External Imports

// React
import { React, useReducer, useEffect, useState, Fragment } from 'react';

// Bootstrap
import Button from 'react-bootstrap/Button';
// -----------------------------------------------

function PopUp(props) {
	const { text, nextStepText, step, instructions } = props;

	function nextStep() {
		if (step === 4) {
			props.generateInstructionsPopUp(false);
		} else {
			props.handleNextStepChange(step);
		}
	}

	function createInstructions() {
		return (
			<>
				<p className='whiteText text15 robotoText'>
					Purple Spot on the grid means you missed
				</p>

				<p className='whiteText text15 robotoText'>
					Red Spot on the grid means you hit a ship
				</p>

				<p className='whiteText text15 robotoText'>
					Hit all the opponents ships to win!
				</p>

				<div className='buttonContainer'>
					<Button className='text15' onClick={() => nextStep()}>
						{nextStepText}
					</Button>
				</div>
			</>
		);
	}

	function generatePopUpContent() {
		if (instructions) {
			return createInstructions();
		}

		return (
			<>
				<p className='whiteText text29 robotoText'>{text}</p>

				<div className='buttonContainer'>
					<Button className='text15' onClick={() => nextStep()}>
						{nextStepText}
					</Button>
				</div>
			</>
		);
	}

	return (
		<div className='popup-container'>
			<div className='popup'>{generatePopUpContent()}</div>
		</div>
	);
}

export default PopUp;
