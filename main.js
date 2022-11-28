console.log("Starting Tic Tac Toe...");

const tiles = document.querySelectorAll(".tile");
let toggle = true;
const winRows = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

tiles.forEach((elm) => {
	elm.addEventListener("click", (e) => {
		if (elm.textContent != "") return;

		if (toggle) {
			elm.textContent = "X";
		} else {
			elm.textContent = "O";
		}

		toggle = !toggle;

		// check complete rij met
		checkForWin();
	});
});

function checkForWin() {
	let winner = false;
	for (let i = 0; i < winRows.length; i++) {
		const row = winRows[i];

		const x = tiles[row[0]].textContent;
		const y = tiles[row[1]].textContent;
		const z = tiles[row[2]].textContent;

		if (x == "" || y == "" || z == "") continue;

		console.log();
		if (x === y && y === z) {
			console.log("We have a winner!");
            winner = true;
			break;
		}
		console.log("No winner yet.");
	}

	if (winner) {
		console.log("Yes we have a winner");
	} else {
		console.log("Nope...");
	}
}
