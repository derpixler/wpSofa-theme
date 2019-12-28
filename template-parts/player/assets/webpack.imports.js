let mediaPlayer = document.querySelector(".podcastPlayer");

import(/* webpackChunkName: "player-scss" */'./scss/player.scss');

window.observeElements(mediaPlayer, () => {
	import(/* webpackChunkName: "player-js" */ "./js/customPlayerOptions.js").then(controls => {});
	import(/* webpackChunkName: "player-js" */ "./js/player.js").then(mediaPlayer => {
			new mediaPlayer.default();
	});
});