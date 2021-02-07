function printToTerminal(statement) {
	// console.log('----------------------------------');
	// console.log('');
	// console.log(statement);
	// console.log('');
	// console.log('----------------------------------');
}

// This function returns true is subarr exists in the arr array
function arrayAlreadyHasArray(arr, subarr) {
	console.log({ arr });
	console.log({ attackCoordinates: subarr });
	for (let i = 0; i < arr.length; i++) {
		let checker = false;

		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j] === subarr[j]) {
				checker = true;
			} else {
				checker = false;
				break;
			}
		}

		if (checker) {
			console.log('subarr does exist');
			return true;
		}
	}

	// Does not exist
	console.log('subarr does not exist');
	return false;
}

export { printToTerminal, arrayAlreadyHasArray };
