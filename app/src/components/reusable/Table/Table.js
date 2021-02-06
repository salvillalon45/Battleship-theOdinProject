// -----------------------------------------------
//
// reusable -> Table.js
// Desc: Table to help set up UI grid
//
// -----------------------------------------------

// -----------------------------------------------
// Necessary Imports
// -----------------------------------------------

// -----------------------------------------------
// Imports
// -----------------------------------------------

export default function Table(props) {
	const { grid, id } = props;

	return (
		<div className='table' id={id}>
			<div className='gridContainer'>
				<div className='numberContainer'>
					<th>{}</th>
					<th>1</th>
					<th>2</th>
					<th>3</th>
					<th>4</th>
					<th>5</th>
					<th>6</th>
					<th>7</th>
					<th>8</th>
					<th>9</th>
					<th>10</th>
				</div>
				<div className='letterContainer'>
					<th>A</th>
					<th>B</th>
					<th>C</th>
					<th>D</th>
					<th>E</th>
					<th>F</th>
					<th>G</th>
					<th>H</th>
					<th>I</th>
					<th>J</th>
					{grid}
				</div>
			</div>
		</div>
	);
}
