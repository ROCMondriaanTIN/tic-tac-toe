console.log("Starting Tic Tac Toe...");

import storageApi from "./storageApi.js";
// audios
const click = new Audio("audio/click_1.wav");
const win = new Audio("audio/won.wav");

const tiles = document.querySelectorAll(".tile");
const restart = document.querySelector(".restart");
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

console.log(storageApi.getPlayerX());
console.log(storageApi.getPlayerO());

tiles.forEach((elm) => {
	elm.addEventListener("click", (e) => {
		click.play();

		if (elm.textContent != "") return;

		if (toggle) {
			elm.textContent = "X";
		} else {
			elm.textContent = "O";
		}

		toggle = !toggle;

		// check of een rij compleet is
		if (!checkForWin()) {
			elm.classList.add("blinker");
		}
	});

	elm.addEventListener("animationend", (e) => {
		elm.classList.remove("blinker");
	});
});

function checkForWin() {
	let winner = false;
	for (let i = 0; i < winRows.length; i++) {
		/**
		 * We pakken een winnende rij uit winRows
		 */
		const row = winRows[i];

		/* We pakken eerst de juiste elementen
		 * die een winnende rij vormen
		 */
		const x = [tiles[row[0]], tiles[row[1]], tiles[row[2]]];

		/**
		 * We mogen lege tegeltjes niet vergelijken,
		 * dus slaan we de rest over om de volgende
		 * winnende rij te pakken
		 */
		if (x[0].textContent == "" || x[1].textContent == "" || x[2].textContent == "") continue;

		/**
		 * We vergelijken de 3 tegels of ze gelijk zijn
		 * aan elkaar. Indien ja, dan hebben we een winnaar
		 */
		if (x[0].textContent === x[1].textContent && x[1].textContent === x[2].textContent) {
			console.log("We have a winner!");
			winner = true;

			// animate elements
			x.forEach((tile) => {
				tile.classList.add("blinker");
			});

			break;
		}
		console.log("No winner yet.");
	}

	if (winner) {
		console.log("Yes we have a winner");
		win.play();
	} else {
		console.log("Nope...");
	}

	return winner;
}

restart.addEventListener("click", (e) => {
	tiles.forEach((tile) => {
		tile.textContent = "";
	});
});
