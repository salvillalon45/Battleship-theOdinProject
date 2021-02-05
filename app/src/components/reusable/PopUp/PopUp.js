// -----------------------------------------------
//
// Reusable -> PopUp.js
// Desc: PopUp to show who is the winner
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
import { React, useReducer, useEffect, useState } from 'react';
// -----------------------------------------------

// -----------------------------------------------
// External Imports

// Bootstrap
import Button from 'react-bootstrap/Button';
// -----------------------------------------------

function PopUp(props) {
	const { winner } = props;

	function playAgain() {
		props.handleNextStepChange(1);
	}

	return (
		<div className='popup-container'>
			<div className='popup'>
				<p className='whiteText text29 robotoText'>
					The Winner Is: {winner}
				</p>

				<div className='buttonContainer'>
					<Button className='text15' onClick={() => playAgain()}>
						Play Again?
					</Button>
				</div>
			</div>
		</div>
	);
}

export default PopUp;
