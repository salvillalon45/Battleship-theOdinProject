function printToTerminal(statement) {
	console.log('----------------------------------');
	console.log('');
	console.log(statement);
	console.log('');
	console.log('----------------------------------');
}

function arrayAlreadyHasArray(arr, subarr) {
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
			return true;
		}
	}

	return false;
}

export { printToTerminal, arrayAlreadyHasArray };
