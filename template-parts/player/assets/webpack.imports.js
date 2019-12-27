let player = document.querySelector(".podcastPlayer");

import(/* webpackChunkName: "player-scss" */'./scss/player.scss');

window.observeElements(player, () => {
	import(/* webpackChunkName: "player-js" */ "./js/player.js").then(player => {
		import(/* webpackChunkName: "player-js" */ "./js/controls.js").then(controls => {});
			player.default();
	});
});