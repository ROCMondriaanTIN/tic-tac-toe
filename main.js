console.log("Starting Tic Tac Toe...");

import storageApi from "./storageApi.js";
// audios
const click = new Audio("audio/click_1.wav");
const win = new Audio("audio/won.wav");

const tiles = document.querySelectorAll(".tile");
const restart = document.querySelector(".restart");
const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");

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

let winner = false;

console.log(storageApi.getPlayerX());
console.log(storageApi.getPlayerO());

tiles.forEach((elm) => {
	elm.addEventListener("click", (e) => {
		// play touch sound
		click.play();

		// if tile already has X or O do nothing
		if (elm.textContent != "" || winner) return;

		// fill in X or O
		if (toggle) {
			elm.textContent = "X";
		} else {
			elm.textContent = "O";
		}

		// switch player turn
		toggle = !toggle;

		// check if a row is complete
		if (!checkForWin()) {
			elm.classList.add("blinker");
		}
	});

	// add animation end event
	elm.addEventListener("animationend", (e) => {
		// remove animation class
		elm.classList.remove("blinker");
	});
});

function checkForWin() {
	let winner = false;
	for (let i = 0; i < winRows.length; i++) {
		/**
		 * We pick a winning row from winRows
		 */
		const row = winRows[i];

		/**
		 * We pick the right tile elements
		 */
		const x = [tiles[row[0]], tiles[row[1]], tiles[row[2]]];

		/**
		 * We don't compare empty tiles, so we skip
		 * the rest of the code and continue from the
		 * beginning of the loop.
		 */
		if (x[0].textContent == "" || x[1].textContent == "" || x[2].textContent == "") continue;

		/**
		 * We compare 3 tiles for the same value
		 */
		if (x[0].textContent === x[1].textContent && x[1].textContent === x[2].textContent) {
			console.log("We have a winner!");
			winner = true;

			// animate elements
			x.forEach((tile) => {
				tile.classList.add("blinker");
			});

			if (x[0].textContent === "X") updateScore(scoreX);
			else updateScore(scoreO);

			// if we have a winning situation, break from the loop
			break;
		}
		console.log("No winner yet.");
	}

	if (winner) {
		console.log("Yes we have a winner");
		// play the winning sound
		win.play();
	} else {
		console.log("Nope...");
	}

	return winner;
}

restart.addEventListener("click", (e) => {
	// clear all tiles
	tiles.forEach((tile) => {
		tile.textContent = "";
	});

	winner = false;
});

function updateScore(element) {
	let score = Number(element.textContent);
	element.textContent = score + 1;
}
