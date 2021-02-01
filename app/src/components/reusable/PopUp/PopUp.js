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
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
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
				<p>The Winner Is: {winner}</p>
				<Button onClick={() => playAgain()}>Play Again?</Button>
			</div>
		</div>
	);
}

export default PopUp;
