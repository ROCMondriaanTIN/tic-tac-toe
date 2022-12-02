export function getPlayerX() {
	let item = localStorage.getItem("player_x");
	let player;
	if (!item) {
		player = {};
	} else {
		player = JSON.parse(item);
	}

	return player;
}

export function getPlayerO() {
	let item = localStorage.getItem("player_o");
	let player;
	if (!item) {
		player = {};
	} else {
		player = JSON.parse(item);
	}

	return player;
}

export function savePlayerX(player) {
	if (!player) throw new Error("Can't save player of null!");

	localStorage.setItem("player_x", JSON.stringify(player));
}

export function savePlayerO(player) {
	if (!player) throw new Error("Can't save player of null!");

	localStorage.setItem("player_o", JSON.stringify(player));
}

const storageApi = {
	getPlayerX,
	getPlayerO,
	savePlayerX,
	savePlayerO,
};

export default storageApi;
