// -----------------------------------------------
//
// reusable -> Header.js
// Desc: Header for all pages in the website
//
// -----------------------------------------------

// -----------------------------------------------
// Imports
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

// Images
import BattleshipHeader from './battleship_header.png';
// -----------------------------------------------

export default function Header() {
	return (
		<Container fluid className='headerContainer'>
			<Row>
				<Col>
					<div>
						<Image
							src={BattleshipHeader}
							fluid
							alt='battleship logo'
						/>
						{/* <img src={BattleshipHeader} alt='logp' /> */}
					</div>
				</Col>
			</Row>
		</Container>
	);
}
