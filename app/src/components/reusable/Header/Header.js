// -----------------------------------------------
//
// reusable -> Header.js
// Desc: Header for all pages in the website
//
// -----------------------------------------------

// -----------------------------------------------
// Redux
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
// -----------------------------------------------

// -----------------------------------------------
// External Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// -----------------------------------------------

export default function Header() {
	return (
		<Container fluid>
			<Row>
				<Col>
					<div className='headerContainer'>
						<h1>Battleship</h1>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
