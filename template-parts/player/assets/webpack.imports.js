let mediaPlayer = document.querySelector(".podcastPlayer");

import(/* webpackChunkName: "player-scss" */'./scss/player.scss');

window.observeElements(mediaPlayer, () => {
	import(/* webpackChunkName: "player-js" */ "./js/player.js").then(mediaPlayer => {
		import(/* webpackChunkName: "player-js" */ "./js/controls.js").then(controls => {});
			new mediaPlayer.default();
	});
});