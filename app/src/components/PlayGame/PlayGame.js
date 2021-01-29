/* eslint-disable react/jsx-one-expression-per-line */
// -----------------------------------------------
//
// GameboardSetup -> GameboardSetup.js
// Desc: Setup grid for the user
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
// import { React, useState, useEffect } from 'react';
import { React } from 'react';
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

function PlayGame(props) {
	const { playerName, grid, uiGrid, pcGrid, pcUIGrid } = props;

	return (
		<div className='playGameContainer'>
			<div className='table'>{uiGrid}</div>
			<div className='table'>{pcUIGrid}</div>

			{/* <Button onClick={() => nextStep()}>Get Ready!</Button> */}
		</div>
	);
}

export default PlayGame;
